import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "General",
    faqs: [
      {
        q: "What are your operating hours?",
        a: "Our offices are open Monday to Friday from 08:00 to 17:00. We are closed on Saturdays, Sundays, and public holidays. After-hours consultations can be arranged by prior appointment.",
      },
      {
        q: "Where are your offices located?",
        a: "We are located at 303 Eastwood St, Arcadia, Pretoria, 0001, South Africa. You can find directions on the map in our Contact section.",
      },
      {
        q: "Do I need to book a consultation in advance?",
        a: "Yes, we recommend booking a consultation in advance to ensure an attorney with the appropriate expertise is available for your matter. You can book through our website or call our offices directly.",
      },
    ],
  },
  {
    title: "Legal Services",
    faqs: [
      {
        q: "What areas of law do you practise?",
        a: "We offer comprehensive legal services including corporate and commercial litigation, commercial law, property and conveyancing, family law, labour law, criminal defence, regulatory compliance, and estate planning.",
      },
      {
        q: "Can you represent me in court?",
        a: "Yes, our attorneys are admitted to practise in the High Court and Magistrate's Courts. We also have an advocate on our team for superior court matters. We provide full litigation support from initial consultation through to trial and appeal.",
      },
      {
        q: "How long does a typical legal matter take to resolve?",
        a: "Timelines vary significantly depending on the nature and complexity of the matter. Simple contract reviews may take a few days, while litigation matters can take several months to years. We provide realistic time estimates during your initial consultation.",
      },
    ],
  },
  {
    title: "Fees & Payments",
    faqs: [
      {
        q: "How are your fees structured?",
        a: "We offer transparent fee structures tailored to each matter. Depending on the case, we may charge hourly rates, fixed fees, or contingency-based arrangements. All fees are discussed and agreed upon before we commence work.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept EFT, credit and debit card payments, and cash. For larger matters, structured payment plans may be available upon discussion with our accounts department.",
      },
      {
        q: "Do you offer a free initial consultation?",
        a: "We offer an initial consultation at a reduced rate to assess your matter and determine the best course of action. This allows us to provide a comprehensive fee estimate and strategic overview.",
      },
    ],
  },
  {
    title: "Confidentiality & Process",
    faqs: [
      {
        q: "Is my consultation confidential?",
        a: "Absolutely. Attorney-client privilege is a cornerstone of our practice. All communications between you and our attorneys are strictly confidential and protected by law.",
      },
      {
        q: "What should I bring to my first consultation?",
        a: "Please bring all relevant documents related to your matter, including contracts, correspondence, court papers, and identification. The more information you provide, the more effectively we can assess your situation.",
      },
    ],
  },
];

const FAQs = () => {
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
            FAQs
          </motion.span>
          <motion.h1
            className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-foreground to-law-grey bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find answers to common questions about our firm, legal services, and processes.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="section-container max-w-3xl">
          {faqCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              className="mb-12 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <h2 className="mb-4 text-2xl font-bold text-foreground">{category.title}</h2>
              <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
                <Accordion type="single" collapsible>
                  {category.faqs.map((faq, faqIdx) => (
                    <AccordionItem
                      key={faqIdx}
                      value={`${category.title}-${faqIdx}`}
                      className="border-b border-border last:border-0"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left text-sm font-medium text-foreground hover:no-underline hover:text-accent transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default FAQs;
