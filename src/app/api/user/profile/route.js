import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Submission from "@/models/Submission";
import Problem from "@/models/Problem"; // Required for populating
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    // 1. AUTHENTICATE USER
    const headersList = await headers();
    const token = headersList.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (e) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    await connectDB();

    // 2. FETCH USER & SOLVED PROBLEMS
    // We ".populate" the 'solvedProblems' array to get the difficulty details directly
    const user = await User.findById(userId)
      .select("-password") // Exclude password
      .populate({
        path: "solvedProblems",
        select: "difficulty" // We only need the difficulty field
      });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. CALCULATE STATS (Easy/Medium/Hard)
    const stats = {
      total: user.solvedProblems.length,
      easy: 0,
      medium: 0,
      hard: 0
    };

    user.solvedProblems.forEach((prob) => {
      if (prob.difficulty === "Easy") stats.easy++;
      if (prob.difficulty === "Medium") stats.medium++;
      if (prob.difficulty === "Hard") stats.hard++;
    });

    // 4. FETCH RECENT SUBMISSIONS (Last 5)
    const recentSubmissions = await Submission.find({ userId })
      .sort({ createdAt: -1 }) // Newest first
      .limit(5)
      .populate("problemId", "title slug difficulty"); // Get problem details for the history list

    // 5. RETURN EVERYTHING
    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      stats,
      recentActivity: recentSubmissions
    });

  } catch (error) {
    console.error("Profile Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
