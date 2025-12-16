import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email("Invalid email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Validate Input
    const validation = verifySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, otp } = validation.data;

    await connectDB();

    // 2. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Check if already verified
    if (user.isVerified) {
      return NextResponse.json({ message: "User is already verified" }, { status: 200 });
    }

    // 4. Validate OTP
    if (user.verifyToken !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // 5. Validate Expiry
    if (new Date(user.verifyTokenExpiry) < new Date()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // 6. Success! Update User
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    // 7. Generate JWT (Auto-Login)
    // Now that they are verified, we give them the token so they don't have to login again.
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
      token, // Frontend stores this
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: true
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}