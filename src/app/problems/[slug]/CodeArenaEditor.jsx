"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Code2, Terminal, ChevronUp, CheckCircle2, XCircle, Timer } from "lucide-react";

export default function CodeArenaEditor({ code, onChange, slug, examples, results = [], isRunning }) {
  const [consoleOpen, setConsoleOpen] = useState(false);

  // Auto-open console when results arrive
  const hasResults = results.length > 0;

  return (
    <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
      {/* Editor Tab Header */}
      <div className="h-10 bg-[#252525] flex items-center px-4 justify-between border-b border-white/5">
        <div className="flex items-center gap-2 text-mainCol">
          <Code2 size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Solution.js</span>
        </div>
        {isRunning && (
          <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
            <Timer size={12} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Executing...</span>
          </div>
        )}
      </div>
      
      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            padding: { top: 20 },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            }
          }}
        />
      </div>

      {/* Console Drawer */}
      <div className={`bg-[#0a0a0a] border-t border-white/5 transition-all duration-500 ease-in-out flex flex-col ${consoleOpen || hasResults ? 'h-72' : 'h-10'}`}>
        {/* Console Header */}
        <div 
          onClick={() => setConsoleOpen(!consoleOpen)} 
          className="h-10 px-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors flex-shrink-0"
        >
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            <Terminal size={14} className={hasResults ? "text-mainCol" : ""} /> 
            Output Console
          </div>
          <div className="flex items-center gap-4">
            {hasResults && (
              <div className="flex gap-2 text-[9px] font-bold">
                <span className="text-emerald-500 uppercase">Passed: {results.filter(r => r.passed).length}</span>
                <span className="text-rose-500 uppercase">Failed: {results.filter(r => !r.passed).length}</span>
              </div>
            )}
            <ChevronUp size={16} className={`transition-transform duration-300 ${consoleOpen || hasResults ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] custom-scrollbar bg-black/20">
           {(consoleOpen || hasResults) ? (
             <div className="space-y-4">
               {results.length > 0 ? (
                 results.map((res, i) => (
                   <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-3">
                     <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Test Case {res.case}</span>
                       {res.passed ? (
                         <span className="flex items-center gap-1 text-emerald-500 font-bold uppercase text-[9px]">
                           <CheckCircle2 size={12} /> Accepted
                         </span>
                       ) : (
                         <span className="flex items-center gap-1 text-rose-500 font-bold uppercase text-[9px]">
                           <XCircle size={12} /> Runtime Error
                         </span>
                       )}
                     </div>

                     <div className="grid grid-cols-1 gap-3">
                        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                           <span className="text-zinc-600 block text-[9px] uppercase mb-1 font-sans font-bold">Expected Output</span>
                           <span className="text-zinc-300">{res.expected}</span>
                        </div>
                        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                           <span className="text-zinc-600 block text-[9px] uppercase mb-1 font-sans font-bold">Your Output</span>
                           <span className={res.passed ? "text-emerald-400" : "text-rose-400"}>
                             {res.error ? res.error : res.actual}
                           </span>
                        </div>
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="space-y-1">
                   <p className="text-zinc-400 font-bold tracking-widest uppercase text-[9px] mb-2 text-mainCol underline underline-offset-4">Environment Status:</p>
                   <p className="text-zinc-600">{`> Initializing environment for ${slug}...`}</p>
                   <p className="text-zinc-600">{`> Virtual Machine ready.`}</p>
                   <p className="text-zinc-600">{`> Waiting for code execution...`}</p>
                 </div>
               )}
             </div>
           ) : (
             <p className="text-zinc-700 italic">Click to view execution details</p>
           )}
        </div>
      </div>
    </div>
  );
}