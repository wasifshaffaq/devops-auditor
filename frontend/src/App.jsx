import React, { useState } from 'react';
import axios from 'axios';
import { Search, Shield, Cpu, Activity, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState(0); // 0: Idle, 1: Fetching, 2: Auditing, 3: Completed

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
    <div className={`flex flex-col items-center gap-2 ${active || completed ? 'text-primary' : 'text-gray-600'}`}>
      <div className={`p-3 rounded-full border-2 ${completed ? 'bg-primary/20 border-primary' : active ? 'border-primary animate-pulse' : 'border-gray-800'}`}>
        <Icon size={24} />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
      <header className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-4 leading-normal">
          DevOps Polyglot Auditor
        </h1>
        <p className="text-gray-400 text-lg">
          AI-Powered Infrastructure Security & Best Practice Analysis
        </p>
      </header>

      <main className="max-w-4xl w-full">
        <form onSubmit={runAudit} className="relative group mb-12">
          <input
            type="text"
            placeholder="Paste public GitHub repository URL (e.g. https://github.com/owner/repo)"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 pl-14 text-lg focus:outline-none focus:border-primary transition-all"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Audit'}
          </button>
        </form>

        {stage > 0 && (
          <div className="flex justify-between items-center mb-12 px-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 -translate-y-1/2 z-0"></div>
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
            className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-500 mb-8"
          >
            <AlertCircle size={20} />
            <p>{error}</p>
          </motion.div>
        )}

        <AnimatePresence>
          {auditData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-2 space-y-6">
                {auditData.infrastructure && (
                  <section className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                      <Cpu size={20} /> Infrastructure Preview (AWS Simulation)
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {auditData.infrastructure.map((resource, i) => (
                        <div key={i} className="bg-black/40 p-3 rounded-xl border border-gray-800 flex flex-col justify-between">
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold">{resource.type}</p>
                            <p className="text-sm font-medium text-gray-200 truncate mb-2">{resource.name}</p>
                          </div>
                          <p className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                            resource.status.toLowerCase().includes('risk') || resource.status.toLowerCase().includes('missing')
                              ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                              : resource.status.toLowerCase().includes('optimized') || resource.status.toLowerCase().includes('ready')
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          }`}>
                            {resource.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Shield className="text-primary" /> Senior Engineer Summary
                    </h2>
                    {auditData.mode === 'Cloud-Limited' && (
                      <span className="bg-yellow-500/10 text-yellow-500 text-[10px] px-2 py-1 rounded border border-yellow-500/20 font-bold uppercase">
                        Cloud Mode (AI Analysis)
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 leading-relaxed break-words">{auditData.summary}</p>
                </section>

                <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                  <h2 className="text-xl font-bold mb-4">Detected Vulnerabilities</h2>
                  <div className="space-y-4">
                    {auditData.vulnerabilities.map((v, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border-l-4 border-red-500">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded uppercase tracking-wider">
                              {v.source || 'AI Auditor'}
                            </span>
                            <span className="font-mono text-xs text-gray-400 truncate max-w-[200px]">{v.file}</span>
                          </div>
                          <p className="text-gray-200 text-sm leading-snug">{v.issue}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          v.severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {v.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl text-center">
                  <h2 className="text-sm font-bold text-gray-400 uppercase mb-2">Overall Score</h2>
                  <div className="text-6xl font-black text-primary">{auditData.score}<span className="text-2xl text-gray-600">/10</span></div>
                </section>

                <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl overflow-hidden">
                  <h2 className="text-lg font-bold mb-4">Key Recommendations</h2>
                  <ul className="space-y-3">
                    {auditData.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300 break-words overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
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
