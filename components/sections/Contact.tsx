"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

function MagneticLink({ children, href, color, icon: Icon }: { children: React.ReactNode, href: string, color: string, icon: any }) {
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
      whileTap="hover"
      initial="initial"
      className="relative flex items-center justify-center p-6 md:p-16 border-b md:border-b-0 md:border-r border-white/5 last:border-b-0 md:last:border-r-0 flex-1 overflow-hidden group cursor-pointer"
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
        className="relative z-10 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center"
        style={{ x: mouseXSpring, y: mouseYSpring }}
      >
        <motion.div
           variants={{
            initial: { scale: 0.8, opacity: 0.5 },
            hover: { scale: 1.1, opacity: 1, color: "#ffffff", transition: { duration: 0.2 } }
          }}
          className="text-white/40"
        >
          <Icon size={32} strokeWidth={1.5} />
        </motion.div>
        
        <motion.span 
          className="font-display font-semibold text-lg md:text-2xl tracking-tight text-white/50"
          variants={{
            hover: { color: "#ffffff", transition: { duration: 0.2 } }
          }}
        >
          {children}
        </motion.span>
      </motion.div>
    </motion.a>
  );
}

export default function Contact() {
  const socials = [
    { label: "LINKEDIN", href: personalInfo.linkedin, color: "#00D4FF", icon: Linkedin },
    { label: "INSTAGRAM", href: personalInfo.instagram, color: "#FF2D6B", icon: Instagram },
    { label: "EMAIL", href: `mailto:${personalInfo.email}`, color: "#7C3AED", icon: Mail },
  ];

  return (
    <section id="contact" className="min-h-screen relative flex flex-col justify-end bg-[#020205] overflow-hidden pt-20">
      {/* Background glow coming up from the bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center section-container relative z-10 w-full pb-20 md:pb-32">
        <div className="w-full flex items-center justify-center gap-4 mb-8">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase text-emerald-400/80">
            Accepting New Clients
          </span>
        </div>

        <motion.h2 
          className="font-display font-[900] text-center uppercase tracking-tighter text-white"
          style={{ fontSize: "clamp(3.5rem, 16vw, 12rem)", lineHeight: 0.8 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          LET'S <br/>
          <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>
            BUILD
          </span>
        </motion.h2>

        <motion.p 
          className="mt-8 text-white/40 text-base md:text-xl max-w-sm md:max-w-lg text-center leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Drop me an email to map out a clear, actionable growth strategy for your business. No fluff, just results.
        </motion.p>
      </div>

      {/* Massive bottom links row */}
      <motion.div 
        className="w-full border-t border-white/10 flex flex-col md:flex-row relative z-10 bg-[#050510]/50 backdrop-blur-md"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={{
          animate: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {socials.map((s) => (
          <motion.div 
            key={s.label} 
            className="flex-1 flex"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <MagneticLink href={s.href} color={s.color} icon={s.icon}>
              {s.label}
            </MagneticLink>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
