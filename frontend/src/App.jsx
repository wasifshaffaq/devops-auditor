import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Shield, Cpu, Activity, CheckCircle, AlertCircle, Loader2, 
  Sun, Moon, ArrowRight, Download, History, Trash2, ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState(0); 
  const [logs, setLogs] = useState([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isHistoryOpen, setIsTerminalHistoryOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('audit_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('audit_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const runAudit = async (e, customUrl = null) => {
    if (e) e.preventDefault();
    const targetUrl = customUrl || repoUrl;
    if (!targetUrl) return;

    setLoading(true);
    setError(null);
    setAuditData(null);
    setStage(1);
    setLogs([]);
    setIsTerminalOpen(true);

    addLog(`Initiating audit for: ${targetUrl}`, 'info');
    addLog('Cloning repository into temporary container memory...', 'process');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/audit`, { repoUrl: targetUrl });
      
      addLog('Security check complete.', 'info');
      
      const newAudit = {
        url: targetUrl,
        date: new Date().toLocaleDateString(),
        data: response.data.analysis
      };

      setAuditData(response.data.analysis);
      setHistory(prev => [newAudit, ...prev.filter(h => h.url !== targetUrl)].slice(0, 5));
      setStage(3);
      addLog('Process complete. Report generated.', 'success');
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Network error: Backend unreachable.';
      setError(errMsg);
      addLog(`FATAL ERROR: ${errMsg}`, 'error');
      setStage(0);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    if (!auditData) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('DevOps Polyglot Audit Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Repository: ${repoUrl}`, 20, 30);
    doc.text(`Score: ${auditData.score}/10`, 20, 40);
    doc.text('---', 20, 45);
    doc.text('Summary:', 20, 55);
    const splitSummary = doc.splitTextToSize(auditData.summary, 170);
    doc.text(splitSummary, 20, 65);
    doc.save(`Audit-${Date.now()}.pdf`);
  };

  const PipelineStep = ({ icon: Icon, label, active, completed }) => (
    <div className={`flex flex-col items-center gap-3 relative z-10 ${active || completed ? 'text-primary' : 'text-gray-400 dark:text-gray-600'}`}>
      <motion.div 
        animate={active ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`p-4 rounded-2xl border-2 glass ${
          completed ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]' : active ? 'bg-primary/5 border-primary shadow-lg' : 'bg-white/5 dark:bg-black/20 border-gray-200 dark:border-gray-800'
        }`}
      >
        <Icon size={24} />
      </motion.div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-700">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-blob delay-2000"></div>
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-40"></div>
        <div className="absolute inset-0 noise"></div>
      </div>

      {/* History Sidebar */}
      <motion.div 
        animate={{ x: isHistoryOpen ? 0 : -320 }}
        className="fixed top-0 left-0 h-full w-80 bg-white/80 dark:bg-black/80 backdrop-blur-3xl z-[60] border-r border-gray-200 dark:border-white/5 p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black italic tracking-tighter">HISTORY</h2>
          <button onClick={() => setIsTerminalHistoryOpen(false)} className="text-gray-400 hover:text-primary">✕</button>
        </div>
        <div className="space-y-4">
          {history.length === 0 && <p className="text-gray-500 text-sm italic">No audits recorded yet...</p>}
          {history.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl glass dark:bg-white/5 border border-gray-100 dark:border-white/5 group hover:border-primary transition-all">
              <p className="text-[10px] font-black text-primary uppercase mb-1">{item.date}</p>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate mb-3">{item.url}</p>
              <button 
                onClick={() => { runAudit(null, item.url); setIsTerminalHistoryOpen(false); }}
                className="text-[10px] font-black text-gray-400 group-hover:text-primary flex items-center gap-1"
              >
                RE-RUN <ArrowRight size={10} />
              </button>
            </div>
          ))}
          {history.length > 0 && (
            <button onClick={() => setHistory([])} className="w-full py-3 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/5 rounded-xl transition-all">
              Clear History
            </button>
          )}
        </div>
      </motion.div>

      <nav className="relative z-50 flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
        <motion.div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsTerminalHistoryOpen(true)}>
          <div className="bg-primary p-2 rounded-xl shadow-lg">
            <History className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter dark:text-white">HISTORY</span>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/wasifshaffaq/devops-polyglot-auditor" target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-primary transition-colors">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <button onClick={() => setIsDark(!isDark)} className="p-3 rounded-2xl glass shadow-xl">
            {isDark ? <Sun className="text-yellow-400" size={18} /> : <Moon className="text-primary" size={18} />}
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-12 pb-24 text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
           <span className="dark:text-white">Audit Infra</span><br/><span className="text-primary italic">With AI</span>
        </h1>

        <form onSubmit={runAudit} className="mt-12 max-w-3xl mx-auto relative group">
          <div className="relative flex items-center p-2 bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl">
            <Search className="ml-6 text-gray-400" size={24} />
            <input
              type="text" placeholder="Paste GitHub URL..."
              className="flex-1 bg-transparent px-6 py-5 text-lg focus:outline-none dark:text-white font-medium"
              value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)}
            />
            <button type="submit" disabled={loading} className="bg-primary hover:bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase">
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'RUN AUDIT'}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {stage > 0 && (
            <div className="max-w-4xl mx-auto flex justify-between items-center my-24 px-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
              <PipelineStep icon={Activity} label="Fetching" active={stage === 1} completed={stage > 1} />
              <PipelineStep icon={Cpu} label="AI Logic" active={stage === 2} completed={stage > 2} />
              <PipelineStep icon={Shield} label="Security" active={stage === 2} completed={stage > 2} />
              <PipelineStep icon={CheckCircle} label="Success" active={stage === 3} completed={stage === 3} />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {auditData && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 gap-6 text-left">
              
              <div className="col-span-12 lg:col-span-8 p-8 rounded-[2.5rem] glass dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl relative">
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-2xl font-black italic underline decoration-primary decoration-4 underline-offset-8">SUMMARY</h2>
                  <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-black text-[10px] uppercase hover:bg-primary/20 transition-all">
                    <Download size={14} /> EXPORT PDF
                  </button>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{auditData.summary}</p>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4 p-8 rounded-[2.5rem] bg-primary text-white shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-80">Safety Rating</h2>
                <div className="text-9xl font-black tracking-tighter z-10">{auditData.score}</div>
              </div>

              {auditData.infrastructure && (
                <div className="col-span-12 lg:col-span-7 p-8 rounded-[2.5rem] glass dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <h2 className="text-xl font-black mb-8 flex items-center gap-3"><Cpu className="text-primary" /> INFRA PREVIEW</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {auditData.infrastructure.map((res, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                        <p className="text-[9px] text-gray-400 font-black uppercase mb-1 tracking-widest">{res.type}</p>
                        <p className="text-sm font-bold truncate mb-3">{res.name}</p>
                        <div className="text-[9px] font-black px-3 py-1.5 rounded-lg bg-primary/10 text-primary uppercase">{res.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-span-12 lg:col-span-5 p-8 rounded-[2.5rem] bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl relative">
                 <h2 className="text-xl font-black mb-8 italic">NEXT STEPS</h2>
                 <ul className="space-y-6">
                   {auditData.recommendations.map((rec, i) => (
                     <li key={i} className="flex gap-4"><span className="text-primary font-black text-lg">0{i+1}.</span><p className="text-sm font-bold opacity-80 leading-snug">{rec}</p></li>
                   ))}
                 </ul>
              </div>

              <div className="col-span-12 mt-4">
                <h2 className="text-3xl font-black mb-8 px-4 flex items-center gap-4 italic underline decoration-red-500 decoration-8 underline-offset-4">CRITICAL FINDINGS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {auditData.vulnerabilities.map((v, i) => (
                    <div key={i} className="p-6 rounded-[2rem] glass dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-start gap-6 relative overflow-hidden shadow-lg">
                      <div className={`p-4 rounded-2xl ${v.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}><AlertCircle size={32} /></div>
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[8px] font-black uppercase tracking-tighter bg-gray-200 dark:bg-white/10 px-2 py-1 rounded mb-2 inline-block">{v.source}</span>
                        <p className="text-lg font-black leading-tight mb-2 tracking-tight uppercase">{v.issue}</p>
                        <span className="text-xs font-mono opacity-40 truncate block">{v.file}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-500 ${isTerminalOpen ? 'h-[30vh]' : 'h-10'}`}>
        <button onClick={() => setIsTerminalOpen(!isTerminalOpen)} className="w-full h-10 bg-gray-900 dark:bg-gray-800 border-t border-gray-800 dark:border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-2"><Activity size={14} className={loading ? 'animate-pulse text-primary' : 'text-gray-400'} /><span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Execution Terminal</span></div>
          <ArrowRight size={16} className={`text-gray-500 transition-transform duration-300 ${isTerminalOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
        <div className="h-full bg-black/95 backdrop-blur-2xl p-6 overflow-y-auto font-mono text-xs border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] text-left">
          <div className="max-w-6xl mx-auto space-y-2">
            {logs.length === 0 && <p className="text-gray-600 italic">No execution data. Run an audit to begin monitoring...</p>}
            {logs.map((log, i) => (
              <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                <span className={`font-black shrink-0 ${log.type === 'error' ? 'text-red-500' : log.type === 'success' ? 'text-green-500' : log.type === 'process' ? 'text-primary' : log.type === 'warn' ? 'text-yellow-500' : 'text-gray-400'}`}>{log.type.toUpperCase()}:</span>
                <span className="text-gray-300 flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-gray-100 dark:border-white/5 py-12 text-center pb-24">
        <p className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.5em]">Automated Security Intelligence v2.0</p>
      </footer>
    </div>
  );
}

export default App;
