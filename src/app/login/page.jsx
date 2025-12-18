"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {openApi} from "@/lib/api";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/GoogleAuthButton";

// --- 1. Validation Schema using Yup ---
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});



export default function LoginPage() {
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // --- 3. Formik Hook ---
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setApiError(null);
      setIsSubmitting(true);
      try {
        const response = await openApi.post('/auth/login',{
          email:values.email,
          password:values.password
        })
        // Handle successful login (e.g., store token, redirect user)
        // console.log("Login successful:", response.data.token);
        localStorage.setItem('accessToken',response?.data?.token);
        localStorage.setItem('user',JSON.stringify(response?.data?.user));
        router.push('/problems');
        
        



      } catch (error) {
        // Handle API errors
        // console.error("Login failed:", error);
        const errorMessage = error?.response?.data?.error;
        setApiError(errorMessage || "An unexpected error occurred during login.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Helper to check if an input field has been touched AND has an error
  const getFieldClasses = (name) =>
    formik.touched[name] && formik.errors[name]
      ? "border-red-500 focus-within:border-red-500" // Error state
      : "border-zinc-800 focus-within:border-mainCol"; // Default/Focus state

  // Note: Assuming 'mainCol' is defined in your Tailwind config or globally as the theme color.

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl"
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Code<span className="text-mainCol">Slayer</span>
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Login to continue your slaying journey ⚔️
        </p>
      </div>

      {/* Google Login */}
        <div className="flex justify-center mx-auto mb-4">
           <GoogleAuthButton />
           </div>

      {/* <button className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:border-mainCol/70 py-2.5 rounded-xl mb-4 transition">
        <FcGoogle size={20} />
        <span className="font-medium text-sm text-white">
          Continue with Google
        </span>
      </button> */}

      <div className="flex items-center gap-3 mb-4 mt-5">
        <div className="flex-1 h-px bg-zinc-800" />
        <span className="text-zinc-500 text-xs">OR</span>
        <div className="flex-1 h-px bg-zinc-800" />
      </div>

      {/* API Error */}
      {apiError && (
        <div className="bg-red-900/30 border border-red-700 text-red-400 p-2 rounded-lg mb-4 text-xs">
          {apiError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs mb-1 text-zinc-400">Email</label>
          <div
            className={`flex items-center gap-2 bg-zinc-950 border rounded-xl px-4 py-2.5 ${getFieldClasses(
              "email"
            )}`}
          >
            <Mail size={16} className="text-zinc-500" />
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-transparent outline-none w-full text-sm text-white"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs mb-1 text-zinc-400">Password</label>
          <div
            className={`flex items-center gap-2 bg-zinc-950 border rounded-xl px-4 py-2.5 ${getFieldClasses(
              "password"
            )}`}
          >
            <Lock size={16} className="text-zinc-500" />
            <input
              type="password"
              placeholder="••••••••"
              className="bg-transparent outline-none w-full text-sm text-white"
              {...formik.getFieldProps("password")}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-zinc-400">
            <input
              type="checkbox"
              className="accent-mainCol"
              {...formik.getFieldProps("rememberMe")}
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-mainCol hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !formik.isValid}
          className={`w-full mt-12 py-2.5 rounded-xl font-semibold transition text-sm text-white ${
            isSubmitting || !formik.isValid
              ? "bg-zinc-600 cursor-not-allowed"
              : "bg-mainCol hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-5 text-center text-xs text-zinc-400">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-mainCol hover:underline font-medium"
        >
          Create one
        </Link>
      </p>

    </motion.div>
  </div>
);

}