import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // --- NEW FIELDS FOR OTP ---
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  verifyToken: String,      // Stores the OTP
  verifyTokenExpiry: Date,  // Expiration time
  // --------------------------

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;