"use client";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Building2 } from "lucide-react";

export default function ProblemDescription({ problem }) {
  console.log(problem)
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
      <div className="flex items-center gap-3 mb-6">
        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
          problem.difficulty === 'Easy' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' :
          problem.difficulty === 'Medium' ? 'bg-amber-500/5 text-amber-500 border-amber-500/20' : 'bg-rose-500/5 text-rose-500 border-rose-500/20'
        }`}>
          {problem.difficulty}
        </span>
        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
          Category: <span className="text-zinc-400">{problem.category}</span>
        </span>
      </div>

      <h2 className="text-3xl font-black text-white mb-6 tracking-tight italic">{problem.title}</h2>
      
      <div 
        className="prose prose-invert prose-sm max-w-none text-zinc-400 mb-10 leading-relaxed 
        prose-code:text-mainCol prose-code:bg-mainCol/5 prose-code:px-1 prose-code:rounded prose-strong:text-zinc-200"
        dangerouslySetInnerHTML={{ __html: problem.description }}
      />

      <div className="space-y-8">
        <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Terminal size={14} className="text-mainCol" /> Test Cases
        </h3>
        {problem.examples.map((ex, idx) => (
          <div key={ex._id} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 font-mono text-sm group hover:border-zinc-700 transition-colors">
            <p className="text-mainCol font-black text-[10px] uppercase mb-4 tracking-widest">Case {idx + 1}</p>
            <div className="space-y-3">
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <span className="text-zinc-500 block text-[10px] uppercase mb-1 font-sans font-bold">Input</span>
                <span className="text-zinc-200">{ex.inputText}</span>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <span className="text-zinc-500 block text-[10px] uppercase mb-1 font-sans font-bold">Output</span>
                <span className="text-zinc-200">{ex.outputText}</span>
              </div>
            </div>
          </div>
        ))}
{problem.companyTags && problem.companyTags.length > 0 && (
  <div className="mt-10 group">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1.5 rounded-md bg-zinc-800/50 border border-zinc-700 group-hover:border-blue-500/50 transition-colors">
        <Building2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-400" />
      </div>
      <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
        Top Companies
      </h3>
    </div>

    <div className="flex flex-wrap gap-2">
      {problem.companyTags.map((tag, idx) => (
        <span
          key={idx}
          className="relative px-3 py-1.5 text-[11px] font-semibold text-zinc-300 
                     bg-gradient-to-b from-zinc-800/80 to-zinc-900/80
                     border border-zinc-700/50 rounded-full
                     shadow-[0_2px_10px_-3px_rgba(0,0,0,0.5)]
                     hover:border-zinc-500 hover:text-white hover:scale-105
                     transition-all duration-200 cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)}
      </div>
    </motion.div>
  );
}