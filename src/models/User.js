import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    // We keep this required. For Google users, the backend generates a 
    // random complex password automatically so this validation passes.
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  // --- OTP Verification Fields ---
  verifyToken: String,
  verifyTokenExpiry: Date,
  
// for forgot password tokens
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  // --- Auth Provider Field ---
  provider: {
    type: String,
    enum: ["email", "google"], // Only allows these two values
    default: "email",
  },

  // --- NEW FIELD: ADMIN FLAG ---
  isAdmin: {
    type: Boolean,
    default: false // Everyone starts as a normal user by default
  },
}, { timestamps: true });

// Prevent model overwrite upon hot-reload in Next.js
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;