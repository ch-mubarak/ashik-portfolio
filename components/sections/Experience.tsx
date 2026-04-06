"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

export default function Experience() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container max-w-5xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase text-center block mb-4">
            03 · Experience
          </span>
        </ScrollReveal>

        <div className="mb-20 text-center">
          <div className="heading-lg text-white mx-auto">
            <TextReveal text="Where I've built. What I've driven." delay={0.1} />
          </div>
        </div>

        {/* Alternating "Leaves" Timeline Layout */}
        <div className="relative relative-w-full my-8">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
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

          <div className="flex flex-col gap-12 md:gap-24">
            {experience.map((job, index) => {
              // Even indexes on Left, Odd on Right
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center justify-between w-full flex-col md:flex-row ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Timeline Dot (Hidden on mobile) */}
                  <div className="hidden md:absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#050510] z-20 md:flex items-center justify-center transition-all duration-300 shadow-xl"
                       style={{ background: job.color, boxShadow: `0 0 20px ${job.color}90` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white"/>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-5/12" />

                  {/* Content Leaf */}
                  <div className="w-full md:w-5/12 z-10">
                    <ScrollReveal delay={index * 0.15} direction={isLeft ? "right" : "left"}>
                      <motion.div
                        className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
                        style={{
                          boxShadow: `0 20px 40px rgba(0,0,0,0.2)`,
                        }}
                        whileHover={{
                          borderColor: `${job.color}40`,
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }}
                      >
                        {/* Background glow injected on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at ${isLeft ? "100%" : "0%"} 0%, ${job.color}, transparent 60%)`,
                          }}
                        />

                        {/* Leaf Header */}
                        <div className="mb-6 border-b border-white/10 pb-6 relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="text-xs font-mono px-3 py-1.5 rounded-full font-bold"
                              style={{ background: `${job.color}15`, color: job.color, border: `1px solid ${job.color}25` }}
                            >
                              {job.period}
                            </span>
                            <span className="text-xs font-mono text-white/30 flex items-center gap-1.5">
                              <MapPin size={12} />
                              India
                            </span>
                          </div>

                          <h3 className="font-display font-bold text-2xl text-white mb-2">{job.role}</h3>

                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md" style={{ background: `${job.color}15` }}>
                              <Briefcase size={12} style={{ color: job.color }} />
                            </div>
                            <span className="font-medium text-base text-white/80">
                              {job.company}
                            </span>
                          </div>
                        </div>

                        {/* Leaf Bullets */}
                        <ul className="space-y-4 relative z-10">
                          {job.achievements.map((ach, j) => (
                            <li key={j} className="flex gap-4 text-sm text-white/60 leading-relaxed font-light">
                              <span
                                className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                                style={{ background: job.color, boxShadow: `0 0 8px ${job.color}` }}
                              />
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
