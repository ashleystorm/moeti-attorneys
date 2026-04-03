Law firm website (KS Dinaka Attorneys) — black/grey/white/gold palette, Cormorant Garamond headings, DM Sans body.

## Brand
- Name: KS Dinaka Attorneys
- Address: 873 Stanza Bopape &, Eastwood St, Arcadia, Pretoria, 0083
- Logo: src/assets/ks-dinaka-attorneys-logo-white.png (gold on transparent)
- Team photo: src/assets/ks-dinaka-team.jpg
- Color tokens: --law-black, --law-charcoal, --law-grey, --law-silver, --law-cream, --law-gold, --law-gold-light
- Accent color is gold (43 72% 52%), primary is black (0 0% 10%)
- Fonts: Cormorant Garamond (heading), DM Sans (body)

## Architecture  
- Routes: / (homepage), /blogs, /faqs, * (404)
- Homepage sections: Hero → TreatmentsGrid → WhyChoose → TeamCarousel → TestimonialsCarousel → CTASection → InquiryForm → Footer
- Dark mode: system-based via prefers-color-scheme, .dark class on html, tokens in index.css
- Navbar dropdown labeled "Insights" contains Insights + FAQs links

## Design decisions
- Hero uses split layout on desktop (text left, team photo right), full-bleed on mobile
- link-underline uses accent (gold) gradient — for text links only, not buttons
- tailwind.config.ts uses `law.*` color namespace
- Footer includes newsletter subscription form
