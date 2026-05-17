"use client";

import { Navbar } from "@/components/Navbar";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { SpotlightCard } from "@/components/SpotlightCard";
import { WordReveal } from "@/components/WordReveal";
import { 
  Shield, Cpu, Activity, Zap, Lock, Terminal, Box, 
  ArrowRight, Globe, Code2, Server 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white bg-background overflow-x-hidden dark text-white font-sans">
      <Navbar />
      <NeuralCanvas />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-10 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-12"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/50">System v2.5 Flash Online</span>
          </motion.div>

          <div className="max-w-7xl">
            <WordReveal 
              text="Architectural Intelligence for Modern DevOps" 
              className="text-[64px] md:text-[120px] font-bold tracking-tighter mb-10 text-gradient leading-[0.9]"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-2xl md:text-[28px] text-white/40 max-w-4xl mx-auto mb-20 leading-relaxed font-medium"
            >
              The first security orchestrator designed to merge heuristic AI reasoning with deterministic container analysis. Built for engineers who build for the cloud.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Link href="http://localhost:5173/" className="btn-ultra-primary min-w-[240px] h-[72px] text-xl group font-bold tracking-widest">
                START AUDIT <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
              </Link>
              <Link href="#features" className="btn-ultra-outline min-w-[240px] h-[72px] text-xl font-bold tracking-widest">
                EXPLORE STACK
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent animate-bounce opacity-40" />
          </motion.div>
        </section>

        {/* Bento Grid */}
        <section id="features" className="py-macro px-10 max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-32"
          >
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">Core Intelligence</h2>
            <p className="text-white/30 max-w-2xl text-2xl leading-relaxed">Multi-layered security signals processed in parallel by neural engines.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* AI - Large */}
            <SpotlightCard containerClassName="md:col-span-8 group overflow-hidden p-14">
               <div className="flex flex-col h-full justify-between gap-16">
                 <div className="flex justify-between items-start">
                   <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
                     <Cpu size={40} />
                   </div>
                   <div className="px-6 py-2 rounded-full border border-primary/20 text-[12px] font-bold uppercase tracking-widest text-primary bg-primary/5">Advanced Heuristics</div>
                 </div>
                 <div>
                    <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter">Gemini 2.5 Flash<br/>Orchestration</h3>
                    <p className="text-white/40 text-2xl leading-relaxed max-w-2xl font-medium">
                      Beyond simple regex. Our engine understands the relationships between your Terraform modules, Kubernetes manifests, and Dockerfiles to spot cascading security failures.
                    </p>
                 </div>
               </div>
            </SpotlightCard>

            {/* SSE HUD - Tall */}
            <SpotlightCard containerClassName="md:col-span-4 bg-white/[0.01] p-14">
              <div className="flex flex-col h-full justify-between gap-24">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/30">
                  <Activity size={32} />
                </div>
                <div>
                   <h3 className="text-2xl font-black uppercase tracking-[0.3em] mb-6">Live HUD</h3>
                   <p className="text-white/30 text-xl leading-relaxed font-medium">
                     Zero latency progress tracking via SSE. Watch your infrastructure being audited in real-time with granular execution logs.
                   </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Trivy - Medium */}
            <SpotlightCard containerClassName="md:col-span-6 border-primary/20 p-14">
               <div className="flex flex-col h-full justify-between gap-16">
                 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                   <Shield size={32} />
                 </div>
                 <div>
                    <h3 className="text-4xl font-bold mb-6 tracking-tight uppercase">Deterministic CVE Detection</h3>
                    <p className="text-white/40 text-xl leading-relaxed font-medium">
                      Deep container scanning via integrated Trivy engine. Catch vulnerabilities in base images and dependency trees before they hit production.
                    </p>
                 </div>
               </div>
            </SpotlightCard>

            {/* Local-First - Medium */}
            <SpotlightCard containerClassName="md:col-span-6 bg-primary/[0.03] p-14">
               <div className="flex flex-col h-full justify-between gap-16">
                 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                   <Zap size={32} />
                 </div>
                 <div>
                    <h3 className="text-4xl font-bold mb-6 tracking-tight uppercase">Local-First Engine</h3>
                    <p className="text-white/40 text-xl leading-relaxed font-medium">
                      Bypassing the GitHub REST API limits. By analyzing local clones, we provide unlimited audit capacity at 4x the speed of cloud-only scanners.
                    </p>
                 </div>
               </div>
            </SpotlightCard>
          </div>
        </section>

        {/* Pipeline Flow */}
        <section id="orchestration" className="py-macro relative">
           <div className="max-w-[1400px] mx-auto px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                 <motion.div
                   initial={{ opacity: 0, x: -40 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1 }}
                 >
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-[12px] mb-8 block">The Workflow</span>
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 leading-[0.85]">Synchronized<br/>Pipeline</h2>
                    <p className="text-white/30 text-2xl leading-relaxed mb-16 font-medium">
                      A three-stage technical orchestration that turns raw code into actionable security intelligence.
                    </p>
                    
                    <div className="space-y-6">
                      {[
                        { icon: Terminal, label: "Volatile RAM Cloning", desc: "Shallow clone into local RAM for maximum privacy and execution speed." },
                        { icon: Box, label: "Technical Extraction", desc: "Simultaneous scanning of Terraform, Kubernetes, and Node configurations." },
                        { icon: Lock, label: "Neural Post-Mortem", desc: "Final heuristic reasoning and security scoring via Gemini 2.5." }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-10 p-8 rounded-[2rem] border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                           <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                             <item.icon size={28} />
                           </div>
                           <div>
                              <h4 className="font-bold text-2xl mb-2 tracking-tight">{item.label}</h4>
                              <p className="text-white/30 text-lg leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                 </motion.div>

                 <div className="relative group">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="aspect-square glass rounded-[4rem] p-1 flex items-center justify-center relative z-10"
                    >
                       <div className="w-full h-full rounded-[3.8rem] bg-background flex flex-col items-center justify-center gap-14 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10" />
                          <Activity size={120} className="text-primary animate-pulse" />
                          <div className="text-center">
                             <div className="text-[12px] font-bold uppercase tracking-[0.5em] text-white/20 mb-4">Neural Pulse</div>
                             <div className="text-4xl font-mono text-primary tracking-tighter uppercase font-bold">Audit v2.5 Online</div>
                          </div>
                       </div>
                    </motion.div>
                    <div className="absolute -inset-20 bg-primary/20 blur-[160px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
                 </div>
              </div>
           </div>
        </section>

        {/* Stack Grid */}
        <section id="stack" className="py-macro border-t border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-10">
             <div className="text-center mb-32">
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">The Modern Stack</h2>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { icon: Globe, label: "Next.js 15", sub: "Architecture" },
                  { icon: Code2, label: "Gemini 2.5", sub: "Neural Layer" },
                  { icon: Box, label: "Trivy Engine", sub: "Container Security" },
                  { icon: Server, label: "SSE Logic", sub: "Real-time Stream" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -15 }}
                    className="p-10 rounded-[3rem] glass text-center flex flex-col items-center group transition-all duration-500"
                  >
                     <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-white/20 mb-8 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <item.icon size={48} />
                     </div>
                     <h4 className="font-bold text-2xl mb-3 tracking-tight">{item.label}</h4>
                     <p className="text-white/20 text-[11px] uppercase tracking-[0.3em] font-bold">{item.sub}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>
      </main>

      <footer className="py-32 border-t border-white/[0.05] relative z-10 bg-black/20">
        <div className="max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-4xl font-bold tracking-tighter uppercase text-gradient leading-none">Polyglot Auditor</h3>
            <p className="text-white/20 text-[12px] tracking-[0.5em] uppercase font-bold">Automated Security Intelligence</p>
          </div>
          
          <div className="flex gap-20">
             <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/10 mb-6">Engineered by</p>
                <Link href="https://github.com/wasifshaffaq" target="_blank" className="text-xl font-bold hover:text-primary transition-colors tracking-tight block">Wasif Shaffaq</Link>
             </div>
             <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/10 mb-6">Technical Repo</p>
                <Link href="https://github.com/wasifshaffaq/devops-polyglot-auditor" target="_blank" className="text-xl font-bold hover:text-primary transition-colors tracking-tight block uppercase">Open Source</Link>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
