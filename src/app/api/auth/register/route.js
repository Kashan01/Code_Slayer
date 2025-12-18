import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sendVerificationEmail } from "@/lib/mail";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

// Initialize Google Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Validation Schema for Email Registration
const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    // ============================================================
    // FLOW A: GOOGLE OAUTH (Instant Login/Register)
    // ============================================================
    if (body.googleToken) {
      try {
        // 1. Verify Google Token
        const ticket = await googleClient.verifyIdToken({
          idToken: body.googleToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { email, name, sub } = ticket.getPayload();

        // 2. Check DB
        let user = await User.findOne({ email });

        if (!user) {
          // 3. Create New Google User
          // Generate a random secure password to satisfy model requirement
          const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(randomPassword, salt);

          user = new User({
            username: name,
            email: email,
            password: hashedPassword, 
            isVerified: true, // Google verifies emails automatically
            provider: "google",
          });
          await user.save();
        } else {
          // If user exists but is not verified (e.g. abandoned email signup), verify them now
          if (!user.isVerified) {
            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            user.provider = "google"; // Switch provider to google if they chose this method
            await user.save();
          }
        }

        // 4. Generate JWT
        const token = jwt.sign(
          { id: user._id, username: user.username, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return NextResponse.json({
          message: "Google Login Successful",
          success: true,
          token,
          user: { id: user._id, username: user.username, email: user.email, isVerified: true }
        }, { status: 200 });

      } catch (err) {
        console.error("Google Auth Error:", err);
        return NextResponse.json({ error: "Invalid Google Token" }, { status: 400 });
      }
    }

    // ============================================================
    // FLOW B: STANDARD EMAIL REGISTRATION (Requires OTP)
    // ============================================================
    
    // 1. Validate Input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { username, email, password } = validation.data;

    // 2. Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Stop if already verified
      if (existingUser.isVerified) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 }
        );
      }

      // Spam Cooldown Check (1 Minute)
      const lastUpdated = new Date(existingUser.updatedAt).getTime();
      const now = Date.now();
      if (now - lastUpdated < 60 * 1000) { 
        return NextResponse.json(
          { error: "Please wait 1 minute before requesting another OTP." },
          { status: 429 } 
        );
      }
    }

    // 3. Prepare Data
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 3600000); // 1 hour

    // 4. Database Write
    if (existingUser) {
      // Update unverified user
      existingUser.username = username;
      existingUser.password = hashedPassword;
      existingUser.verifyToken = otp;
      existingUser.verifyTokenExpiry = otpExpiry;
      existingUser.provider = "email"; // Ensure provider is set
      await existingUser.save();
    } else {
      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyToken: otp,
        verifyTokenExpiry: otpExpiry,
        provider: "email"
      });
      await newUser.save();
    }

    // 5. Send Email
    const verifyUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/verify?otp=${otp}&email=${email}`;
    const emailSent = await sendVerificationEmail(email, otp, verifyUrl);

    if (!emailSent) {
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User registered. Please check your email for OTP.",
      success: true,
      // No token returned here; user must verify first
    }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}