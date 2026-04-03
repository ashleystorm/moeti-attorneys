import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerformance } from "@/context/PerformanceContext";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaImage from "@/assets/why-tech.jpg";
import ConsultationCalendar from "@/components/ConsultationCalendar";
import ZA from "country-flag-icons/react/3x2/ZA";
import US from "country-flag-icons/react/3x2/US";
import GB from "country-flag-icons/react/3x2/GB";
import NG from "country-flag-icons/react/3x2/NG";
import KE from "country-flag-icons/react/3x2/KE";
import IN from "country-flag-icons/react/3x2/IN";
import AU from "country-flag-icons/react/3x2/AU";
import DE from "country-flag-icons/react/3x2/DE";
import FR from "country-flag-icons/react/3x2/FR";
import CA from "country-flag-icons/react/3x2/CA";
import AE from "country-flag-icons/react/3x2/AE";
import SG from "country-flag-icons/react/3x2/SG";
import NL from "country-flag-icons/react/3x2/NL";
import CH from "country-flag-icons/react/3x2/CH";
import BW from "country-flag-icons/react/3x2/BW";
import ZW from "country-flag-icons/react/3x2/ZW";
import MZ from "country-flag-icons/react/3x2/MZ";
import NA from "country-flag-icons/react/3x2/NA";

const FlagComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  ZA, US, GB, NG, KE, IN, AU, DE, FR, CA, AE, SG, NL, CH, BW, ZW, MZ, NA,
};

const countries = [
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "BW", name: "Botswana", dial: "+267" },
  { code: "ZW", name: "Zimbabwe", dial: "+263" },
  { code: "MZ", name: "Mozambique", dial: "+258" },
  { code: "NA", name: "Namibia", dial: "+264" },
];

type Country = typeof countries[number];

const FlagIcon = ({ code, className }: { code: string; className?: string }) => {
  const FlagComponent = FlagComponents[code];
  if (!FlagComponent) return <span className={className}>🏳️</span>;
  return <FlagComponent className={className} />;
};

interface PhoneInputProps {
  value: string;
  onChange: (value: string, fullNumber: string) => void;
}

const PhoneInput = ({ value, onChange }: PhoneInputProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Only allow digits and spaces for formatting
    const cleaned = rawValue.replace(/[^\d\s]/g, "");
    // Auto-format: add space every 3 digits for readability
    const digitsOnly = cleaned.replace(/\s/g, "");
    let formatted = "";
    for (let i = 0; i < digitsOnly.length && i < 10; i++) {
      if (i > 0 && i % 3 === 0) formatted += " ";
      formatted += digitsOnly[i];
    }
    onChange(formatted, `${selected.dial}${digitsOnly}`);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const digitsOnly = pasted.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 3 === 0) formatted += " ";
      formatted += digitsOnly[i];
    }
    onChange(formatted, `${selected.dial}${digitsOnly}`);
  };

  const handleCountrySelect = (country: Country) => {
    setSelected(country);
    setOpen(false);
    // Update full number with new dial code
    const digitsOnly = value.replace(/\s/g, "");
    onChange(value, `${country.dial}${digitsOnly}`);
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex flex-1 items-center rounded-full border border-border bg-card transition-all duration-200 focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/20">
      {/* Country selector button */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 items-center gap-1.5 rounded-l-full border-r border-border bg-secondary/30 px-3 text-sm text-foreground transition-colors hover:bg-secondary/60"
        >
          <FlagIcon code={selected.code} className="h-4 w-5 rounded-sm" />
          <span className="text-xs font-medium text-muted-foreground">{selected.dial}</span>
          <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="absolute left-0 top-full z-50 mt-2 max-h-[280px] w-[260px] overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-xl"
            >
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary/60 ${
                    selected.code === c.code ? "bg-secondary/40" : ""
                  }`}
                >
                  <FlagIcon code={c.code} className="h-4 w-5 rounded-sm" />
                  <span className="flex-1 text-left font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.dial}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone number input */}
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        onPaste={handlePaste}
        placeholder="Enter your phone number"
        className="h-11 w-full rounded-r-full bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
};

const CTASection = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { reduceAnimations, level } = usePerformance();

  const handlePhoneChange = (formatted: string, full: string) => {
    setPhoneNumber(formatted);
    setFullPhoneNumber(full);
  };

  return (
    <section id="cta" className="bg-background py-20 md:py-28">
      <div className="section-container">
        <div
          className="grid overflow-hidden rounded-3xl border border-border md:grid-cols-2"
        >
          {/* Left content */}
          <div className="flex flex-col justify-center bg-law-cream p-8 md:p-12">
            {/* Get Started — now a clickable shimmer button */}
            <button
              onClick={() => setCalendarOpen(true)}
              className="ai-chat-btn-shimmer mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent/20 hover:scale-105"
            >
              <CalendarDays className="h-4 w-4" />
              Get Started — Book a Slot
            </button>

            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Schedule Your Consultation
            </h2>
            <p className="mt-4 text-muted-foreground">
              Take the first step toward resolving your legal matter. Book a confidential
              consultation with one of our experienced attorneys today.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2">
              <PhoneInput value={phoneNumber} onChange={handlePhoneChange} />
              <Button className="h-11 shrink-0 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90">
                Book Now
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              By booking, you agree to our consultation{" "}
              <a href="#" className="underline transition-colors hover:text-foreground">terms</a>{" "}
              and{" "}
              <a href="#" className="underline transition-colors hover:text-foreground">privacy policy</a>.
            </p>

            {/* Map Section */}
            <div className="mt-8">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                Where to Find Us
              </h3>
              <div ref={mapContainerRef} className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/50">
                {!mapLoaded && (
                  <div className="absolute inset-0 z-10 h-[280px] w-full bg-secondary/50 animate-pulse flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Loading map...</span>
                  </div>
                )}
                <iframe
                  title="Sotshintshi Attorneys Location"
                  src="https://maps.google.com/maps?q=303+Eastwood+St,+Arcadia,+Pretoria,+0001,+South+Africa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  onLoad={() => setMapLoaded(true)}
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=303+Eastwood+St,+Arcadia,+Pretoria,+0001"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors link-underline"
              >
                303 Eastwood St, Arcadia, Pretoria, 0001 →
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="hidden md:block">
            <img
              src={ctaImage}
              alt="Book legal consultation"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <ConsultationCalendar isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />
    </section>
  );
};

export default CTASection;
