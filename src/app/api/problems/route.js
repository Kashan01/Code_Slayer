import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Problem from "@/models/Problem";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";


export async function GET(request) {
  try {
    await connectDB();

    // 1. Get Search Params (e.g. ?page=1&difficulty=Medium)
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10; // Default 20 problems per page
    const search = searchParams.get("search") || "";
    const difficulty = searchParams.get("difficulty") || "All";
    const category = searchParams.get("category") || "All";

    // 2. Build Query Object
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    if (difficulty !== "All") {
      query.difficulty = difficulty;
    }

    if (category !== "All") {
      query.category = category;
    }

    // 3. Calculate Skip for Pagination
    const skip = (page - 1) * limit;

    // 4. Run Queries (Parallel for speed)
    const [problems, total] = await Promise.all([
      Problem.find(query)
        .sort({ order: 1 }) // Sort by Order (1, 2, 3...)
        .skip(skip)
        .limit(limit)
        // --- CRITICAL OPTIMIZATION ---
        // We EXCLUDE (- field) heavy fields to save bandwidth.
        // We only fetch what we show on the card.
        .select("-description -examples -constraints -starterCode -__v"),
      
      Problem.countDocuments(query) // Get total for frontend pagination
    ]);

    // 5. Return Response
    return NextResponse.json({
      success: true,
      message: "Problems fetched successfully",
      problems,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        perPage: limit
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Get Problems Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    await connectDB();

    // 1. AUTHENTICATION & ADMIN CHECK
    // Get token from header: "Authorization: Bearer <token>"
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    
    // Verify Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    // Check if User is Admin in DB
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    // 2. CREATE THE PROBLEM
    const body = await request.json();

    // Basic validation (ensure unique slug)
    const existingProblem = await Problem.findOne({ slug: body.slug });
    if (existingProblem) {
      return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
    }

    // Create new problem
    const newProblem = await Problem.create(body);

    return NextResponse.json({
      success: true,
      message: "Problem created successfully",
      problem: newProblem
    }, { status: 201 });

  } catch (error) {
    console.error("Create Problem Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}