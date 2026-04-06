"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className,
  variant = "primary",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.35;
    const y = (e.clientY - centerY) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const baseClass =
    "relative px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-shadow duration-300 overflow-hidden select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-neon to-violet-neon text-white shadow-neon-cyan hover:shadow-neon-violet",
    secondary:
      "glass-card border border-white/20 text-white/90 hover:border-cyan-neon/40 hover:text-white",
    ghost: "text-cyan-neon border border-cyan-neon/30 hover:bg-cyan-neon/10",
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <Tag
        href={href}
        onClick={onClick}
        className={cn(baseClass, variants[variant], className)}
      >
        {/* Shine sweep on hover */}
        <motion.span
          className="absolute inset-0 bg-white/0 pointer-events-none"
          whileHover={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />
        {children}
      </Tag>
    </motion.div>
  );
}
