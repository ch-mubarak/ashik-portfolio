"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Briefcase, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container" ref={ref}>
        <ScrollReveal>
          <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase">
            03 · Experience
          </span>
        </ScrollReveal>

        <div className="mt-4 mb-14 max-w-xl">
          <div className="heading-lg text-white">
            <TextReveal text="Where I've built. What I've driven." delay={0.1} />
          </div>
        </div>

        {/* Single-column timeline */}
        <div className="relative max-w-2xl">
          {/* Vertical rail */}
          {/* Vertical rail base */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10 rounded-full">
            {/* Scroll-linked progress line */}
            <motion.div
              className="absolute top-0 w-[2px] -left-[0.5px] rounded-full"
              style={{ 
                scaleY: scrollYProgress, 
                bottom: 0,
                transformOrigin: "top", 
                background: "linear-gradient(180deg, #00D4FF, #7C3AED, #FF2D6B)",
                boxShadow: "0 0 16px rgba(124,58,237,0.4)"
              }}
            />
            {/* Glowing bead tracking scroll */}
            <motion.div
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                top: glowY,
                left: -3.5,
                background: "#fff",
                boxShadow: "0 0 12px 3px rgba(0,212,255,0.8)"
               }}
            />
          </div>

          <div className="space-y-6">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-[13px] top-6 -translate-x-1/2 z-10">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-[#050510]"
                    style={{ background: job.color, boxShadow: `0 0 14px ${job.color}80` }}
                  />
                </div>

                <motion.div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: `${job.color}18`, background: "rgba(255,255,255,0.025)" }}
                  whileHover={{ borderColor: `${job.color}35`, background: "rgba(255,255,255,0.04)", transition: { duration: 0.2 } }}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      {/* Period + type */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-xs font-mono px-2.5 py-1 rounded-full"
                          style={{ background: `${job.color}15`, color: job.color, border: `1px solid ${job.color}25` }}
                        >
                          {job.period}
                        </span>
                        <span className="text-xs font-mono text-white/30 flex items-center gap-1">
                          <MapPin size={10} />
                          India
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-lg text-white">{job.role}</h3>

                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-1.5 rounded-md" style={{ background: `${job.color}15` }}>
                          <Briefcase size={11} style={{ color: job.color }} />
                        </div>
                        <span className="font-medium text-sm" style={{ color: job.color }}>
                          {job.company}
                        </span>
                        <span className="text-white/25 text-xs font-mono">· {job.type}</span>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/30 mt-1 shrink-0"
                    >
                      <ChevronDown size={17} />
                    </motion.div>
                  </button>

                  {/* Achievements */}
                  <AnimatePresence initial={false}>
                    {expanded === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: `${job.color}12` }}>
                          <ul className="space-y-3 mt-2">
                            {job.achievements.map((ach, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.04 }}
                                className="flex gap-3 text-sm text-white/58 leading-relaxed"
                              >
                                <span
                                  className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                                  style={{ background: job.color }}
                                />
                                {ach}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
