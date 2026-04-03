import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import WhyChoose from "@/components/WhyChoose";
import TeamCarousel from "@/components/TeamCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTASection from "@/components/CTASection";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onChatOpen={() => setChatOpen(true)} />
      <Hero />
      <TreatmentsGrid />
      <WhyChoose />
      <TeamCarousel />
      <TestimonialsCarousel />
      <CTASection />
      <InquiryForm />
      <Footer />
      <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Index;
