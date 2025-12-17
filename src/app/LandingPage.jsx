"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Flame,
  Trophy,
  Users,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-20 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-36 pb-28">
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="text-5xl md:text-7xl font-extrabold tracking-tight flex items-center justify-center"
>
  <span>Code</span>
<Image
      src="/logo.png"
      alt="logo"
      width={110}
      height={110}
      className="inline-block"
    />
    <span className="text-red-500">Slayer</span>
    
 
</motion.h1>


        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-xl md:text-2xl text-zinc-300 max-w-3xl"
        >
          Where Coders Become Slayers — practice DSA, build consistency, and
          transform problem-solving into a habit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-7 py-3 rounded-xl font-semibold shadow-lg"
          >
            Start Slaying <ArrowRight size={18} />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 px-7 py-3 rounded-xl"
          >
            Login
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full"
        >
          <Stat value="500+" label="DSA Problems" />
          <Stat value="50+" label="Topics Covered" />
          <Stat value="10k+" label="Solutions" />
          <Stat value="Daily" label="Practice Mode" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Developers Love <span className="text-red-500">CodeSlayer</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={<Code2 size={28} />}
            title="Curated DSA Problems"
            description="Carefully selected problems across arrays, strings, recursion, DP, graphs, and more."
          />
          <Feature
            icon={<Flame size={28} />}
            title="Progress & Streaks"
            description="Mark problems as solved, maintain streaks, and stay consistent every day."
          />
          <Feature
            icon={<Trophy size={28} />}
            title="Interview Focused"
            description="Sharpen logic and patterns that actually appear in real interviews."
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-zinc-900/60 py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-14">
          How CodeSlayer Works
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Step
            icon={<BookOpen />}
            title="Pick a Problem"
            description="Browse problems by difficulty, tags, or topics."
          />
          <Step
            icon={<Sparkles />}
            title="Practice Daily"
            description="Solve problems in your own IDE or editor and learn patterns."
          />
          <Step
            icon={<Users />}
            title="Track Growth"
            description="Mark solved problems and watch your progress grow over time."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">
          Become Interview Ready
        </h2>
        <p className="mt-5 text-zinc-300 text-lg max-w-2xl mx-auto">
          Build consistency, master DSA fundamentals, and level up your
          problem-solving mindset.
        </p>
        <Link
          href="/register"
          className="inline-block mt-10 bg-red-600 hover:bg-red-700 px-10 py-4 rounded-xl font-semibold text-lg"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-500 text-sm border-t border-zinc-800">
        © {new Date().getFullYear()} CodeSlayer. Where Coders Become Slayers.
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center shadow"
    >
      <div className="flex justify-center text-red-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center">
      <div className="text-3xl font-bold text-red-500">{value}</div>
      <div className="mt-1 text-zinc-400 text-sm">{label}</div>
    </div>
  );
}

function Step({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center"
    >
      <div className="flex justify-center text-red-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  );
}
