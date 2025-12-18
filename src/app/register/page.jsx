"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { openApi } from '@/lib/api'; 
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/GoogleAuthButton";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot be longer than 30 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

function SignupPage() {
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const getFieldClasses = (name) =>
    formik.touched[name] && formik.errors[name]
      ? "border-red-500 focus-within:border-red-500"
      : "border-zinc-800 focus-within:border-mainCol";

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setApiError(null);
      setIsSubmitting(true);
      
      const registrationData = {
          username: values.username,
          email: values.email,
          password: values.password,
      };

      try {
        const response = await openApi.post('/auth/register', registrationData); 
        localStorage.setItem('registrationEmail',values.email);
        router.push('/verify');
      } catch (error) {
        setApiError(error?.response?.data?.error || "Registration failed.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Join <span className="text-mainCol">CodeSlayer</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Create your account and start slaying problems
          </p>
        </div>

        <div className="flex justify-center mx-auto mb-4">
          <GoogleAuthButton />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* API Error */}
        {apiError && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 p-2 rounded-lg mb-4 text-xs text-center">
            {apiError}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs mb-1 text-zinc-400 ml-1">Username</label>
            <div className={`flex items-center gap-2 bg-zinc-950 border rounded-xl px-4 py-2.5 ${getFieldClasses("username")}`}>
              <User size={16} className="text-zinc-500" />
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent outline-none w-full text-sm text-white"
                {...formik.getFieldProps("username")}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-[10px] text-red-500 ml-1">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs mb-1 text-zinc-400 ml-1">Email</label>
            <div className={`flex items-center gap-2 bg-zinc-950 border rounded-xl px-4 py-2.5 ${getFieldClasses("email")}`}>
              <Mail size={16} className="text-zinc-500" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full text-sm text-white"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-[10px] text-red-500 ml-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs mb-1 text-zinc-400 ml-1">Password</label>
            <div className={`flex items-center gap-2 bg-zinc-950 border rounded-xl px-4 py-2.5 ${getFieldClasses("password")}`}>
              <Lock size={16} className="text-zinc-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm text-white"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-[10px] text-red-500 ml-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs mb-1 text-zinc-400 ml-1">Confirm Password</label>
            <div className={`flex items-center gap-2 bg-zinc-950 border rounded-xl px-4 py-2.5 ${getFieldClasses("confirmPassword")}`}>
              <Lock size={16} className="text-zinc-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm text-white"
                {...formik.getFieldProps("confirmPassword")}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-1 text-[10px] text-red-500 ml-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className={`w-full py-3 mt-2 rounded-xl font-semibold transition text-sm text-white ${
              isSubmitting || !formik.isValid
                ? "bg-zinc-600 cursor-not-allowed"
                : "bg-mainCol hover:opacity-90"
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-400">
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