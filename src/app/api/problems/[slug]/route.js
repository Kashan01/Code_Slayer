import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Problem from "@/models/Problem";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    // --- THE FIX IS HERE ---
    // In Next.js 15, params is a Promise, so we must await it first.
    const { slug } = await params;

    await connectDB();

    const problem = await Problem.findOne({ slug }).select("-__v");

    if (!problem) {
      return NextResponse.json(
        { error: "Problem not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Problem fetched successfully",
      problem
    }, { status: 200 });

  } catch (error) {
    console.error("Get Single Problem Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}




// ... (Keep your existing GET function here) ...

// UPDATE PROBLEM (PUT)
export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();

    // 1. ADMIN CHECK (Reusable logic)
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(e) { return NextResponse.json({ error: "Invalid Token" }, { status: 401 }); }

    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // 2. UPDATE LOGIC
    const body = await request.json();

    // We use "findOneAndUpdate"
    // new: true -> returns the updated document
    // runValidators: true -> ensures data rules (like required fields) are respected
    const updatedProblem = await Problem.findOneAndUpdate(
      { slug }, 
      body, 
      { new: true, runValidators: true }
    );

    if (!updatedProblem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Problem updated",
      problem: updatedProblem
    });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// DELETE PROBLEM (Optional but useful)
export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();

    // 1. ADMIN CHECK ... (Same as above)
    const headersList = await headers();
    const token = headersList.get("authorization")?.split(" ")[1];
    if(!token) return NextResponse.json({error:"Unauthorized"}, {status:401});
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user?.isAdmin) return NextResponse.json({error:"Forbidden"}, {status:403});

    // 2. DELETE
    const deleted = await Problem.findOneAndDelete({ slug });
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Problem deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}