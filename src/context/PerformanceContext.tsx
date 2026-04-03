import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import {
  PerformanceLevel,
  detectPerformanceLevel,
  monitorFrameRate,
  monitorLongTasks,
  getAnimationConfig,
} from '@/lib/performanceDetection';

interface PerformanceContextType {
  level: PerformanceLevel;
  reduceAnimations: boolean;
  reduceEffects: boolean;
  animationConfig: ReturnType<typeof getAnimationConfig>;
  forceLevel: (level: PerformanceLevel) => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
  level: 'high',
  reduceAnimations: false,
  reduceEffects: false,
  animationConfig: getAnimationConfig('high'),
  forceLevel: () => {},
});

interface PerformanceProviderProps {
  children: ReactNode;
  enableRuntimeMonitoring?: boolean;
}

export function PerformanceProvider({
  children,
  enableRuntimeMonitoring = true,
}: PerformanceProviderProps) {
  const [level, setLevel] = useState<PerformanceLevel>('high');
  const [longTaskCount, setLongTaskCount] = useState(0);

  // Initial detection on mount
  useEffect(() => {
    const detectedLevel = detectPerformanceLevel();
    setLevel(detectedLevel);

    // Store in sessionStorage so we don't re-detect on navigation
    sessionStorage.setItem('perf-level', detectedLevel);
  }, []);

  // Runtime FPS monitoring - downgrades if performance degrades
  // Skip on mobile to avoid the RAF loop consuming frames on constrained devices
  useEffect(() => {
    if (!enableRuntimeMonitoring || level === 'low') return;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const cleanup = monitorFrameRate((fps) => {
      console.warn(`[Performance] Low FPS detected: ${fps}. Reducing animations.`);
      setLevel((prev) => (prev === 'high' ? 'medium' : 'low'));
    });

    return cleanup;
  }, [enableRuntimeMonitoring, level]);

  // Monitor long tasks — skip on mobile to avoid state churn causing re-renders
  useEffect(() => {
    if (!enableRuntimeMonitoring) return;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const cleanup = monitorLongTasks((duration) => {
      setLongTaskCount((prev) => {
        const newCount = prev + 1;
        // If we have 5+ long tasks, downgrade performance
        if (newCount >= 5 && level !== 'low') {
          console.warn(`[Performance] Multiple long tasks detected. Reducing animations.`);
          setLevel((prev) => (prev === 'high' ? 'medium' : 'low'));
        }
        return newCount;
      });
    });

    return cleanup;
  }, [enableRuntimeMonitoring, level]);

  // Listen for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setLevel('low');
      } else {
        // Re-detect when user turns off reduced motion
        setLevel(detectPerformanceLevel());
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const forceLevel = useCallback((newLevel: PerformanceLevel) => {
    setLevel(newLevel);
    sessionStorage.setItem('perf-level', newLevel);
  }, []);

  const value: PerformanceContextType = useMemo(() => ({
    level,
    reduceAnimations: level === 'low',
    reduceEffects: level === 'low' || level === 'medium',
    animationConfig: getAnimationConfig(level),
    forceLevel,
  }), [level, forceLevel]);

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformance = () => useContext(PerformanceContext);

/**
 * Hook that returns motion props based on performance level
 * Use this directly in framer-motion components
 */
export function useMotionConfig(customConfig?: {
  initial?: { opacity?: number; y?: number; x?: number; scale?: number };
  animate?: { opacity?: number; y?: number; x?: number; scale?: number };
  delay?: number;
}) {
  const { level, reduceAnimations } = usePerformance();

  if (reduceAnimations) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
      viewport: { once: true, margin: '0px' as const },
    };
  }

  const baseTransition = level === 'medium'
    ? { duration: 0.3, ease: 'easeOut' as const }
    : { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] as const };

  const margin = level === 'medium' ? '0px' : '-50px';
  
  return {
    initial: customConfig?.initial || { opacity: 0, y: 35 },
    animate: customConfig?.animate || { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: {
      ...baseTransition,
      delay: customConfig?.delay || 0,
    },
  };
}
