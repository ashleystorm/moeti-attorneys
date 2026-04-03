import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const liquidEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const TypingIndicator = () => (
  <motion.div
    className="flex items-start gap-2 px-4 py-2"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    transition={{ duration: 0.2 }}
  >
    <div className="liquid-glass-bubble-ai rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex items-center gap-1.5">
        <span className="ai-typing-dot" style={{ animationDelay: "0ms" }} />
        <span className="ai-typing-dot" style={{ animationDelay: "150ms" }} />
        <span className="ai-typing-dot" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </motion.div>
);

const ChatBubble = ({ message, index }: { message: Message; index: number }) => {
  const isUser = message.role === "user";
  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1`}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: liquidEase, delay: index * 0.05 }}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "liquid-glass-bubble-user rounded-tr-md text-white"
            : "liquid-glass-bubble-ai rounded-tl-md text-foreground"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
};

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat = ({ isOpen, onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm the Moeti Kanyane Attorneys AI assistant. How can I help you today? I can answer questions about our practice areas, booking a consultation, or anything else.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const focusTimeout = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 350);

      return () => {
        clearTimeout(focusTimeout);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
  }, [isOpen]);

  const simulateResponse = (userMsg: string) => {
    // Short delay before showing typing indicator for natural feel
    const typingDelay = 400 + Math.random() * 300;

    setTimeout(() => {
      setIsTyping(true);
    }, typingDelay);

    const responses: Record<string, string> = {
      default:
        "Thank you for your message! For specific legal enquiries, please book a consultation or call our offices directly. I'm here to help with general questions about our legal services.",
    };

    const lowerMsg = userMsg.toLowerCase();
    let response = responses.default;
    if (lowerMsg.includes("book") || lowerMsg.includes("consultation") || lowerMsg.includes("appointment")) {
      response =
        "I'd be happy to help you schedule a consultation! You can use our booking section below, or call us directly. Would you like me to guide you through the process?";
    } else if (lowerMsg.includes("practice") || lowerMsg.includes("service") || lowerMsg.includes("area")) {
      response =
        "We offer a wide range of legal services including corporate litigation, commercial law, property and conveyancing, family law, and regulatory compliance. Would you like to know more about a specific practice area?";
    } else if (lowerMsg.includes("hour") || lowerMsg.includes("open")) {
      response =
        "Our offices are open Monday to Friday, 8:00 AM – 5:00 PM. We also accommodate after-hours consultations by prior arrangement. Would you like to schedule a visit?";
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("fee")) {
      response =
        "Our fees vary depending on the nature and complexity of the matter. We offer transparent fee structures and can discuss costs during your initial consultation. Would you like to book one?";
    }

    const wordCount = userMsg.trim().split(/\s+/).filter(Boolean).length;
    const thinkingTime = Math.min(1400, Math.max(600, 500 + wordCount * 40 + Math.random() * 200));
    const totalDelay = typingDelay + thinkingTime;

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: response },
      ]);
    }, totalDelay);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    simulateResponse(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed z-[70] flex flex-col chat-viewport-fix
              inset-x-0 bottom-0 top-auto rounded-none
              md:inset-auto md:bottom-6 md:right-6 md:h-[520px] md:w-[380px] md:rounded-2xl"
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 40,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 40,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.3, ease: liquidEase }}
          >
            <div className="liquid-glass-chat flex h-full flex-col overflow-hidden md:rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/20 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-law-charcoal to-law-black">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      AI Assistant
                    </h3>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="liquid-glass-close flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4 text-foreground/70" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 no-scrollbar overscroll-contain">
                {messages.map((msg, i) => (
                  <ChatBubble key={msg.id} message={msg} index={i} />
                ))}
                <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              <div className="border-t border-white/20 px-4 py-3 chat-input-safe flex-shrink-0">
                <div className="chat-input-wrapper flex items-center gap-2 rounded-full px-4 py-2">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    autoCorrect="on"
                    autoCapitalize="sentences"
                    spellCheck="true"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground dark:placeholder:text-white/40 outline-none"
                    style={{ fontSize: '16px' }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-law-charcoal to-law-black text-primary-foreground transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                    aria-label="Send message"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIChat;
