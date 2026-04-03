import { motion } from "framer-motion";
import { ArrowUpRight, Scale } from "lucide-react";
import imgPersonalInjury from "@/assets/compressed-images/pexels-personal-injury.jpg";
import imgFamilyLaw from "@/assets/compressed-images/pexels-family-law.jpg";
import imgLitigation from "@/assets/compressed-images/pexels-litigation.jpg";
import imgEstatePlanning from "@/assets/compressed-images/pexels-estate-planning.jpg";

const practiceAreas = [
  {
    tag: "Administrative Law",
    title: "Administrative Law",
    image: imgPersonalInjury,
  },
  {
    tag: "Family Law",
    title: "Divorce",
    image: imgFamilyLaw,
  },
  {
    tag: "Regulatory",
    title: "Regulatory",
    image: imgLitigation,
  },
  {
    tag: "Compliance",
    title: "Compliance",
    image: imgEstatePlanning,
  },
];

const TreatmentsGrid = () => {
  return (
    <section id="treatments" className="bg-background py-20 md:py-28">
      <div className="section-container">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <div className="eyebrow-badge mx-auto mb-4 inline-flex">
            <Scale className="h-4 w-4 text-accent" />
            <span>Practice Areas</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Our Areas of Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Comprehensive legal services across litigation, commercial law, property, 
            family law, and regulatory compliance — delivered with precision and integrity.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((t, i) => (
            <div
              key={i}
              className="treatment-card group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur-sm">
                  <ArrowUpRight className="h-4 w-4 text-foreground" />
                </div>
              </div>
              <div className="p-5">
                <span className="mb-1 inline-block rounded-full bg-secondary px-3 py-0.5 text-xs font-medium text-secondary-foreground">
                  {t.tag}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">Moeti Kanyane Attorneys</p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">
                  {t.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentsGrid;
