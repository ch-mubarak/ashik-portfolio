"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  glow?: string;
  className?: string;
  children: React.ReactNode;
}

export default function GlassCard({
  hover = true,
  glow,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl glass-card overflow-hidden",
        className
      )}
      whileHover={
        hover
          ? {
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: glow
                ? glow.replace("0.15", "0.4")
                : "rgba(0,212,255,0.2)",
              y: -4,
              transition: { duration: 0.2 },
            }
          : {}
      }
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
      {...props}
    >
      {/* Inner glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
