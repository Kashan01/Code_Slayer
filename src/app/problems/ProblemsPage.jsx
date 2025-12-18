"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api"; 
import { 
  Search, PlayCircle, Code2, ChevronRight, Trophy, 
  Filter, ChevronLeft, LayoutGrid, Zap 
} from "lucide-react";
import Image from "next/image";

export default function ProblemsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- State ---
  const [problems, setProblems] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  // --- Get Params from URL ---
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentDifficulty = searchParams.get("difficulty") || "All";
  const currentCategory = searchParams.get("category") || "All";

  // --- Fetch Logic ---
  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentPage > 1) params.append("page", currentPage.toString());
      if (currentSearch) params.append("search", currentSearch);
      if (currentDifficulty !== "All") params.append("difficulty", currentDifficulty);
      if (currentCategory !== "All") params.append("category", currentCategory);

      const response = await api.get(`/problems?${params.toString()}`);
      
      if (response.data.success) {
        setProblems(response.data.problems);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentSearch, currentDifficulty, currentCategory]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // --- Navigation Helpers ---
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "All" || value === "") params.delete(key);
      else params.set(key, value);
    });
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`/problems?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/problems?${params.toString()}`);
  };

  const getDifficultyColor = (diff) => {
    const colors = {
      Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      Hard: "text-rose-400 bg-rose-400/10 border-rose-400/20"
    };
    return colors[diff] || "text-zinc-400 bg-zinc-400/10 border-zinc-800";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 py-12 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Header & Search */}
        <header className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                {/* <Zap className="text-mainCol fill-mainCol" size={32} /> */}
                <Image src="/logo.png" alt="Code Slayer Logo" width={32} height={32} />
                Code <span className="text-mainCol">Arena</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Input */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  type="text"
                  placeholder="Filter by title..."
                  defaultValue={currentSearch}
                  onKeyDown={(e) => e.key === "Enter" && updateParams({ search: e.target.value })}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-mainCol transition-all text-sm"
                />
              </div>

              {/* Difficulty Filter */}
              <select 
                value={currentDifficulty}
                onChange={(e) => updateParams({ difficulty: e.target.value })}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 px-4 text-sm outline-none focus:border-mainCol cursor-pointer"
              >
                {["All", "Easy", "Medium", "Hard"].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </header>

        {/* Table Container */}
      {/* Table Container */}
        <div className="bg-zinc-900/20 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          
          {/* Scrollable Area */}
          <div className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-220px)]"> 
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="sticky top-0 z-20 bg-[#0c0c0c] backdrop-blur-md">
                <tr className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-8 py-4 border-b border-white/5">#</th>
                  <th className="px-6 py-4 border-b border-white/5">Title</th>
                  <th className="px-6 py-4 border-b border-white/5">Difficulty</th>
                  <th className="px-6 py-4 border-b border-white/5 text-center">Video</th>
                  <th className="px-8 py-4 border-b border-white/5 text-right">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {loading ? (
                  [...Array(8)].map((_, i) => (
                    <tr key={i} className="animate-pulse h-[64px]">
                      <td colSpan={5} className="px-8">
                        <div className="h-4 bg-zinc-800/50 rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : (
                  problems.map((problem) => (
                    <motion.tr 
                      key={problem._id}
                      onClick={() => router.push(`/problems/${problem.slug}`)}
                      className="group hover:bg-white/[0.02] cursor-pointer transition-colors"
                    >
                      <td className="px-8 py-5 text-zinc-600 font-mono text-xs">{problem.order}</td>
                      <td className="px-6 py-5">
                        <span className="text-zinc-200 font-semibold group-hover:text-mainCol transition-colors">
                          {problem.title}
                        </span>
                        <p className="text-[10px] text-zinc-600 uppercase mt-0.5">{problem.category}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-lg border text-[10px] font-bold uppercase ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {problem.videoId && (
                          <PlayCircle size={18} className="mx-auto text-zinc-700 group-hover:text-red-500 transition-colors" />
                        )}
                      </td>
                      <td className="px-8 py-5 text-right text-zinc-700 group-hover:text-mainCol">
                        <ChevronRight size={18} className="inline group-hover:translate-x-1 transition-transform" />
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer - Outside of scroll area */}
          {!loading && problems.length > 0 && (
            <div className="bg-[#0c0c0c] border-t border-white/5 px-8 py-4 flex items-center justify-between z-30">
              <div className="text-xs text-zinc-500">
                Page <span className="text-zinc-300 font-bold">{pagination.page}</span> of <span className="text-zinc-300 font-bold">{pagination.pages}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  disabled={pagination.page === 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  disabled={pagination.page === pagination.pages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}