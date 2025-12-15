"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Flame, Trophy } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Code<span className="text-red-500">Slayer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-xl md:text-2xl text-zinc-300 max-w-2xl"
        >
          Where Coders Become Slayers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex gap-4"
        >
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            Start Slaying <ArrowRight size={18} />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 px-6 py-3 rounded-xl"
          >
            Login
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
        <Feature
          icon={<Code2 size={28} />}
          title="Curated DSA Problems"
          description="Practice hand-picked problems across arrays, strings, DP, graphs, and more."
        />
        <Feature
          icon={<Flame size={28} />}
          title="Track Your Progress"
          description="Mark problems as solved, build streaks, and visualize your growth."
        />
        <Feature
          icon={<Trophy size={28} />}
          title="Interview Ready"
          description="Designed to sharpen problem-solving skills needed for real interviews."
        />
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-zinc-900/60">
        <h2 className="text-4xl font-bold">Ready to become a CodeSlayer?</h2>
        <p className="mt-4 text-zinc-300 text-lg">
          Practice consistently. Track progress. Level up your coding skills.
        </p>
        <Link
          href="/register"
          className="inline-block mt-8 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} CodeSlayer. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center shadow"
    >
      <div className="flex justify-center text-red-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  );
}
