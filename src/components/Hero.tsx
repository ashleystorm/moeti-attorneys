import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dentist.jpg";
import logoImage from "@/assets/compressed-images/sotshintshi_logo.png";

const headlines = [
  "5+ Years of Excellence",
  "215+ Cases Won",
];

const INTERVAL = 2500;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sequenceComplete, setSequenceComplete] = useState(false);

  useEffect(() => {
    if (sequenceComplete) return;
    if (currentIndex >= headlines.length - 1) {
      const timer = setTimeout(() => setSequenceComplete(true), INTERVAL);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCurrentIndex((i) => i + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [currentIndex, sequenceComplete]);

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Mobile: full-bleed background */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src={heroImage}
          alt="Sotshintshi Attorneys team"
          className="h-full w-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Desktop: split layout */}
      <div className="hidden lg:absolute lg:inset-0 lg:grid lg:grid-cols-2">
        {/* Left dark panel - consistently dark regardless of theme */}
        <div className="bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,18%)] to-[hsl(0,0%,8%)]" />
        {/* Right image panel */}
        <div className="relative">
          <img
            src={heroImage}
            alt="Sotshintshi Attorneys team"
            className="h-full w-full object-cover object-top"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,8%)]/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-[100vh] items-end pb-20 pt-32 lg:items-center lg:pb-0 lg:pt-0">
        <div className="section-container w-full">
          <div className="max-w-xl">
            {/* Logo + Firm Name */}
            <motion.div
              className="mb-6 flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={logoImage}
                alt="Sotshintshi Attorneys Logo"
                className="h-14 w-auto flex-shrink-0 sm:h-18 md:h-20"
              />
            </motion.div>

            {/* Eyebrow */}
            <div className="eyebrow-badge mb-6 inline-flex border-law-gold/30 bg-law-gold/10">
              <Scale className="h-4 w-4 text-accent" />
              <span className="text-white/90">Premier Legal Counsel</span>
            </div>

            {/* Animated headlines */}
            <div className="mb-6 h-[4.5rem] sm:h-[5.5rem] md:h-[7rem]">
              <AnimatePresence mode="wait">
                {!sequenceComplete ? (
                  <motion.h1
                    key={currentIndex}
                    className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {headlines[currentIndex]}
                  </motion.h1>
                ) : (
                  <motion.h1
                    className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                  >
                    Your Rights,
                    <br />
                    <span className="text-accent">Our Resolve</span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Subtext */}
            <motion.p
              className="mb-10 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A Black-owned law firm established in 2020, delivering strategic legal
              counsel rooted in excellence, integrity, and community.
            </motion.p>

            {/* CTA */}
            <AnimatePresence>
              {sequenceComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Button
                    asChild
                    className="ai-chat-btn-shimmer rounded-full bg-accent px-10 py-6 text-base font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-accent/90"
                  >
                    <a href="#cta">Book Consultation</a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
