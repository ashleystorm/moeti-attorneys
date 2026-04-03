import { AlertTriangle } from "lucide-react";

const BetaBanner = () => (
  <div className="fixed top-0 left-0 right-0 z-[65] flex items-center justify-center gap-2 border-b border-law-gold/20 bg-[hsl(0,0%,8%)]/95 px-4 py-1.5 backdrop-blur-sm">
    <AlertTriangle className="h-3 w-3 flex-shrink-0 text-law-gold" />
    <p className="text-center text-xs font-medium text-white/80">
      <span className="font-semibold text-law-gold">Beta</span>
      {" — "}some functions may not work as expected
    </p>
  </div>
);

export default BetaBanner;
