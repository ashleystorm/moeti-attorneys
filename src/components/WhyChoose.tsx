import { motion } from "framer-motion";
import { CircleDot, Cpu, Heart, ShieldCheck } from "lucide-react";
import { usePerformance } from "@/context/PerformanceContext";
import imgLegalTech from "@/assets/compressed-images/pexels-legal-tech.jpg";
import imgLadyJustice from "@/assets/compressed-images/pexels-lady-justice.jpg";
import imgScalesJustice from "@/assets/compressed-images/pexels-scales-justice.jpg";

const features = [
  {
    icon: Cpu,
    title: "Strategic Legal Technology",
    description:
      "Leveraging advanced legal research tools, digital case management, and data analytics for precise, efficient case preparation.",
    image: imgLegalTech,
  },
  {
    icon: Heart,
    title: "Client-Centred Advocacy",
    description:
      "Transparent communication, empathetic counsel, and a commitment to understanding your unique circumstances at every stage.",
    image: imgLadyJustice,
  },
  {
    icon: ShieldCheck,
    title: "Ethical Excellence",
    description:
      "Upholding the highest standards of professional conduct, confidentiality, and integrity in every matter we undertake.",
    image: imgScalesJustice,
  },
];

const WhyChoose = () => {
  const { reduceAnimations, level } = usePerformance();
  
  const getMotionProps = (delay = 0) => ({
    initial: reduceAnimations ? false : { opacity: 0, y: 35 },
    whileInView: reduceAnimations ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: level === 'medium' ? '0px' : '-50px' },
    transition: reduceAnimations 
      ? { duration: 0 } 
      : { duration: level === 'medium' ? 0.4 : 0.9, ease: [0.25, 0.1, 0.25, 1.0] as const, delay },
  });

  return (
    <section id="why-choose" className="gradient-hero-bg py-20 md:py-28">
      <div className="section-container">
        <motion.div
          className="mb-6 text-center"
          {...getMotionProps()}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Trusted Legal Counsel Since 2020
          </h2>
          <div className="mx-auto mt-8">
            <CTAButton href="#team">Meet Our Attorneys</CTAButton>
          </div>
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          {...getMotionProps(0.15)}
        >
          <div className="eyebrow-badge mx-auto mb-4 inline-flex">
            <CircleDot className="h-4 w-4 text-accent" />
            <span>Our Commitment</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Why Choose Sotshintshi Attorneys
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We deliver exceptional legal services through strategic thinking, rigorous preparation, and genuine client care.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              {f.image && (
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTAButton = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a
    href={href}
    className="inline-flex items-center rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground no-underline transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-[0.98]"
  >
    {children}
  </a>
);

export default WhyChoose;
