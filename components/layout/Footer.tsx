"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display font-bold text-lg">
          <span className="text-gradient-cyan">AK</span>
          <span className="text-white/30 ml-1 font-mono text-sm">.</span>
        </div>

        <p className="text-white/30 text-sm font-mono">
          © {new Date().getFullYear()} {personalInfo.name} · Built with Next.js
        </p>

        <div className="flex items-center gap-4">
          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-cyan-neon text-sm transition-colors"
            whileHover={{ y: -2 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={personalInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-cyan-neon text-sm transition-colors"
            whileHover={{ y: -2 }}
          >
            Instagram
          </motion.a>
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="text-white/40 hover:text-cyan-neon text-sm transition-colors"
            whileHover={{ y: -2 }}
          >
            Email
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
