"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, PenTool, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";

const services = [
  {
    icon: Search,
    title: "SEO Strategy",
    description:
      "From zero-traffic audits to sustained Page 1 rankings. Keyword architecture, technical fixes, content planning — the full stack.",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.12)",
    tags: ["Keyword Research", "Technical SEO", "Audits"],
  },
  {
    icon: TrendingUp,
    title: "Performance Ads",
    description:
      "Meta and Google campaigns built to convert, not just impress. Every rupee tracked, every audience tested, every result owned.",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.12)",
    tags: ["Meta Ads", "Google Ads", "ROAS Optimization"],
  },
  {
    icon: PenTool,
    title: "Content & Brand",
    description:
      "Content that ranks and copy that converts. Strategy-first — no filler posts, no vanity metrics, just content that moves people.",
    color: "#FF2D6B",
    glow: "rgba(255,45,107,0.12)",
    tags: ["Content Strategy", "Social Media", "Copywriting"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Growth",
    description:
      "GA4 setup, dashboard building, and weekly reporting that actually tells you what to do next — not just what happened.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.12)",
    tags: ["GA4", "Reporting", "KPI Dashboards"],
  },
];

export default function Services() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Divider line */}
      <div className="section-container">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
      </div>

      <div className="section-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <ScrollReveal>
            <p className="font-mono text-sm text-white/40 tracking-widest uppercase">
              What I offer
            </p>
            <h2 className="heading-md text-white mt-2 max-w-sm">
              Four ways I grow your business online.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Pick one, pick all. Every engagement starts with understanding your
              specific growth bottleneck — not a generic retainer.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={0.08 * i} direction="up" className="h-full">
              <TiltCard className="h-full">
                <motion.div
                  className="relative rounded-2xl p-6 border h-full flex flex-col gap-4 cursor-default overflow-hidden"
                  variants={{
                    initial: {
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.07)",
                    },
                    hover: {
                      background: svc.glow,
                      borderColor: `${svc.color}35`,
                      transition: { duration: 0.2 },
                    },
                  }}
                >
                {/* Shimmer sweep effect */}
                <motion.div
                  className="absolute top-0 bottom-0 w-[150%] pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${svc.color}15, transparent)`,
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
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: svc.glow,
                    border: `1px solid ${svc.color}25`,
                  }}
                >
                  <svc.icon size={18} style={{ color: svc.color }} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className="font-display font-semibold text-base mb-2"
                    style={{ color: svc.color }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 rounded-md"
                      style={{
                        background: `${svc.color}0d`,
                        color: `${svc.color}99`,
                        border: `1px solid ${svc.color}18`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
