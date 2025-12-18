"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import ArenaNavbar from "./ArenaNavbar";
import ProblemDescription from "./ProblemDescription";
import CodeArenaEditor from "./CodeArenaEditor";

export default function ProblemSlugPage() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCode, setUserCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // --- Execution State ---
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/problems/${slug}`);
        if (res.data?.problem) {
          setProblem(res.data.problem);
          setUserCode(res.data.problem.starterCode || "");
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchProblem();
  }, [slug]);

  const handleRunCode = () => {
    setIsRunning(true);
    setResults([]); // Clear previous results

    // Small timeout to simulate network/processing delay for "Slayer" feel
    setTimeout(() => {
      const testResults = [];
      try {
        // 1. Transform the code string into an executable function
        // We assume the user code starts with "function solution(...) { ..." or similar
        // We create a wrapper to evaluate it
        const userFn = new Function(`return ${userCode}`)();

        problem.examples.forEach((example, index) => {
          try {
            // 2. Parse Input (e.g., "nums = [2,7,11], target = 9")
            // This regex finds values after '=' and parses them
            const inputParts = example.inputText.split(",").map(part => {
              const value = part.split("=")[1].trim();
              return JSON.parse(value);
            });

            // 3. Execute
            const startTime = performance.now();
            const actualOutput = userFn(...inputParts);
            const endTime = performance.now();

            // 4. Compare with Expected
            const expectedOutput = JSON.parse(example.outputText);
            const passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);

            testResults.push({
              case: index + 1,
              passed,
              expected: example.outputText,
              actual: JSON.stringify(actualOutput),
              runtime: (endTime - startTime).toFixed(2)
            });
          } catch (err) {
            testResults.push({
              case: index + 1,
              passed: false,
              error: err.message,
              expected: example.outputText,
            });
          }
        });
        setResults(testResults);
      } catch (globalErr) {
        setResults([{ case: "Syntax", passed: false, error: "Compilation Error: " + globalErr.message }]);
      } finally {
        setIsRunning(false);
      }
    }, 600);
  };

  if (loading) return (
    <div className="h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-mainCol border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 font-black text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Loading Challenge...
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden text-zinc-300">
      {/* Pass handleRunCode to the Navbar */}
      <ArenaNavbar 
        title={problem?.title} 
        onRun={handleRunCode} 
        isRunning={isRunning} 
      />

      <main className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-white/5 flex flex-col bg-[#0f0f0f]">
          {/* ... Tabs logic same as before ... */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeTab === 'description' ? <ProblemDescription problem={problem} /> : <div>Video...</div>}
          </div>
        </div>

        {/* Pass results and isRunning state to the Editor */}
        <CodeArenaEditor 
          code={userCode} 
          onChange={setUserCode} 
          slug={slug} 
          results={results}
          isRunning={isRunning}
        />
      </main>
    </div>
  );
}