"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

// TODO: Replace with real testimonials from clients/managers
const testimonials = [
  {
    quote:
      "Ashik completely transformed our organic traffic within 5 months. The keyword strategy was surgical — not just broad terms but high-intent phrases that actually converted. Our leads from search doubled.",
    name: "Priya Menon",
    role: "Founder, [Client Company]",
    initials: "PM",
    color: "#00D4FF",
  },
  {
    quote:
      "Our Meta Ads ROAS went from 1.4x to 4.1x in two months. He didn't just run ads — he rebuilt the entire funnel, from creative to landing page. The difference was night and day.",
    name: "Rahul Sharma",
    role: "Marketing Head, [Brand Name]",
    initials: "RS",
    color: "#7C3AED",
  },
  {
    quote:
      "What impressed me most was the reporting. Every week I knew exactly what was working and what wasn't. No fluff, just clear data with a clear action plan. That's rare to find.",
    name: "Anita Krishnan",
    role: "Director, [Agency Name]",
    initials: "AK",
    color: "#10B981",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase">
              Social Proof
            </span>
          </ScrollReveal>
          <div className="mt-4 heading-lg text-white">
            <TextReveal text="What clients say after working with me." delay={0.1} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={0.1 * i} direction="up">
              <motion.div
                className="relative rounded-2xl p-6 h-full flex flex-col gap-5 border"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  borderColor: `${t.color}30`,
                  background: `${t.color}06`,
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Quote icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.color}25` }}
                >
                  <Quote size={14} style={{ color: t.color }} />
                </div>

                {/* Quote text */}
                <p className="text-white/65 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
                    style={{ background: `${t.color}20`, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold">{t.name}</p>
                    <p className="text-white/35 text-xs font-mono">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
