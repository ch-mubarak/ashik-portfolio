"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, Zap, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Audit",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.12)",
    desc: "Deep-dive into your current traffic, rankings, ad performance, and content gaps. No assumptions — only data.",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Strategy",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.12)",
    desc: "Build a prioritised roadmap targeting your highest-leverage growth opportunities first. Clear goals, clear timeline.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Execute",
    color: "#FF2D6B",
    glow: "rgba(255,45,107,0.12)",
    desc: "Ship the work — content, campaigns, optimisations — fast and with precision. Every action tied to a KPI.",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Report",
    color: "#10B981",
    glow: "rgba(16,185,129,0.12)",
    desc: "Weekly reports that say what happened, why it happened, and what we're doing next. No vanity metrics.",
  },
];

export default function Process() {
  const ref = useRef(null);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "rgba(7,7,20,0.6)" }}>
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10" ref={ref}>
        <div className="text-center mb-24">
          <ScrollReveal>
            <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase">
              How I Work
            </span>
          </ScrollReveal>
          <div className="mt-4 heading-lg text-white">
            <TextReveal text="Four steps. Every engagement. No exceptions." delay={0.1} />
          </div>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="relative flex flex-col gap-12 pb-32">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="sticky pt-4" 
              style={{ 
                top: `calc(100px + ${i * 40}px)`, 
                zIndex: i 
              }}
            >
              <motion.div 
                className="w-full relative rounded-3xl p-8 md:p-12 border overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                style={{ 
                  background: "#050510", 
                  borderColor: `${step.color}20`, 
                  boxShadow: `0 -20px 60px -20px ${step.glow}`
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Background glow for the card */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen" 
                  style={{ background: `radial-gradient(ellipse at left, ${step.color}15, transparent 60%)` }} 
                />
                
                <div className="flex items-center gap-8 relative z-10">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${step.color}10`, borderColor: `${step.color}30` }}
                  >
                    <step.icon size={32} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-6xl tracking-tighter opacity-20" style={{ color: step.color }}>
                      {step.num}
                    </div>
                    <h3 className="font-display font-semibold text-3xl text-white -mt-2" style={{ color: step.color }}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-md relative z-10">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
