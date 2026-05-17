import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Shield, Cpu, Activity, CheckCircle, AlertCircle, Loader2, 
  ArrowRight, Download, History, Trash2, ExternalLink,
  Lock, Terminal, Box, ChevronRight, LayoutGrid, Zap, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { NeuralCanvas } from './components/NeuralCanvas';
import { SpotlightCard } from './components/SpotlightCard';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState(0); 
  const [logs, setLogs] = useState([]);
  const [terminalWidth, setTerminalWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('audit_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('audit_history', JSON.stringify(history));
  }, [history]);

  // Force Dark Mode Permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Horizontal Resizer logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 300 && newWidth < window.innerWidth * 0.6) {
        setTerminalWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const runAudit = async (e, customUrl = null) => {
    if (e) e.preventDefault();
    const targetUrl = (customUrl || repoUrl).trim();
    if (!targetUrl) return;

    setLoading(true);
    setError(null);
    setAuditData(null);
    setStage(1);
    setLogs([]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: targetUrl })
      });

      if (!response.ok) throw new Error('Backend unreachable.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const { type, message, data } = JSON.parse(line.replace('data: ', ''));
              if (type === 'error') {
                setError(message);
                addLog(message, 'error');
                setLoading(false);
                return;
              }
              addLog(message, type);
              if (message.includes('Cloning')) setStage(1);
              if (message.includes('Orchestrating parallel')) setStage(2);
              if (message.includes('Audit complete')) {
                setStage(3);
                setAuditData(data);
                const newAudit = { url: targetUrl, date: new Date().toLocaleDateString(), data: data };
                setHistory(prev => [newAudit, ...prev.filter(h => h.url !== targetUrl)].slice(0, 8));
              }
            } catch (e) {}
          }
        }
      }
    } catch (err) {
      setError(err.message);
      addLog(`FATAL ERROR: ${err.message}`, 'error');
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
    const splitSummary = doc.splitTextToSize(auditData.summary, 170);
    doc.text(splitSummary, 20, 60);
    doc.save(`Audit-${Date.now()}.pdf`);
  };

  const PipelineStatus = ({ label, active }) => (
    <div className={`flex items-center gap-3 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-20'}`}>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#00A3FF] shadow-[0_0_10px_#00A3FF]' : 'bg-white/20'}`}></div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="h-screen flex bg-[#020202] text-[#F8F9FA] font-sans selection:bg-[#00A3FF]/30 overflow-hidden relative dark">
      <NeuralCanvas />

      {/* --- COLUMN 1: THE VAULT (Left Sidebar) --- */}
      <aside className="w-[300px] h-full glass border-r border-white/5 flex flex-col z-50 transition-colors duration-500 bg-black/60">
        <div className="p-8 pb-4 text-white">
           <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 bg-[#00A3FF] flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(0,163,255,0.4)]">
               <History size={20} className="text-black" />
             </div>
             <span className="text-lg font-bold tracking-tighter uppercase text-gradient text-white">Audit Vault</span>
           </div>
           
           <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 text-white">Previous Scans</span>
              <button onClick={() => setHistory([])} className="text-white/20 hover:text-red-500 transition-colors cursor-pointer">
                <Trash2 size={14} />
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-4 custom-scrollbar text-white">
          {history.length === 0 && (
            <div className="p-6 border border-white/5 rounded-soft text-center opacity-20">
              <Zap size={32} className="mx-auto mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-widest leading-loose">Neural Storage Empty</p>
            </div>
          )}
          {history.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-5 rounded-soft border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] transition-all group cursor-pointer"
              onClick={() => { runAudit(null, item.url); }}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] font-bold text-[#00A3FF] uppercase">{item.date}</p>
                <ChevronRight size={14} className="text-white/20 group-hover:text-[#00A3FF] transition-colors" />
              </div>
              <p className="text-[11px] font-medium truncate text-white/50 group-hover:text-white transition-colors">{item.url}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-10 border-t border-white/5 bg-black/80">
           <div className="flex items-center gap-4 text-white/40 mb-2">
              <Activity size={16} className="animate-pulse text-[#00A3FF]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Engine Active</span>
           </div>
           <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-20 text-white">System v2.5 Flash</p>
        </div>
      </aside>

      {/* --- COLUMN 2: COMMAND CENTER (Middle Workspace) --- */}
      <main className="flex-1 h-full flex flex-col z-10 relative overflow-hidden bg-[#020202]">
        {/* Top Header */}
        <header className="h-[80px] border-b border-white/5 px-10 flex items-center justify-between shrink-0 bg-black/40 backdrop-blur-md">
           <div className="flex items-center gap-10 text-white">
             <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">System</span>
               <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
             </div>
             <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Orchestrator</span>
               <span className="text-[10px] font-bold uppercase text-[#00A3FF]">v2.5 Flash</span>
             </div>
           </div>

           <div className="flex items-center gap-8">
             <a 
               href="http://localhost:3000" 
               className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
             >
                <Home size={16} className="text-white/40 group-hover:text-[#00A3FF] transition-colors" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white">Exit</span>
             </a>
             
             <a href="https://github.com/wasifshaffaq/devops-polyglot-auditor" target="_blank" className="text-white/20 hover:text-white transition-colors">
               <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
               </svg>
             </a>
           </div>
        </header>

        {/* Dynamic Workspace Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 text-white">
          {!auditData && !loading && (
            <div className="h-full flex flex-col items-center justify-center">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mb-12 text-center"
               >
                 <h1 className="text-8xl font-bold tracking-tighter uppercase text-gradient mb-4 leading-none text-white text-gradient">Command Center</h1>
                 <p className="text-white/20 text-lg tracking-[0.5em] uppercase font-bold">Neural Security Orchestrator</p>
               </motion.div>

               <form onSubmit={runAudit} className="w-full max-w-3xl">
                  <div className="relative flex items-center p-2 glass rounded-full focus-within:shadow-[0_0_60px_rgba(0,163,255,0.15)] transition-all duration-700 border border-white/10">
                    <Search className="ml-8 text-white/20" size={24} />
                    <input
                      type="text" placeholder="PASTE REPOSITORY URL..."
                      className="flex-1 bg-transparent px-6 py-6 text-xl focus:outline-none font-bold placeholder:text-white/10 text-white tracking-widest uppercase"
                      value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)}
                    />
                    <button type="submit" className="btn-ultra mr-1 h-[64px] px-10 text-sm">RUN ENGINE</button>
                  </div>
               </form>
            </div>
          )}

          {loading && !auditData && (
            <div className="h-full flex flex-col items-center justify-center space-y-12">
               <div className="relative">
                  <Loader2 className="animate-spin text-[#00A3FF]" size={80} />
                  <Activity size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-40 animate-pulse" />
               </div>
               <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold tracking-[0.4em] uppercase text-gradient animate-pulse">Orchestrating Audit</h3>
                  <div className="flex justify-center gap-12 px-16">
                    <PipelineStatus label="Cloning" active={stage >= 1} />
                    <PipelineStatus label="Scanning" active={stage >= 2} />
                    <PipelineStatus label="Reasoning" active={stage >= 3} />
                  </div>
               </div>
            </div>
          )}

          {auditData && (
            <div className="grid grid-cols-12 gap-8 pb-40 text-white">
               {/* 1. SCORE CARD (Grid 1-4) */}
               <SpotlightCard containerClassName="col-span-12 lg:col-span-4 aspect-square flex flex-col items-center justify-center relative overflow-hidden bg-[#080808]">
                  <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent)]"></div>
                  <div className="relative z-10 text-center">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-8">Security Posture</h2>
                    <div className="text-[160px] font-black tracking-tighter leading-none text-gradient drop-shadow-[0_0_50px_rgba(0,163,255,0.2)]">
                      {auditData.score}
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#00A3FF] mt-4">Verified Intelligence</div>
                  </div>
                  <div className="absolute left-0 w-full h-[2px] bg-[#00A3FF]/20 shadow-[0_0_15px_#00A3FF] animate-scan top-0 pointer-events-none opacity-40"></div>
               </SpotlightCard>

               {/* 2. SUMMARY (Grid 5-12) */}
               <SpotlightCard containerClassName="col-span-12 lg:col-span-8 p-12 bg-[#080808] flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-10 text-white">
                     <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter uppercase underline underline-offset-[16px] decoration-[#00A3FF] decoration-4">Executive Summary</h2>
                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Architectural Analysis</p>
                     </div>
                     <button onClick={exportPDF} className="btn-ultra-outline h-[40px] px-6 text-[10px]">
                        <Download size={14} className="mr-2" /> Export PDF
                     </button>
                  </div>
                  <p className="text-xl text-white/80 leading-relaxed font-medium">
                    {auditData.summary}
                  </p>
               </SpotlightCard>

               {/* 3. INFRA PULSE (Grid 1-12) */}
               <div className="col-span-12 mt-10">
                  <div className="flex items-center gap-6 mb-8 text-white">
                     <LayoutGrid size={24} className="text-[#00A3FF]" />
                     <h2 className="text-lg font-bold tracking-widest uppercase">Infrastructure Pulse</h2>
                     <div className="h-[1px] flex-1 bg-white/5"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {auditData.infrastructure?.map((res, i) => (
                      <div key={i} className="p-6 rounded-soft border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                        <div className="flex justify-between items-start mb-8 text-white">
                           <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{res.type}</span>
                           <div className={`h-2 w-2 rounded-full ${res.status.toLowerCase().includes('risk') ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}></div>
                        </div>
                        <p className="text-sm font-bold truncate mb-3 text-white uppercase">{res.name}</p>
                        <span className="text-[9px] font-bold uppercase tracking-tighter text-[#00A3FF] opacity-80">{res.status}</span>
                      </div>
                    ))}
                  </div>
               </div>

               {/* 4. FINDINGS & NEXT STEPS */}
               <div className="col-span-12 lg:col-span-7 mt-10">
                  <div className="flex items-center gap-6 mb-8 text-red-500">
                     <AlertCircle size={24} />
                     <h2 className="text-lg font-bold tracking-widest uppercase">Threat Vectors</h2>
                     <div className="h-[1px] flex-1 bg-red-500/10"></div>
                  </div>
                  <div className="space-y-6">
                    {auditData.vulnerabilities.map((v, i) => (
                      <SpotlightCard key={i} containerClassName={`border-l-4 ${v.severity === 'high' ? 'border-l-red-500' : 'border-l-amber-500'} p-8 bg-[#080808]`}>
                         <div className="flex justify-between items-start gap-8">
                            <div className="flex-1 overflow-hidden">
                               <div className="flex items-center gap-4 mb-4 text-white">
                                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full opacity-40">{v.source}</span>
                                  <span className={`text-[9px] font-bold uppercase tracking-widest ${v.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`}>{v.severity} Priority</span>
                               </div>
                               <h3 className="text-xl font-bold uppercase tracking-tight mb-3 leading-tight text-white">{v.issue}</h3>
                               <p className="text-xs font-mono text-white/40 truncate select-all">{v.file}</p>
                            </div>
                            <div className={`p-4 rounded-xl ${v.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                               <Shield size={24} />
                            </div>
                         </div>
                      </SpotlightCard>
                    ))}
                  </div>
               </div>

               <div className="col-span-12 lg:col-span-5 mt-10">
                  <div className="flex items-center gap-4 mb-8 text-white">
                     <CheckCircle size={24} className="text-[#00A3FF]" />
                     <h2 className="text-lg font-bold tracking-widest uppercase text-white">The Battle Plan</h2>
                     <div className="h-[1px] flex-1 bg-[#00A3FF]/10"></div>
                  </div>
                  <div className="glass p-10 rounded-soft space-y-10 border border-white/5 text-white bg-black/40">
                    {auditData.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-6 items-start group">
                         <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-bold text-sm text-[#00A3FF] group-hover:bg-[#00A3FF]/10 transition-colors shrink-0">0{i+1}</div>
                         <p className="flex-1 text-sm font-medium text-white/60 leading-relaxed group-hover:text-white transition-colors break-words overflow-hidden text-white">{rec}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Global Technical Branding */}
        <div className="h-[40px] px-10 border-t border-white/5 flex items-center justify-between bg-black/80 shrink-0 z-50">
           <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-white/20">Secured Architecture v2.5</p>
           <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-white/10">
              <span>Security Hub</span>
              <span>Online</span>
           </div>
        </div>
      </main>

      {/* --- COLUMN 3: LIVE TERMINAL (Right Sidebar) --- */}
      <aside 
        style={{ width: `${terminalWidth}px` }}
        className="h-full bg-[#050505] border-l border-white/5 flex flex-col z-50 transition-all duration-500 relative group"
      >
        {/* Horizontal Resize Handle */}
        <div 
          onMouseDown={() => setIsResizing(true)}
          className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-[#00A3FF] transition-colors z-[60]"
        />

        <div className="h-[60px] border-b border-white/5 flex items-center justify-between px-8 shrink-0 text-white">
          <div className="flex items-center gap-3">
             <Terminal size={14} className={loading ? 'animate-pulse text-[#00A3FF]' : 'text-white/20'} />
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Execution Terminal</span>
          </div>
          <div className="flex items-center gap-3 opacity-20">
             <div className="w-2 h-2 rounded-full bg-red-500"></div>
             <div className="w-2 h-2 rounded-full bg-amber-500"></div>
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 font-mono text-[11px] custom-scrollbar selection:bg-[#00A3FF]/50 selection:text-black">
          <div className="space-y-4 pb-20 text-white">
            {logs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-6 py-20 text-white">
                <div className="relative">
                  <Activity size={48} className="text-[#00A3FF] animate-pulse" />
                  <div className="absolute inset-0 bg-[#00A3FF]/20 blur-xl rounded-full" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white text-center">Listening for signals...</p>
              </div>
            )}
            {logs.map((log, i) => (
              <div key={i} className="flex gap-8 animate-in fade-in slide-in-from-right-4 duration-500 text-white">
                <span className="text-white/20 shrink-0 font-bold mt-1">[{log.timestamp}]</span>
                <div className="flex-1 space-y-1">
                  <span className={`font-black uppercase tracking-widest text-[9px] ${log.type === 'error' ? 'text-red-500' : log.type === 'success' ? 'text-[#00A3FF]' : log.type === 'process' ? 'text-[#00A3FF]/40' : log.type === 'warn' ? 'text-yellow-500' : 'text-white/20'}`}>
                    {log.type}
                  </span>
                  <p className={`leading-relaxed text-sm ${log.type === 'error' ? 'text-red-400' : 'text-white/70'}`}>
                    {log.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
