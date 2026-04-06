"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling while loading

    const duration = 2500; // 2.5 seconds loading
    const interval = 30; // update frequency
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setComplete(true);
            document.body.style.overflow = ""; // Restore scrolling
          }, 400); // Small hang time at 100%
          return 100;
        }
        // Add random jitter to loading for realism
        return Math.min(prev + step * (Math.random() * 2), 100);
      });
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#05050A] flex flex-col items-center justify-center pointer-events-none"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} 
        >
          {/* Subtle noise in background to match global style */}
          <div className="absolute inset-0 opacity-20 pointer-events-none animate-[noiseJitter_1s_infinite]"
            style={{ backgroundImage: "url('/noise.png')" }} />

          <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-sm px-8">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg text-white shadow-[0_0_24px_rgba(0,212,255,0.3)]"
              style={{ background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)" }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            >
              AK
            </motion.div>

            <div className="w-full flex items-center justify-between font-mono text-sm tracking-widest text-white/50">
              <span className="uppercase text-[10px]">Loading Experience</span>
              <span className="text-white">{Math.floor(progress)}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-px bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-neon to-violet-neon"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
