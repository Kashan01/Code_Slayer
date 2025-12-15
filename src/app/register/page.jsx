"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Join <span className="text-mainCol">CodeSlayer</span>
          </h1>
          <p className="mt-2 text-zinc-400">Create your account and start slaying problems</p>
        </div>

        {/* Google Signup */}
        <button className="w-full flex items-center justify-center gap-3 border border-zinc-700 hover:border-mainCol/70 py-3 rounded-xl mb-6 transition">
          <FcGoogle size={22} />
          <span className="font-medium">Sign up with Google</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Signup Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-zinc-400">Full Name</label>
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus-within:border-mainCol">
              <User size={18} className="text-zinc-500" />
              <input
                type="text"
                placeholder="Your name"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-zinc-400">Email</label>
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus-within:border-mainCol">
              <Mail size={18} className="text-zinc-500" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-zinc-400">Password</label>
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus-within:border-mainCol">
              <Lock size={18} className="text-zinc-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-zinc-400">Confirm Password</label>
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus-within:border-mainCol">
              <Lock size={18} className="text-zinc-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-gray-200 bg-mainCol hover:opacity-90 text-black py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-mainCol hover:underline font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}


export default SignupPage;