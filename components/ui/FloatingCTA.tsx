"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Linkedin, MessageSquare } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-8 right-6 z-40 flex items-center p-1 rounded-full text-sm text-white backdrop-blur-xl overflow-hidden shadow-[0_8px_32px_rgba(124,58,237,0.35)]"
          style={{ background: "rgba(10,10,25,0.7)", border: "1px solid rgba(124,58,237,0.4)" }}
          layout
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
                animate={{ width: "auto", opacity: 1, paddingLeft: 8, paddingRight: 8 }}
                exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <a href="#contact" className="p-2 bg-white/5 hover:bg-white/15 rounded-full transition-colors" title="Contact Form"><MessageSquare size={16} /></a>
                <a href="mailto:hello@example.com" className="p-2 bg-white/5 hover:bg-white/15 rounded-full transition-colors" title="Email"><Mail size={16} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/15 rounded-full transition-colors" title="LinkedIn"><Linkedin size={16} /></a>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold relative shrink-0"
            style={{ background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)" }}
          >
            <Sparkles size={14} />
            <motion.span layout="position">Hire Me</motion.span>
            {!hovered && (
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
                style={{ background: "linear-gradient(135deg, #00D4FF, #7C3AED)" }}
              />
            )}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
