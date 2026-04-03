import { useState } from "react";
import { Link } from "react-router-dom";
import { LuminousSmileReviews } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const footerLinks = {
  "Practice Areas": [
    "Corporate Litigation",
    "Commercial Law",
    "Property & Conveyancing",
    "Family Law",
  ],
  Company: [
    "About Us",
    "Our Attorneys",
    "Testimonials",
    { label: "Insights", href: "/blogs" },
    { label: "FAQs", href: "/faqs" },
    "Contact",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Disclaimer",
    "POPIA Compliance",
    { label: "Unsubscribe from Newsletter", href: "#" },
  ],
};

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    toast({ title: "Subscribed!", description: "You'll receive our latest updates." });
    setEmail("");
  };

  return (
    <footer className="gradient-cta-bg py-16 text-white">
      <div className="section-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => {
                  const label = typeof link === "string" ? link : link.label;
                  const href = typeof link === "string" ? "#" : link.href;
                  return (
                    <li key={label}>
                      {href.startsWith("/") ? (
                        <Link to={href} className="text-sm text-white/70 transition-colors duration-200 hover:text-white link-underline link-underline-light">
                          {label}
                        </Link>
                      ) : (
                        <a href={href} className="text-sm text-white/70 transition-colors duration-200 hover:text-white link-underline link-underline-light">
                          {label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Operating Hours
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {Object.entries(LuminousSmileReviews.operatingHours).map(([day, hours]) => (
                <li key={day} className="flex items-center justify-between gap-4">
                  <span className="text-white/80">{day}</span>
                  <span>
                    {hours ? `${hours.open} - ${hours.close}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 lg:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full min-w-0 lg:flex-1 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
                <button
                  type="submit"
                  className="ai-chat-btn-shimmer h-11 shrink-0 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors duration-200 hover:border-white/40 hover:text-white"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors duration-200 hover:border-white/40 hover:text-white"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors duration-200 hover:border-white/40 hover:text-white"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 md:flex-row">
          <p className="text-sm text-white/50">
            © 2025 Moeti Kanyane Attorneys. All rights reserved.
          </p>
          <a href="#" className="text-sm text-white/50 transition-colors hover:text-white/80">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
