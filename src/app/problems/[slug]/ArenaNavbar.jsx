"use client";
import { ChevronLeft, Play, Send, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ArenaNavbar({ title, onRun, isRunning }) {
  const router = useRouter();
  return (
    <nav className="h-12 border-b border-white/5 bg-zinc-900/80 backdrop-blur-md flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push("/problems")} className="p-1.5 hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 hover:text-white">
          <ChevronLeft size={18} />
        </button>
        <div className="h-4 w-px bg-zinc-800" />
        <h1 className="text-[11px] font-black text-zinc-100 uppercase tracking-widest truncate max-w-[200px]">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-[10px] font-black uppercase transition-all"
        >
          <Play size={12} className={isRunning ? "animate-pulse" : "fill-emerald-500 text-emerald-500"} /> 
          {isRunning ? "Running..." : "Run"}
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 bg-mainCol hover:brightness-110 text-white rounded-lg text-[10px] font-black uppercase transition-all shadow-lg shadow-mainCol/20">
          <Send size={12} /> Submit
        </button>
        <div className="h-4 w-px bg-zinc-800 mx-1" />
        <button className="p-1.5 text-zinc-500 hover:text-zinc-200"><Settings size={16} /></button>
      </div>
    </nav>
  );
}