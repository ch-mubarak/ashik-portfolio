"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import TiltCard from "@/components/ui/TiltCard";

export default function Skills() {
  const [seo, ...rest] = skills;

  return (
    <section id="skills" className="py-32 relative overflow-hidden" style={{ background: "rgba(7,7,20,0.5)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        <ScrollReveal>
          <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase">
            02 · Skills
          </span>
        </ScrollReveal>

        <div className="mt-4 mb-12 max-w-xl">
          <div className="heading-lg text-white">
            <TextReveal text="Every tool in the stack. Every lever that drives growth." delay={0.1} />
          </div>
        </div>

        {/* Hero card (SEO) + 2 cards right — row 1 */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">

          {/* SEO — hero card spans 2 cols */}
          <ScrollReveal direction="up" className="md:col-span-2 h-full">
            <TiltCard className="h-full">
            <motion.div
              className="relative rounded-2xl p-8 h-full border overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${seo.glow}, rgba(255,255,255,0.02))`,
                borderColor: `${seo.color}25`,
              }}
              variants={{
                initial: {},
                hover: { borderColor: `${seo.color}50`, transition: { duration: 0.2 } }
              }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${seo.color}15 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: seo.glow, border: `1px solid ${seo.color}30` }}
                  >
                    {seo.icon}
                  </div>
                  <div>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ background: `${seo.color}15`, color: seo.color, border: `1px solid ${seo.color}25` }}
                    >
                      Primary Expertise
                    </span>
                    <h3
                      className="font-display font-bold text-2xl mt-1"
                      style={{ color: seo.color }}
                    >
                      {seo.category}
                    </h3>
                  </div>
                </div>

                <p className="text-white/50 text-sm mb-5 leading-relaxed max-w-md">
                  End-to-end search optimisation — from technical audits and keyword architecture to content strategy and link building. The core of sustainable digital growth.
                </p>

                <div className="flex flex-wrap gap-2">
                  {seo.items.map((item) => (
                    <motion.span
                      key={item}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200"
                      style={{
                        borderColor: `${seo.color}25`,
                        color: "rgba(240,240,255,0.65)",
                        background: `${seo.color}08`,
                      }}
                      whileHover={{ borderColor: `${seo.color}70`, color: seo.color, scale: 1.04 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
            </TiltCard>
          </ScrollReveal>

          {/* Ads — right column */}
          <ScrollReveal direction="up" delay={0.1}>
            <SkillCard skill={rest[0]} />
          </ScrollReveal>
        </div>

        {/* Bottom row — 3 cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {rest.slice(1).map((skill, i) => (
            <ScrollReveal key={skill.category} delay={0.08 * (i + 1)} direction="up">
              <SkillCard skill={skill} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: typeof skills[0] }) {
  return (
    <TiltCard className="h-full">
    <motion.div
      className="relative rounded-2xl p-6 h-full border overflow-hidden"
      variants={{
        initial: {
          background: "rgba(255,255,255,0.03)",
          borderColor: "rgba(255,255,255,0.07)",
        },
        hover: {
          background: skill.glow,
          borderColor: `${skill.color}35`,
          transition: { duration: 0.2 },
        },
      }}
    >
      {/* Shimmer sweep effect */}
      <motion.div
        className="absolute top-0 bottom-0 w-[150%] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${skill.color}15, transparent)`,
          left: "-150%",
          transform: "skewX(-20deg)",
        }}
        variants={{
          initial: { left: "-150%" },
          hover: {
            left: "150%",
            transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.2 }
          }
        }}
      />
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: skill.glow, border: `1px solid ${skill.color}25` }}
        >
          {skill.icon}
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm" style={{ color: skill.color }}>
            {skill.category}
          </h3>
          <p className="text-white/25 text-xs font-mono">{skill.items.length} skills</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skill.items.map((item) => (
          <motion.span
            key={item}
            className="px-2.5 py-1 rounded-full text-xs border"
            style={{
              borderColor: `${skill.color}20`,
              color: "rgba(240,240,255,0.55)",
              background: `${skill.color}06`,
            }}
            whileHover={{ borderColor: `${skill.color}60`, color: skill.color, scale: 1.04 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
    </TiltCard>
  );
}
