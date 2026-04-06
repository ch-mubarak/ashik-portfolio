"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CursorInner() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Main dot — snappy
  const dotX = useSpring(mx, { stiffness: 800, damping: 35 });
  const dotY = useSpring(my, { stiffness: 800, damping: 35 });

  // Ring — medium lag
  const ringX = useSpring(mx, { stiffness: 220, damping: 28 });
  const ringY = useSpring(my, { stiffness: 220, damping: 28 });

  // Comet trail — each particle chains off the previous (increasing lag)
  const t1x = useSpring(mx, { stiffness: 160, damping: 22 });
  const t1y = useSpring(my, { stiffness: 160, damping: 22 });
  const t2x = useSpring(t1x, { stiffness: 120, damping: 22 });
  const t2y = useSpring(t1y, { stiffness: 120, damping: 22 });
  const t3x = useSpring(t2x, { stiffness: 90, damping: 22 });
  const t3y = useSpring(t2y, { stiffness: 90, damping: 22 });
  const t4x = useSpring(t3x, { stiffness: 65, damping: 22 });
  const t4y = useSpring(t3y, { stiffness: 65, damping: 22 });

  const trail = [
    { x: t1x, y: t1y, size: 6,  opacity: 0.35 },
    { x: t2x, y: t2y, size: 5,  opacity: 0.22 },
    { x: t3x, y: t3y, size: 4,  opacity: 0.13 },
    { x: t4x, y: t4y, size: 3,  opacity: 0.07 },
  ];

  const [hoverType, setHoverType] = useState<"link" | "view" | null>(null);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.dataset.cursor === "view" || !!target.closest('[data-cursor="view"]')) {
        setHoverType("view");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setHoverType("link");
      } else {
        setHoverType(null);
      }
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [mx, my]);

  return (
    <>
      {/* Comet trail particles */}
      {trail.map((p, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full mix-blend-screen"
          style={{
            x: p.x,
            y: p.y,
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            background: "#00D4FF",
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border flex items-center justify-center overflow-hidden"
        style={{ x: ringX, y: ringY, width: 32, height: 32, marginLeft: -16, marginTop: -16 }}
        animate={{
          scale: hoverType === "view" ? 3 : hoverType === "link" ? 1.8 : isClicking ? 0.6 : 1,
          borderColor: hoverType ? "rgba(124,58,237,0.8)" : "rgba(0,212,255,0.45)",
          backgroundColor: hoverType === "view" ? "rgba(124,58,237,0.15)" : "transparent",
          backdropFilter: hoverType === "view" ? "blur(4px)" : "none",
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: hoverType === "view" ? 1 : 0 }}
          className="text-[4px] font-mono font-bold tracking-widest text-[#7C3AED]"
        >
          VIEW
        </motion.span>
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen"
        style={{ x: dotX, y: dotY, width: 10, height: 10, marginLeft: -5, marginTop: -5, backgroundColor: "#00D4FF" }}
        animate={{ scale: isClicking ? 0.5 : 1, opacity: hoverType ? 0 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isTouch && !reduced) setEnabled(true);
  }, []);
  if (!enabled) return null;
  return <CursorInner />;
}
