import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Shield, Cpu, Activity, CheckCircle, AlertCircle, Loader2, Sun, Moon, ArrowRight, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState(0); 
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const runAudit = async (e) => {
    e.preventDefault();
    if (!repoUrl) return;

    setLoading(true);
    setError(null);
    setAuditData(null);
    setStage(1);

    try {
      setTimeout(() => setStage(2), 2000);
      const response = await axios.post(`${API_BASE_URL}/api/audit`, { repoUrl });
      setAuditData(response.data.analysis);
      setStage(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to backend. Ensure the server is running.');
      setStage(0);
    } finally {
      setLoading(false);
    }
  };

  const PipelineStep = ({ icon: Icon, label, active, completed }) => (
    <div className={`flex flex-col items-center gap-3 relative z-10 ${active || completed ? 'text-primary' : 'text-gray-400 dark:text-gray-600'}`}>
      <motion.div 
        animate={active ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`p-4 rounded-2xl border-2 transition-all duration-500 glass ${
          completed 
            ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
            : active 
            ? 'bg-primary/5 border-primary shadow-lg' 
            : 'bg-white/5 dark:bg-black/20 border-gray-200 dark:border-gray-800'
        }`}
      >
        <Icon size={24} />
      </motion.div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      {completed && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white dark:border-black">
          <CheckCircle size={10} className="text-white" />
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-700">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-blob delay-2000"></div>
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-secondary/10 dark:bg-secondary/20 rounded-full blur-[120px] animate-blob delay-4000"></div>
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-40"></div>
        <div className="absolute inset-0 noise"></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Shield className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">POLYGLOT</span>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" className="p-2 text-gray-500 hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-2xl glass hover:scale-110 transition-all shadow-xl"
          >
            {isDark ? <Sun className="text-yellow-400" size={18} /> : <Moon className="text-primary" size={18} />}
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-12 pb-24">
        <section className="text-center mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
              <span className="inline-block bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-500 bg-clip-text text-transparent pb-2">Audit Infra</span>
              <br />
              <span className="text-primary relative">
                With AI
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 120 2 199 5.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-30" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Identify security risks and architectural flaws in seconds. 
              The ultimate "Senior DevOps Engineer" in your browser.
            </p>
          </motion.div>

          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={runAudit} 
            className="mt-12 max-w-3xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all opacity-0 group-focus-within:opacity-100"></div>
            <div className="relative flex items-center p-2 bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl">
              <Search className="ml-6 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Paste GitHub repository URL..."
                className="flex-1 bg-transparent px-6 py-5 text-lg focus:outline-none dark:text-white font-medium"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Activity size={20} /> RUN AUDIT</>}
              </button>
            </div>
          </motion.form>
        </section>

        <AnimatePresence>
          {stage > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto flex justify-between items-center mb-24 px-12 relative"
            >
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent -translate-y-1/2 z-0"></div>
              <PipelineStep icon={Activity} label="Fetching" active={stage === 1} completed={stage > 1} />
              <PipelineStep icon={Cpu} label="AI Logic" active={stage === 2} completed={stage > 2} />
              <PipelineStep icon={Shield} label="Security" active={stage === 2} completed={stage > 2} />
              <PipelineStep icon={CheckCircle} label="Success" active={stage === 3} completed={stage === 3} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {auditData && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-12 gap-6"
            >
              {/* BENTO GRID LAYOUT */}
              
              {/* 1. Summary Block (Large) */}
              <div className="col-span-12 lg:col-span-8 p-8 rounded-[2.5rem] glass dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Shield size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 italic underline decoration-primary decoration-4 underline-offset-8">
                       SUMMARY
                    </h2>
                    {auditData.mode === 'Cloud-Limited' && (
                      <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-[9px] px-3 py-1.5 rounded-full border border-yellow-500/20 font-black tracking-widest uppercase">
                        Cloud Mode
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {auditData.summary}
                  </p>
                </div>
              </div>

              {/* 2. Score Block (Small Square) */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4 p-8 rounded-[2.5rem] bg-primary text-white shadow-2xl shadow-primary/30 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-80">Safety Rating</h2>
                <div className="text-9xl font-black tracking-tighter relative z-10">
                  {auditData.score}
                </div>
                <div className="text-xs font-bold opacity-60 mt-2 italic">Out of 10.0</div>
              </div>

              {/* 3. Infra Preview (Wide) */}
              {auditData.infrastructure && (
                <div className="col-span-12 lg:col-span-7 p-8 rounded-[2.5rem] glass dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl">
                  <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                    <Cpu className="text-primary" /> INFRA PREVIEW
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {auditData.infrastructure.map((resource, i) => (
                      <motion.div 
                        whileHover={{ y: -5 }}
                        key={i} 
                        className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm"
                      >
                        <p className="text-[9px] text-gray-400 font-black uppercase mb-1 tracking-widest">{resource.type}</p>
                        <p className="text-sm font-bold truncate mb-3">{resource.name}</p>
                        <div className={`text-[9px] font-black px-3 py-1.5 rounded-lg w-fit tracking-widest uppercase ${
                          resource.status.toLowerCase().includes('risk') 
                            ? 'bg-red-500/10 text-red-500' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {resource.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Recommendations (Tall) */}
              <div className="col-span-12 lg:col-span-5 p-8 rounded-[2.5rem] bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl overflow-hidden relative">
                 <h2 className="text-xl font-black mb-8 tracking-tight italic">NEXT STEPS</h2>
                 <ul className="space-y-6">
                   {auditData.recommendations.map((rec, i) => (
                     <li key={i} className="flex gap-4 group">
                       <span className="text-primary font-black text-lg">0{i+1}.</span>
                       <p className="text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity leading-snug">
                         {rec}
                       </p>
                     </li>
                   ))}
                 </ul>
              </div>

              {/* 5. Vulnerabilities (Full Width) */}
              <div className="col-span-12 mt-4">
                <h2 className="text-3xl font-black mb-8 px-4 flex items-center gap-4 italic underline decoration-red-500 decoration-8 underline-offset-4">
                  CRITICAL FINDINGS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {auditData.vulnerabilities.map((v, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-[2rem] glass dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-start gap-6 relative overflow-hidden shadow-lg"
                    >
                      <div className={`p-4 rounded-2xl ${v.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        <AlertCircle size={32} />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-[8px] font-black uppercase tracking-tighter bg-gray-200 dark:bg-white/10 px-2 py-1 rounded">
                             {v.source}
                           </span>
                           <span className="text-xs font-mono opacity-40 truncate">{v.file}</span>
                        </div>
                        <p className="text-lg font-black leading-tight mb-2 tracking-tight uppercase">
                          {v.issue}
                        </p>
                        <div className="flex items-center gap-2">
                           <div className={`h-1 w-12 rounded-full ${v.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                           <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">{v.severity} IMPACT</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 dark:border-white/5 py-12 text-center">
        <p className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.5em]">
          Automated Security Intelligence v2.0
        </p>
      </footer>
    </div>
  );
}

export default App;
