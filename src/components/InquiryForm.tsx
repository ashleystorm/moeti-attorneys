import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const InquiryForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({ title: "Inquiry sent!", description: "We'll get back to you shortly." });
    }, 1200);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-4 py-3 pl-11 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="section-container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow-badge mx-auto mb-4 inline-flex">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span>Contact Us</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Send an Inquiry
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have a question or need legal guidance? Fill in the form below and our team will respond promptly.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              name="email"
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={handleChange}
              maxLength={255}
              className={inputClass}
            />
          </div>

          {/* Subject */}
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              maxLength={200}
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              maxLength={1000}
              rows={5}
              className={`${inputClass} min-h-[120px] resize-none`}
            />
          </div>

          <Button
            type="submit"
            disabled={sending}
            className="ai-chat-btn-shimmer w-full rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 disabled:opacity-60"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? "Sending…" : "Send Inquiry"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default InquiryForm;
