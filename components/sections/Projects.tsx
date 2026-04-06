"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";
import { projects } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

function ProjectCard({ project, index, onHoverInfo }: { project: typeof projects[0]; index: number; onHoverInfo: (color: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const color = project.color;
  const glow = project.glow;

  return (
    <ScrollReveal delay={0.1 * index} direction="up">
      <motion.div
        ref={cardRef}
        className="relative glass-card rounded-2xl overflow-hidden border border-white/8"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setHovered(true); onHoverInfo(color); }}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          borderColor: `${color}40`,
          boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${color}25`,
        }}
      >
        {/* Browser chrome mockup */}
        <div className="relative bg-[#0d0d1a] border-b border-white/8">
          <div className="flex items-center gap-1.5 px-4 py-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <div className="ml-3 flex-1 glass rounded px-3 py-1 text-xs font-mono text-white/30 border border-white/6">
              {project.url}
            </div>
          </div>

          {/* Simulated website preview */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className="relative h-44 overflow-hidden block"
            style={{ background: `linear-gradient(160deg, #0d0d1a 0%, ${color}18 60%, ${glow} 100%)` }}
          >
            {/* Fake hero section */}
            <motion.div 
              className="absolute inset-0 p-4 flex flex-col gap-2.5"
              style={{ y: yParallax }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Nav bar */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-12 h-2 rounded-full" style={{ background: `${color}60` }} />
                <div className="flex-1" />
                {[1,2,3].map(j => (
                  <div key={j} className="w-8 h-1.5 rounded-full bg-white/15" />
                ))}
                <div className="w-12 h-5 rounded-md" style={{ background: `${color}35`, border: `1px solid ${color}40` }} />
              </div>
              {/* Hero content */}
              <div className="w-2/3 h-3 rounded-full" style={{ background: `${color}50` }} />
              <div className="w-1/2 h-2 rounded-full bg-white/20" />
              <div className="w-3/5 h-2 rounded-full bg-white/12" />
              <div className="flex gap-2 mt-1">
                <div className="w-20 h-6 rounded-lg" style={{ background: `${color}50` }} />
                <div className="w-16 h-6 rounded-lg bg-white/10 border border-white/15" />
              </div>
              {/* Cards row */}
              <div className="flex gap-2 mt-2">
                {[1,2,3].map(j => (
                  <div key={j} className="flex-1 h-10 rounded-lg" style={{ background: j === 1 ? `${color}20` : "rgba(255,255,255,0.05)", border: `1px solid ${j === 1 ? color + "30" : "rgba(255,255,255,0.08)"}` }} />
                ))}
              </div>
            </motion.div>
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ background: `rgba(5,5,16,0.3)`, backdropFilter: "blur(2px)" }}
            />
          </a>
        </div>

        {/* Card body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="font-mono text-xs" style={{ color }}>
                Project {project.id}
              </span>
              <h3 className="font-display font-semibold text-lg text-white mt-0.5">
                {project.title}
              </h3>
              <p className="text-white/40 text-sm">{project.subtitle}</p>
            </div>
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ background: `${color}15`, border: `1px solid ${color}25` }}
            >
              <TrendingUp size={16} style={{ color }} />
            </div>
          </div>

          <p className="text-white/55 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Role */}
          <div className="mb-4">
            <span className="text-xs font-mono text-white/30">Role: </span>
            <span className="text-xs text-white/60">{project.role}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono border"
                style={{ borderColor: `${color}20`, color: "rgba(240,240,255,0.45)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Results */}
          <div
            className="grid grid-cols-3 gap-3 pt-4 border-t"
            style={{ borderColor: `${color}15` }}
          >
            {project.results.map((r, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-display font-bold text-xl"
                  style={{ color }}
                >
                  {r.value}
                </div>
                <div className="text-white/50 text-xs mt-0.5 leading-tight">{r.label}</div>
                <div className="text-white/25 text-xs font-mono">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Projects() {
  const [activeColor, setActiveColor] = useState("#00D4FF");

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none mix-blend-screen"
        animate={{
          background: `radial-gradient(circle, ${activeColor}15 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          filter: "blur(100px)",
        }}
      />

      <div className="section-container">
        <ScrollReveal>
          <span className="font-mono text-sm text-cyan-neon/60 tracking-widest uppercase">
            04 · WordPress Projects
          </span>
        </ScrollReveal>

        <div className="mt-6 mb-4 max-w-2xl">
          <div className="heading-lg text-white">
            <TextReveal text="Sites I built, optimized, and grew from the ground up." delay={0.1} />
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-white/40 text-base mb-14 max-w-xl">
            Each project below is a full-stack marketing effort — strategy, execution, and measurable results.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onHoverInfo={setActiveColor} />
          ))}
        </div>
      </div>
    </section>
  );
}
