import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sendVerificationEmail } from "@/lib/mail"; // Import the helper

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { username, email, password } = validation.data;

    await connectDB();

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // OPTIONAL: If user exists but is NOT verified, you might want to resend OTP here.
      // For now, we return error to keep it simple.
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Set expiry to 1 hour from now
    const otpExpiry = new Date(Date.now() + 3600000); 

    // 4. Create User (Unverified)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verifyToken: otp,
      verifyTokenExpiry: otpExpiry
    });

    await newUser.save();

    // 5. Send Email
    const emailSent = await sendVerificationEmail(email, otp);

    if (!emailSent) {
      // If email fails, you might want to delete the user so they can try again
      // await User.findByIdAndDelete(newUser._id);
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User registered. Please check your email for OTP.",
      success: true,
      // Do NOT send the user object yet, or keep it minimal
    }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}