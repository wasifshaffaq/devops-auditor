"use client";

import Link from "next/link";
import { History } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const Navbar = () => {
  useEffect(() => {
    // Force Obsidian theme globally
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] h-[72px] w-[95%] max-w-5xl flex items-center justify-between px-8 glass rounded-full"
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,163,255,0.4)]">
          <History className="text-black" size={18} />
        </div>
        <span className="text-lg font-bold tracking-tight uppercase text-white">Polyglot</span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        <Link href="#features" className="text-[13px] font-semibold uppercase tracking-widest hover:text-primary transition-colors text-white/60">Features</Link>
        <Link href="#orchestration" className="text-[13px] font-semibold uppercase tracking-widest hover:text-primary transition-colors text-white/60">Process</Link>
        <Link href="#stack" className="text-[13px] font-semibold uppercase tracking-widest hover:text-primary transition-colors text-white/60">Stack</Link>
      </div>

      <div className="flex items-center gap-6">
        <a href="https://github.com/wasifshaffaq/devops-polyglot-auditor" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </div>
    </motion.nav>
  );
};
