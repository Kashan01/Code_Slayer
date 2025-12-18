import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/lib/mail";

const forgotSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = forgotSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: validation.data.email });

    // Security Best Practice:
    // Even if user is not found, we usually return 200 to prevent 
    // hackers from checking which emails exist. 
    // But for this project, let's return 404 if not found for easier debugging.
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Generate Token (Random String)
    // Using a simple random string for simplicity. In production, 'crypto' module is better.
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetExpiry = new Date(Date.now() + 3600000); // 1 Hour

    // 2. Save to DB
    user.forgotPasswordToken = resetToken;
    user.forgotPasswordTokenExpiry = resetExpiry;
    await user.save();

    // 3. Send Email
    // Frontend URL: http://localhost:4321/reset-password?token=xyz
    const resetUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/reset-password?token=${resetToken}`;
    
    await sendPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json({
      message: "Password reset email sent",
      success: true
    }, { status: 200 });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}