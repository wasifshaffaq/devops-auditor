import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Shield, Cpu, Activity, CheckCircle, AlertCircle, Loader2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState(0); // 0: Idle, 1: Fetching, 2: Auditing, 3: Completed
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
      // Simulate pipeline progression
      setTimeout(() => setStage(2), 2000);

      const response = await axios.post(`${API_BASE_URL}/api/audit`, { repoUrl });
      
      setAuditData(response.data.analysis);
      setStage(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to backend. Is it running?');
      setStage(0);
    } finally {
      setLoading(false);
    }
  };

  const PipelineStep = ({ icon: Icon, label, active, completed }) => (
    <div className={`flex flex-col items-center gap-2 ${active || completed ? 'text-primary' : 'text-gray-400 dark:text-gray-600'}`}>
      <div className={`p-3 rounded-full border-2 transition-all duration-300 ${
        completed 
          ? 'bg-primary/10 border-primary' 
          : active 
          ? 'border-primary animate-pulse' 
          : 'border-gray-200 dark:border-gray-800'
      }`}>
        <Icon size={24} />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-foreground p-8 flex flex-col items-center transition-colors duration-300">
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 p-3 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:scale-110 transition-all z-50 shadow-lg"
      >
        {isDark ? <Sun className="text-yellow-500" size={20} /> : <Moon className="text-primary" size={20} />}
      </button>

      <header className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-4 leading-normal">
          DevOps Polyglot Auditor
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          AI-Powered Infrastructure Security & Best Practice Analysis
        </p>
      </header>

      <main className="max-w-4xl w-full">
        <form onSubmit={runAudit} className="relative group mb-12">
          <input
            type="text"
            placeholder="Paste public GitHub repository URL..."
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-5 pl-14 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Audit Repo'}
          </button>
        </form>

        {stage > 0 && (
          <div className="flex justify-between items-center mb-16 px-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex justify-between w-full">
              <PipelineStep icon={Activity} label="Fetching" active={stage === 1} completed={stage > 1} />
              <PipelineStep icon={Cpu} label="AI Analysis" active={stage === 2} completed={stage > 2} />
              <PipelineStep icon={Shield} label="Security Check" active={stage === 2} completed={stage > 2} />
              <PipelineStep icon={CheckCircle} label="Completed" active={stage === 3} completed={stage === 3} />
            </div>
          </div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/50 p-5 rounded-2xl flex items-center gap-3 text-red-500 mb-8 font-medium"
          >
            <AlertCircle size={20} />
            <p>{error}</p>
          </motion.div>
        )}

        <AnimatePresence>
          {auditData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12"
            >
              <div className="md:col-span-2 space-y-8">
                {auditData.infrastructure && (
                  <section className="bg-blue-500/5 dark:bg-blue-500/5 border border-blue-500/10 dark:border-blue-500/20 p-8 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                      <Cpu size={22} /> Infrastructure Preview
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {auditData.infrastructure.map((resource, i) => (
                        <div key={i} className="bg-white dark:bg-black/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between shadow-sm">
                          <div>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-widest">{resource.type}</p>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate mb-3">{resource.name}</p>
                          </div>
                          <p className={`text-[10px] font-bold px-3 py-1 rounded-full w-fit ${
                            resource.status.toLowerCase().includes('risk') || resource.status.toLowerCase().includes('missing')
                              ? 'bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/10'
                              : resource.status.toLowerCase().includes('optimized') || resource.status.toLowerCase().includes('ready')
                              ? 'bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/10'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/10'
                          }`}>
                            {resource.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <Shield className="text-primary" size={22} /> Senior Engineer Summary
                    </h2>
                    {auditData.mode === 'Cloud-Limited' && (
                      <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-[10px] px-2.5 py-1 rounded-lg border border-yellow-500/20 font-black uppercase tracking-wider">
                        Cloud Mode
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words text-lg">{auditData.summary}</p>
                </section>

                <section className="bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Detected Vulnerabilities</h2>
                  <div className="space-y-4">
                    {auditData.vulnerabilities.map((v, i) => (
                      <div key={i} className="flex items-start gap-5 p-5 bg-white dark:bg-black/40 rounded-2xl border border-gray-100 dark:border-gray-800 border-l-4 border-l-red-500 shadow-sm transition-transform hover:translate-x-1">
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-black text-[9px] text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                              {v.source || 'AI Auditor'}
                            </span>
                            <span className="font-mono text-xs text-gray-400 truncate flex-1">{v.file}</span>
                          </div>
                          <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-snug">{v.issue}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0 ${
                          v.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                        }`}>
                          {v.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-8 text-center md:text-left">
                <section className="bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-10 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                  <h2 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Security Score</h2>
                  <div className="text-8xl font-black text-primary drop-shadow-sm">{auditData.score}<span className="text-3xl text-gray-300 dark:text-gray-600">/10</span></div>
                </section>

                <section className="bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-sm overflow-hidden">
                  <h2 className="text-lg font-bold mb-6">Key Recommendations</h2>
                  <ul className="space-y-5">
                    {auditData.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 break-words leading-relaxed group">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 group-hover:scale-125 transition-transform"></div>
                        <span className="flex-1">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
