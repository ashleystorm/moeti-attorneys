import { motion } from "framer-motion";
import { Scale, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { LuminousSmileReviews, type Review } from "@/lib/data";

const reviews = LuminousSmileReviews.reviews.filter(r => r.rating >= 4);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-accent text-accent" : "fill-muted text-muted"
        }`}
      />
    ))}
  </div>
);

const TestimonialsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop auto-scroll
  useEffect(() => {
    if (isMobile) return;
    
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let accumulated = 0;
    const speed = 0.4;

    const scroll = () => {
      if (container) {
        accumulated += speed;
        
        if (accumulated >= 1) {
          const pixels = Math.floor(accumulated);
          accumulated -= pixels;
          
          const currentScroll = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (currentScroll >= maxScroll - 1) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft = currentScroll + pixels;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isMobile]);

  // Mobile auto-scroll (index-based)
  useEffect(() => {
    if (!isMobile || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  const handleTap = useCallback(() => {
    if (!isMobile) return;
    
    // Pause auto-scroll on tap
    setIsPaused(true);
    
    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // Resume after 5 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, [isMobile]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="bg-background py-20 md:py-28">
      <div className="section-container">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow-badge mx-auto mb-4 inline-flex">
            <Scale className="h-4 w-4 text-accent" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Real experiences from clients who trust us with their most important legal matters.
          </p>
        </motion.div>

        {isMobile ? (
          /* Mobile: No touch scroll, auto-advances with transform */
          <div className="relative">
            <div
              className="overflow-hidden"
              onClick={handleTap}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const delta = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(delta) > 50) {
                  handleTap();
                  if (delta > 0) setActiveIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : prev));
                  else setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
                }
              }}
            >
              <motion.div
                className="flex"
                animate={{ x: `calc(-${activeIndex * 100}% - ${activeIndex * 24}px)` }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-full flex-shrink-0 px-4 first:pl-0 last:pr-0"
                    style={{ marginRight: "24px" }}
                  >
                    <div className="testimonial-card">
                      <StarRating rating={review.rating} />
                      <p className="mt-3 leading-relaxed text-foreground/80">"{review.text}"</p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-secondary-foreground">
                          {review.authorName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-heading text-sm font-semibold text-foreground">{review.authorName}</p>
                          <p className="text-xs text-muted-foreground">
                            {review.relativeTimeDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile navigation buttons */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
                  handleTap();
                }}
                disabled={activeIndex === 0}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-200 hover:bg-secondary hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              
              {/* Dots indicator */}
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      handleTap();
                    }}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "bg-accent w-6"
                        : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : prev));
                  handleTap();
                }}
                disabled={activeIndex === reviews.length - 1}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-200 hover:bg-secondary hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        ) : (
          /* Desktop: Auto-scrolling row */
          <div
            ref={scrollRef}
            className="scrollbar-hide -mx-4 flex gap-6 overflow-x-auto px-4 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="testimonial-card w-[calc(100vw-3rem)] flex-shrink-0 sm:w-[calc(50vw-3rem)] lg:w-[calc(33.333vw-2rem)] max-w-[380px]"
              >
                <StarRating rating={review.rating} />
                <p className="mt-3 leading-relaxed text-foreground/80">"{review.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-secondary-foreground">
                    {review.authorName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">{review.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.relativeTimeDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
