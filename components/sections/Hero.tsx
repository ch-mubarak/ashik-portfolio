"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { personalInfo } from "@/lib/data";

const ROLES = ["SEO Strategist", "Paid Ads Expert", "Content Architect", "Growth Marketer"];
const HEADLINE = "DRIVING DIGITAL REVENUE";

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[index % ROLES.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, index]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.85, repeat: Infinity }}
        className="text-cyan-neon"
      >_</motion.span>
    </span>
  );
}

const MagneticButton = ({ children, className, href, target, rel }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width/2);
    const middleY = clientY - (top + height/2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x: springX, y: springY }} href={href} target={target} rel={rel} className={className}>
      {children}
    </motion.a>
  );
};

const DepthParticles = () => (
  <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: Math.random() * 20 + 5 + "px",
          height: Math.random() * 20 + 5 + "px",
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
          opacity: Math.random() * 0.05 + 0.01,
          filter: `blur(${Math.random() * 10 + 2}px)`,
        }}
        animate={{
          y: [0, (Math.random() - 0.5) * 500],
          x: [0, (Math.random() - 0.5) * 500],
        }}
        transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    ))}
  </div>
);

const LivingParagraph = ({ text, className }: { text: string, className?: string }) => (
  <motion.p className={className}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="inline-block mr-1 transition-colors duration-300 hover:text-white cursor-default">
        {word}
      </span>
    ))}
  </motion.p>
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Mouse tracking for spotlight and parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax effects
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const textX = useTransform(springX, (v) => (v - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * -0.05);
  const textY = useTransform(springY, (v) => (v - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.05);

  const rotateX = useTransform(springY, (v) => ((v - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) / 100) * -1);
  const rotateY = useTransform(springX, (v) => ((v - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) / 100) * 1);

  // Scroll RGB Glitch hook
  const { scrollY } = useScroll();
  const glitchX = useTransform(scrollY, [0, 300], [0, 15]);
  const glitchTextShadow = useMotionTemplate`${glitchX}px 0 0 rgba(0,212,255,0.4), calc(-1 * ${glitchX}px) 0 0 rgba(124,58,237,0.4)`;

  // Holographic portrait subtle float mapping
  const imageX = useTransform(springX, (v) => (v - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.08);
  const imageY = useTransform(springY, (v) => (v - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.08);
  const imageRotateX = useTransform(springY, (v) => ((v - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) / 150) * 1);
  const imageRotateY = useTransform(springX, (v) => ((v - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) / 150) * -1);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Dynamic template for the spotlight effect over the grid
  const spotlightMask = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black 10%, transparent 80%)`;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12 bg-[#05050A]">
      
      {/* Massive Background Text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        style={{ x: textX, y: textY }}
      >
        <motion.span 
          className="font-display font-[900] text-[22vw] leading-none whitespace-nowrap text-transparent transition-all"
          style={{ 
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            opacity: 0.5,
            textShadow: glitchTextShadow
          }}
        >
          GROWTH
        </motion.span>
      </motion.div>

      <DepthParticles />

      {/* Dimmed dot grid basis */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} 
      />

      {/* Spotlight layer over the dot grid */}
      <motion.div className="absolute inset-0 pointer-events-none z-0 mix-blend-plus-lighter"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 212, 255, 0.4) 1.5px, transparent 1.5px)",
          backgroundSize: "44px 44px",
          maskImage: spotlightMask,
          WebkitMaskImage: spotlightMask,
        }} 
      />

      {/* Content — Modern editorial feel */}
      <motion.div 
        className="section-container relative z-10 flex w-full"
        style={{ perspective: 1500, rotateX, rotateY }}
      >
        {/* Left Side Typography */}
        <div className="flex flex-col gap-6 relative z-20 w-full lg:w-[65%]">
          
          {/* Top Info Bar (Pill + Signature Name) */}
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <motion.a href="#contact"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-colors"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono text-white/50 tracking-wide">Available</span>
            </motion.a>

            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
              className="px-3 py-1 border border-white/5 rounded text-white/30 font-mono text-xs uppercase"
            >
              Ashik K / Expert
            </motion.div>
          </div>

          {/* Headline — Massive, wrapped, staggered */}
          <motion.h1
            className="font-display font-[800] uppercase text-white leading-[0.95]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", letterSpacing: "-0.03em" }}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } } }}
          >
            {HEADLINE.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block mr-[0.3em] overflow-hidden pb-2">
                {word.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 100 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Typewriter role — single gradient line */}
          <motion.div
            className="font-display font-medium text-white/60"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", letterSpacing: "-0.01em" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            I am a <span className="animated-gradient font-semibold inline-block min-w-[280px]"><Typewriter /></span>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-16 h-px my-6"
            style={{ background: "linear-gradient(90deg, #00D4FF, #7C3AED)" }}
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />

          {/* Bio — Living Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <LivingParagraph 
              text={personalInfo.bio} 
              className="text-white/45 text-base md:text-lg max-w-lg leading-relaxed mb-6" 
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-16"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            <MagneticButton href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white relative z-50"
              style={{ background: "linear-gradient(135deg, #00D4FF, #7C3AED)", boxShadow: "0 0 24px rgba(0,212,255,0.25)" }}
            >
              View Work <ArrowUpRight size={14} />
            </MagneticButton>
            <MagneticButton href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white/70 border border-white/12 hover:border-white/25 hover:text-white transition-all relative z-50"
            >
              Let&apos;s Talk
            </MagneticButton>
            <MagneticButton href="/ashik-k-cv.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm text-white/40 hover:text-white/70 border border-white/8 hover:border-white/15 transition-all relative z-50"
            >
              <Download size={13} /> CV
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Portrait Cutout (Centered & Faded) */}
        <motion.div 
          className="hidden lg:flex absolute right-0 top-[35%] -translate-y-1/2 w-[40vw] max-w-[550px] justify-end items-center z-10 pointer-events-none"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            x: imageX, 
            y: imageY, 
            rotateX: imageRotateX, 
            rotateY: imageRotateY,
            perspective: 1500 
          }}
        >
          {/* Floating UI Holograms */}
          <motion.div 
            className="absolute -left-12 top-[15%] border border-cyan-500/20 p-2 text-[10px] text-cyan-500 font-mono flex flex-col gap-1 backdrop-blur-sm z-20" 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="opacity-50">SYS.ACTV</span>
            <span className="animate-pulse">_ONLINE</span>
          </motion.div>

          <motion.div 
            className="absolute -right-8 bottom-[25%] border border-violet-500/20 p-2 text-[10px] text-violet-500 font-mono backdrop-blur-sm z-20" 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <span className="opacity-50">SCN.</span>
            <span>99.9%</span>
          </motion.div>

          {/* Pristine cutout with a dual-tone glowing drop-shadow and a bottom fade mask */}
          <motion.div className="w-full relative" style={{
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            filter: glitchTextShadow
          }}>
            <img 
              src="/portrait-cutout.png" 
              alt="Ashik Portrait" 
              className="w-full h-auto object-contain opacity-100"
              style={{
                filter: "drop-shadow(-20px 0 40px rgba(0,212,255,0.25)) drop-shadow(20px 0 40px rgba(124,58,237,0.25))"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a href="#skills"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20 hover:text-white/40 transition-colors z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
}
