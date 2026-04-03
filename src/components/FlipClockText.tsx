import { useEffect, useState, useMemo } from "react";
import "./FlipClockText.css";

interface FlipClockTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  flipDuration?: number;
  startDelay?: number;
  trigger?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  mode?: "char" | "word";
}

const FlipClockText = ({
  text,
  className = "",
  staggerDelay = 0.05,
  flipDuration = 0.6,
  startDelay = 0,
  trigger = true,
  as: Component = "span",
  mode = "char",
}: FlipClockTextProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(trigger);
  }, [trigger]);

  type Element = { content: string; index: number; isSpace: boolean };

  const elements = useMemo((): Element[] => {
    if (mode === "word") {
      return text.split(" ").map((word, i) => ({ content: word, index: i, isSpace: false }));
    }
    const words = text.split(" ");
    const chars: Element[] = [];
    let idx = 0;
    words.forEach((word, wi) => {
      word.split("").forEach((char) => {
        chars.push({ content: char, index: idx++, isSpace: false });
      });
      if (wi < words.length - 1) {
        chars.push({ content: " ", index: idx++, isSpace: true });
      }
    });
    return chars;
  }, [text, mode]);

  return (
    <Component className={`flip-clock-container ${className}`}>
      {elements.map((el) => {
        const delay = startDelay + el.index * staggerDelay;
        return (
          <span
            key={el.index}
            className={`flip-clock-char ${isAnimating ? "animate" : ""} ${el.isSpace ? "space" : ""}`}
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${flipDuration}s`,
            }}
          >
            {el.isSpace ? "\u00A0" : el.content}
            {mode === "word" && el.index < elements.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </Component>
  );
};

export default FlipClockText;
