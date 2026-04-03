import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// South African public holidays 2025–2026
const SA_HOLIDAYS = [
  "2025-01-01","2025-03-21","2025-04-18","2025-04-21","2025-04-27","2025-04-28",
  "2025-05-01","2025-06-16","2025-08-09","2025-09-24","2025-12-16","2025-12-25","2025-12-26",
  "2026-01-01","2026-03-21","2026-04-03","2026-04-06","2026-04-27","2026-05-01",
  "2026-06-16","2026-08-09","2026-08-10","2026-09-24","2026-12-16","2026-12-25","2026-12-26",
];

const TIME_SLOTS = [
  "09:00 – 10:00","10:00 – 11:00","11:00 – 12:00","12:00 – 13:00",
  "14:00 – 15:00","15:00 – 16:00","16:00 – 17:00",
];

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isWeekend(year: number, month: number, day: number) {
  const d = new Date(year, month, day).getDay();
  return d === 0 || d === 6;
}

function isHoliday(year: number, month: number, day: number) {
  const str = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return SA_HOLIDAYS.includes(str);
}

function isPast(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

// Pseudo-random availability based on date
function getAvailableSlots(year: number, month: number, day: number) {
  const seed = year * 10000 + month * 100 + day;
  return TIME_SLOTS.filter((_, i) => ((seed * 31 + i * 17) % 7) > 1);
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationCalendar = ({ isOpen, onClose }: Props) => {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long", year: "numeric" });

  const availableSlots = useMemo(
    () => selectedDay ? getAvailableSlots(viewYear, viewMonth, selectedDay) : [],
    [selectedDay, viewYear, viewMonth]
  );

  const navigate = (dir: -1 | 1) => {
    setSelectedDay(null);
    setSelectedSlot(null);
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewMonth(m);
    setViewYear(y);
  };

  const isDisabled = (day: number) =>
    isWeekend(viewYear, viewMonth, day) || isHoliday(viewYear, viewMonth, day) || isPast(viewYear, viewMonth, day);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="liquid-glass-chat w-full max-w-md rounded-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Book a Consultation
                </h3>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Month nav */}
              <div className="mb-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-heading text-sm font-semibold text-foreground">{monthName}</span>
                <button onClick={() => navigate(1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day headers */}
              <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
                {DAYS.map((d) => <div key={d}>{d}</div>)}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const disabled = isDisabled(day);
                  const selected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      disabled={disabled}
                      onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                      className={`flex h-9 w-9 mx-auto items-center justify-center rounded-full text-sm transition-all duration-200
                        ${disabled ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-accent/20 text-foreground cursor-pointer"}
                        ${selected ? "bg-accent text-accent-foreground font-semibold" : ""}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              <AnimatePresence>
                {selectedDay && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 border-t border-border pt-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        Available Slots
                      </div>
                      {availableSlots.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No available slots for this day.</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200
                                ${selectedSlot === slot
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border bg-card text-foreground hover:border-accent/50"
                                }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm */}
              {selectedDay && selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <Button
                    className="ai-chat-btn-shimmer w-full rounded-full bg-accent py-5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-accent/90"
                    onClick={() => {
                      alert(`Consultation booked: ${selectedDay} ${monthName}, ${selectedSlot}`);
                      onClose();
                    }}
                  >
                    Confirm Booking
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsultationCalendar;
