"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 40) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    
    if (latest > 100 && latest > previous) {
      setHidden(true);
      setMenuOpen(false); // Close menu when hiding
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.replace("#", ""))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={`mx-4 mt-4 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-14 px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-[13px] text-white shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_16px_rgba(0,212,255,0.5)]"
              style={{ background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)" }}
            >
              AK
            </div>
            <span className="font-display font-semibold text-sm text-white/70 group-hover:text-white/90 transition-colors hidden sm:block">
              Ashik K
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  active === item.href
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-neon to-violet-neon text-white hover:shadow-neon-cyan transition-shadow duration-300"
          >
            Hire Me
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 rounded-2xl backdrop-blur-xl bg-white/6 border border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/6 transition-all"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-neon to-violet-neon text-white"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
