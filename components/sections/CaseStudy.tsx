"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { caseStudy } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TextReveal from "@/components/animations/TextReveal";

export default function CaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-20 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        <ScrollReveal>
          <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase">
            05 · Impact
          </span>
        </ScrollReveal>

        <div className="mt-6 mb-4">
          <div className="heading-lg text-white">
            <TextReveal text={caseStudy.headline} delay={0.1} />
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-white/40 text-base mb-12 max-w-xl">A snapshot of the measurable impact delivered across organic and paid channels.</p>
        </ScrollReveal>

        {/* Big metrics - 1 column on mobile, 2 for small tablets, 4 for desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {caseStudy.highlights.map((item, i) => (
            <ScrollReveal key={i} delay={0.1 * i}>
              <div
                className="glass-card rounded-2xl p-4 md:p-6 border text-center flex flex-col justify-center min-h-[120px] md:min-h-[140px]"
                style={{ borderColor: `${item.color}20` }}
              >
                <div
                  className="font-display font-bold text-2xl xs:text-3xl sm:text-3xl md:text-4xl mb-1"
                  style={{ color: item.color }}
                >
                  {inView && (
                    <AnimatedCounter
                      value={item.value}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      decimals={item.value % 1 !== 0 ? 1 : 0}
                      duration={2000}
                    />
                  )}
                </div>
                <p className="text-white/45 text-sm leading-tight">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
