"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const statItems = [
  { value: 2, suffix: "+", label: "Years Experience", color: "#00D4FF" },
  { value: 5, suffix: "+", label: "Clients Managed", color: "#7C3AED" },
  { value: 40, suffix: "%", label: "Avg. Traffic Growth", color: "#10B981" },
  { value: 3.2, suffix: "x", label: "Average ROAS", decimals: 1, color: "#F59E0B" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(30%, -50%)",
        }}
      />

      <div className="section-container" ref={ref}>
        <ScrollReveal>
          <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase">
            01 · About
          </span>
        </ScrollReveal>

        <div className="mt-6 grid md:grid-cols-2 gap-14 items-center">

          {/* Left — Avatar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col items-center"
          >
            {/* Avatar */}
            <div className="relative mb-8">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full blur-2xl scale-110 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))" }}
              />
              <div
                className="relative w-52 h-52 rounded-full flex items-center justify-center border"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.15) 100%)",
                  borderColor: "rgba(0,212,255,0.2)",
                  boxShadow: "0 0 40px rgba(0,212,255,0.1), inset 0 0 40px rgba(124,58,237,0.05)",
                }}
              >
                <span
                  className="font-display font-bold text-7xl"
                  style={{
                    background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  AK
                </span>
              </div>

              {/* Floating badge — availability */}
              <motion.div
                className="absolute -top-2 -right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border"
                style={{ background: "rgba(0,212,255,0.08)", borderColor: "rgba(0,212,255,0.25)", color: "#00D4FF" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
                Open to work
              </motion.div>

              {/* Floating badge — location */}
              <motion.div
                className="absolute -bottom-2 -left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border"
                style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.25)", color: "#7C3AED" }}
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                📍 India
              </motion.div>
            </div>

            {/* Name + role */}
            <h3 className="font-display font-bold text-xl text-white mb-1">{personalInfo.name}</h3>
            <p className="text-white/40 text-sm font-mono mb-6">{personalInfo.role}</p>

            {/* Stats 2x2 */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {statItems.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  className="rounded-xl p-4 text-center border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: `${stat.color}18` }}
                >
                  <div className="font-display font-bold text-xl" style={{ color: stat.color }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} duration={1800} />
                  </div>
                  <div className="text-white/35 text-xs mt-0.5 font-mono leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Story */}
          <div>
            <div className="heading-lg text-white mb-8">
              <TextReveal text="Marketing is a craft. I treat it like one." delay={0.1} />
            </div>

            <div className="space-y-5">
              {personalInfo.about.map((para, i) => (
                <ScrollReveal key={i} delay={0.12 * i}>
                  <p className="text-white/58 leading-relaxed text-base">{para}</p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Data-Driven", "ROI-Focused", "Full-Funnel", "Strategic", "Creative"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-mono border"
                    style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.09)", color: "rgba(240,240,255,0.55)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
