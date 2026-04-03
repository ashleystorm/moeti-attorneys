import { motion } from "framer-motion";
import { Users } from "lucide-react";
import teamDirector from "@/assets/compressed-images/sotshintshi-attorneys-director.png";
import firmLogo from "@/assets/compressed-images/sotshintshi_logo.png";

const director = {
  name: "Mncedi Sotshintshi",
  role: "Director",
  specialization: "Litigation, Personal Injuries (Road Accident Fund), Family Law",
  image: teamDirector,
};

const TeamCarousel = () => {
  return (
    <section id="team" className="bg-background py-20 md:py-28">
      <div className="section-container">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow-badge mx-auto mb-4 inline-flex">
            <Users className="h-4 w-4 text-accent" />
            <span>Our Attorneys</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Meet the Team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Experienced attorneys dedicated to delivering exceptional legal outcomes for every client.
          </p>
        </motion.div>

        {/* Single director card */}
        <div className="flex justify-center">
          <div className="w-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={director.image} alt={director.name} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute top-2.5 left-2.5">
                <img src={firmLogo} alt="Sotshintshi Attorneys" className="h-6 w-auto opacity-75 drop-shadow-md" />
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">{director.name}</h3>
              <p className="mt-0.5 text-sm font-medium text-accent">{director.role}</p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{director.specialization}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;
