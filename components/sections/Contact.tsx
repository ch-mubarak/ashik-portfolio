"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data";

function MagneticLink({ children, href, color }: { children: React.ReactNode, href: string, color: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover="hover"
      initial="initial"
      className="relative flex items-center justify-center p-8 md:p-16 border-t border-r border-white/5 last:border-r-0 flex-1 overflow-hidden group cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.01)"
      }}
    >
      {/* Dynamic Background Hover Fill */}
      <motion.div 
        className="absolute inset-0 z-0 origin-bottom"
        variants={{
          initial: { scaleY: 0 },
          hover: { scaleY: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
        }}
        style={{ background: color }}
      />

      <motion.div 
        className="relative z-10 flex items-center gap-4"
        style={{ x: mouseXSpring, y: mouseYSpring }}
      >
        <motion.span 
          className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-white/50"
          variants={{
            hover: { color: "#ffffff", transition: { duration: 0.2 } }
          }}
        >
          {children}
        </motion.span>
        <motion.div
           variants={{
            initial: { opacity: 0, x: -10, y: 10 },
            hover: { opacity: 1, x: 0, y: 0, color: "#ffffff", transition: { duration: 0.2 } }
          }}
        >
          <ArrowUpRight size={28} />
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

export default function Contact() {
  const socials = [
    { label: "LINKEDIN", href: personalInfo.linkedin, color: "#00D4FF" },
    { label: "INSTAGRAM", href: personalInfo.instagram, color: "#FF2D6B" },
    { label: "EMAIL", href: `mailto:${personalInfo.email}`, color: "#7C3AED" },
  ];

  return (
    <section id="contact" className="min-h-screen relative flex flex-col justify-end bg-[#020205] overflow-hidden pt-32">
      {/* Background glow coming up from the bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center section-container relative z-10 w-full mb-20">
        <div className="w-full flex items-center justify-center gap-4 mb-8">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
          </span>
          <span className="font-mono text-sm tracking-widest uppercase text-emerald-400/80">
            Accepting New Clients
          </span>
        </div>

        <motion.h2 
          className="font-display font-[900] text-center uppercase tracking-tighter text-white"
          style={{ fontSize: "clamp(5rem, 15vw, 12rem)", lineHeight: 0.85 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          LET'S <br/>
          <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}>
            BUILD
          </span>
        </motion.h2>

        <motion.p 
          className="mt-12 text-white/40 text-lg md:text-xl max-w-lg text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Drop me an email to map out a clear, actionable growth strategy for your business. No fluff, just results.
        </motion.p>
      </div>

      {/* Massive bottom links row */}
      <div className="w-full border-t border-white/10 flex flex-col md:flex-row relative z-10 bg-[#050510]/50 backdrop-blur-md">
        {socials.map((s) => (
          <MagneticLink key={s.label} href={s.href} color={s.color}>
            {s.label}
          </MagneticLink>
        ))}
      </div>
    </section>
  );
}
