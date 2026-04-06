"use client";

import { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame, useMotionValue } from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap tracking-tighter">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mx-4">{children} </span>
        <span className="block mx-4">{children} </span>
        <span className="block mx-4">{children} </span>
        <span className="block mx-4">{children} </span>
        <span className="block mx-4">{children} </span>
        <span className="block mx-4">{children} </span>
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const track1 = "SEO STRATEGY // META ADS // GOOGLE ADS // CONTENT ARCHITECTURE // ";
  const track2 = "ROAS OPTIMIZATION // CAMPAIGN MANAGEMENT // BRAND GROWTH // ANALYSIS // ";

  return (
    <section className="py-20 md:py-32 bg-[#050510] overflow-hidden flex flex-col gap-2 md:gap-4 relative">
      {/* Light edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #050510, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(-90deg, #050510, transparent)" }} />

      <ParallaxText baseVelocity={-2}>
        <span 
          className="font-display font-[900] text-transparent uppercase"
          style={{ 
            fontSize: "clamp(4rem, 12vw, 10rem)",
            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            lineHeight: 1 
          }}
        >
          {track1}
        </span>
      </ParallaxText>
      
      <ParallaxText baseVelocity={2}>
        <span 
          className="font-display font-[900] text-white/5 uppercase"
          style={{ 
            fontSize: "clamp(4rem, 12vw, 10rem)",
            lineHeight: 1 
          }}
        >
          {track2}
        </span>
      </ParallaxText>
    </section>
  );
}
