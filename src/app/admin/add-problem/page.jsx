"use client";
import React, { useState } from 'react';
import { Plus, Trash2, Code2, BookOpen, Layers, Settings2, Save, Terminal, Globe } from 'lucide-react';

export default function AdminProblemPage() {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy",
    category: "",
    order: 0,
    description: "",
    constraints: [""],
    examples: [{ id: 1, inputText: "", outputText: "", explanation: "" }],
    starterCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addConstraint = () => setFormData(p => ({ ...p, constraints: [...p.constraints, ""] }));
  const removeConstraint = (index) => {
    const newC = formData.constraints.filter((_, i) => i !== index);
    setFormData(p => ({ ...p, constraints: newC }));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 flex font-sans">
      {/* Sidebar */}
      {/* <div className="w-64 bg-[#09090b] border-r border-zinc-800 p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-10 text-xl font-bold text-white">
          <div className="bg-indigo-600 p-1.5 rounded-lg"><Terminal size={20}/></div>
          <span>LeetClone</span>
        </div>
        <nav className="space-y-2">
          <div className="text-zinc-500 font-medium text-[11px] uppercase tracking-wider mb-4">Core</div>
          <div className="flex items-center gap-3 bg-zinc-800 text-white px-3 py-2 rounded-md cursor-pointer"><Layers size={18}/> Problems</div>
          <div className="flex items-center gap-3 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 px-3 py-2 rounded-md transition cursor-pointer"><BookOpen size={18}/> Submissions</div>
          <div className="flex items-center gap-3 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 px-3 py-2 rounded-md transition cursor-pointer"><Settings2 size={18}/> Settings</div>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Create Problem</h1>
            <p className="text-zinc-500 text-sm">Configure your coding challenge details</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 transition shadow-sm">
              Draft
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-indigo-900/20">
              <Save size={18}/> Publish
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            
            <section className="bg-[#121214] border border-zinc-800 rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6 text-zinc-100 font-medium border-b border-zinc-800 pb-4">
                <Globe size={18} className="text-indigo-400"/>
                General Information
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Problem Title</label>
                  <input 
                    name="title" 
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-zinc-200" 
                    placeholder="e.g. Reverse Integer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Description</label>
                  <textarea 
                    name="description" 
                    onChange={handleChange}
                    rows={10}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-zinc-300 font-sans leading-relaxed" 
                    placeholder="Problem description in Markdown..."
                  />
                </div>
              </div>
            </section>

            <section className="bg-[#121214] border border-zinc-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-zinc-100 font-medium">
                   <Code2 size={18} className="text-indigo-400"/>
                   Starter Code
                </div>
                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase tracking-widest">JavaScript</span>
              </div>
              <textarea 
                name="starterCode" 
                onChange={handleChange}
                className="w-full h-64 bg-[#09090b] text-indigo-300 p-5 rounded-lg font-mono text-sm border border-zinc-800 focus:ring-1 focus:ring-indigo-500 outline-none shadow-inner" 
                placeholder="function main() { ... }"
              />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <section className="bg-[#121214] border border-zinc-800 rounded-xl p-6">
              <h2 className="text-sm font-semibold mb-6 text-zinc-100 uppercase tracking-tighter">Properties</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 uppercase mb-2">Difficulty</label>
                  <select name="difficulty" onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-sm">
                    <option className="bg-zinc-900 text-green-500">Easy</option>
                    <option className="bg-zinc-900 text-orange-500">Medium</option>
                    <option className="bg-zinc-900 text-red-500">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 uppercase mb-2">Category</label>
                  <input name="category" onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-sm" placeholder="e.g. Dynamic Programming" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 uppercase mb-2">Display Order</label>
                  <input type="number" name="order" onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-sm" />
                </div>
              </div>
            </section>

            <section className="bg-[#121214] border border-zinc-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-tighter">Constraints</h2>
                <button onClick={addConstraint} className="p-1 hover:bg-zinc-800 text-indigo-400 rounded-md transition">
                  <Plus size={18}/>
                </button>
              </div>
              <div className="space-y-3">
                {formData.constraints.map((c, i) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-xs outline-none focus:border-indigo-500 transition" 
                      placeholder={`Constraint ${i+1}`}
                      value={c}
                      onChange={(e) => {
                        const newC = [...formData.constraints];
                        newC[i] = e.target.value;
                        setFormData({...formData, constraints: newC});
                      }}
                    />
                    <button onClick={() => removeConstraint(i)} className="text-zinc-600 hover:text-red-400 transition">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}