import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import FlipClockText from "@/components/FlipClockText";
import { Sparkles, ChevronDown } from "lucide-react";
import logoImage from "@/assets/compressed-images/sotshintshi_favicon_S.png";

const navItems = [
  { label: "Practice Areas", href: "#treatments" },
  { label: "About", href: "#why-choose" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#cta" },
];

const insightsDropdownItems = [
  { label: "Insights", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
];

const Navbar = ({ onChatOpen }: { onChatOpen?: () => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [phase, setPhase] = useState<"compressed" | "descend" | "expand" | "ready">("compressed");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const t0 = setTimeout(() => setPhase("descend"), 200);
    const t1 = setTimeout(() => setPhase("expand"), 1400);
    const t2 = setTimeout(() => setPhase("ready"), 2400);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setInsightsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const liquidEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];
  const isCompressedOrDescending = phase === "compressed" || phase === "descend";

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setInsightsOpen(false);
    
    if (href === "#" || href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (location.pathname !== "/") {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: liquidEase }}
            onClick={() => setMobileOpen(false)}
            onTouchEnd={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-[46px] left-1/2 z-50 -translate-x-1/2">
      <motion.nav
        className={`liquid-glass-bar flex items-center justify-between rounded-full px-4 py-2 lg:px-6 lg:py-3 ${phase === "ready" ? "overflow-visible" : "overflow-hidden"}`}
        initial={{ y: -100, opacity: 0, width: 280 }}
        animate={{ 
          y: phase === "compressed" ? -100 : 0, 
          opacity: 1, 
          width: isCompressedOrDescending ? 280 : "min(95vw, 1152px)"
        }}
        transition={{ 
          y: { duration: 1.0, ease: liquidEase },
          opacity: { duration: 0.6, ease: liquidEase },
          width: { duration: 0.9, ease: liquidEase }
        }}
      >
        <a
          href="#"
          onClick={(e) => { 
            e.preventDefault(); 
            handleNavClick("#"); 
          }}
          className="flex items-center gap-2 font-heading text-base lg:text-lg font-bold text-foreground whitespace-nowrap tracking-wide"
        >
          <img src={logoImage} alt="" aria-hidden="true" className="hidden lg:block h-7 w-auto flex-shrink-0" />
          SOTSHINTSHI ATTORNEYS
        </a>

        {/* Desktop menu items */}
        <motion.div 
          className="hidden items-center gap-4 lg:gap-8 lg:flex"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: phase === "ready" ? "auto" : 0,
            opacity: phase === "ready" ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: liquidEase }}
        >
          {navItems.map((item, itemIndex) => {
            const prevCharsCount = navItems
              .slice(0, itemIndex)
              .reduce((acc, nav) => acc + nav.label.length, 0);
            const startDelay = prevCharsCount * 0.04 + itemIndex * 0.12;
            
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="nav-link link-underline whitespace-nowrap"
              >
                <FlipClockText
                  text={item.label}
                  trigger={phase === "ready"}
                  staggerDelay={0.05}
                  flipDuration={0.65}
                  startDelay={startDelay}
                />
              </a>
            );
          })}

          {/* Insights dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setInsightsOpen(true)}
            onMouseLeave={() => setInsightsOpen(false)}
          >
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className="nav-link link-underline whitespace-nowrap flex items-center gap-1"
            >
              <FlipClockText
                text="Insights"
                trigger={phase === "ready"}
                staggerDelay={0.05}
                flipDuration={0.65}
                startDelay={navItems.reduce((acc, nav) => acc + nav.label.length, 0) * 0.04 + navItems.length * 0.12}
              />
              <motion.span
                animate={{ rotate: insightsOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: liquidEase }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {insightsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: liquidEase }}
                  className="absolute top-full right-0 mt-3 min-w-[160px] rounded-xl liquid-glass-menu p-1.5 z-50"
                >
                  {insightsDropdownItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground"
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Desktop buttons */}
        <div className="hidden items-center lg:flex relative">
          <motion.button
            onClick={onChatOpen}
            className="ai-chat-btn-shimmer flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-law-charcoal to-law-black px-5 text-sm font-medium text-primary-foreground shadow-md mr-3"
            initial={{ x: 100, opacity: 0 }}
            animate={{ 
              x: phase === "ready" ? 0 : 100,
              opacity: phase === "ready" ? 1 : 0
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: liquidEase, delay: 0.1 }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Chat
          </motion.button>
          <Button
            asChild
            className="h-10 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-none transition-all duration-300 hover:scale-105 hover:bg-primary/90 relative z-10"
          >
            <a href="#cta" onClick={(e) => { e.preventDefault(); handleNavClick("#cta"); }}>Book Consultation</a>
          </Button>
        </div>

        {/* Tablet + Mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          <motion.button
            onClick={onChatOpen}
            className="ai-chat-btn-shimmer flex h-9 items-center gap-1 rounded-full bg-gradient-to-r from-law-charcoal to-law-black px-3 text-xs font-medium text-primary-foreground shadow-md"
            initial={{ opacity: 0 }}
            animate={phase !== "descend" ? { opacity: 1 } : { opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <Sparkles className="h-3 w-3" />
            Chat
          </motion.button>
          <motion.button
            className="relative h-6 w-6"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={phase !== "descend" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <motion.span
              className="absolute left-0 top-[4px] block h-[2px] w-6 rounded-full bg-foreground"
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span
              className="absolute left-0 top-[11px] block h-[2px] w-6 rounded-full bg-foreground"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span
              className="absolute left-0 top-[18px] block h-[2px] w-6 rounded-full bg-foreground"
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, height: "auto", scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="mt-2 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="liquid-glass-menu p-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/30"
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                >
                  {item.label}
                </motion.a>
              ))}
              {insightsDropdownItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: (navItems.length + i) * 0.06, duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="block w-full text-left rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/30"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.36, duration: 0.3 }}
              >
                <Button
                  asChild
                  className="mt-2 w-full rounded-full bg-primary text-primary-foreground"
                >
                  <a href="#cta" onClick={(e) => { e.preventDefault(); handleNavClick("#cta"); }}>Book Consultation</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default Navbar;
