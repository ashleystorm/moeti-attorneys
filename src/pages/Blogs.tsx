import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Rights in a Commercial Dispute",
    excerpt: "Navigate the complexities of commercial litigation with our practical guide to protecting your business interests in South African courts.",
    category: "Litigation",
    date: "March 10, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Key Considerations When Drafting a Shareholders' Agreement",
    excerpt: "A well-drafted shareholders' agreement prevents costly disputes. Learn the essential clauses every business owner should include.",
    category: "Commercial Law",
    date: "February 25, 2026",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Property Transfers in South Africa: A Step-by-Step Guide",
    excerpt: "From offer to registration — understand the conveyancing process, associated costs, and timelines when buying or selling property.",
    category: "Property Law",
    date: "February 12, 2026",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Navigating Divorce: Protecting Your Children's Best Interests",
    excerpt: "Family law matters require sensitivity and strategic thinking. Learn how courts determine custody and what factors are considered.",
    category: "Family Law",
    date: "January 30, 2026",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "POPIA Compliance: What Your Business Needs to Know",
    excerpt: "The Protection of Personal Information Act impacts every South African business. Ensure your organisation meets its obligations.",
    category: "Compliance",
    date: "January 15, 2026",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Resolving Workplace Disputes Through the CCMA",
    excerpt: "Understanding the CCMA process, from referral to arbitration, and how proper legal representation strengthens your position.",
    category: "Labour Law",
    date: "January 5, 2026",
    readTime: "5 min read",
  },
];

const Blogs = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onChatOpen={() => setChatOpen(true)} />

      <section className="gradient-hero-bg pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="section-container text-center">
          <motion.span
            className="eyebrow-badge mb-4 inline-block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Legal Insights
          </motion.span>
          <motion.h1
            className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Insights for{" "}
            <span className="bg-gradient-to-r from-foreground to-law-grey bg-clip-text text-transparent">
              Informed Decisions
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Expert analysis, legal updates, and strategic perspectives from Moeti Kanyane Attorneys.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                className="treatment-card group flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="aspect-[16/9] w-full bg-gradient-to-br from-secondary to-muted" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    {post.category}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                  <button className="mt-4 flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Blogs;
