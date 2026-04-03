export type PerformanceLevel = 'high' | 'medium' | 'low';

interface DeviceCapabilities {
  cores: number;
  memory: number;
  connection: string;
  prefersReducedMotion: boolean;
  saveData: boolean;
}

/**
 * Detects device performance capabilities using various browser APIs
 */
interface NavigatorWithExtensions extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
}

export function getDeviceCapabilities(): DeviceCapabilities {
  const nav = navigator as NavigatorWithExtensions;
  
  return {
    // Hardware concurrency (CPU cores) - defaults to 2 if unavailable
    cores: navigator.hardwareConcurrency || 2,
    // Device memory in GB (Chrome only) - defaults to 4 if unavailable
    memory: nav.deviceMemory || 4,
    // Network connection type
    connection: nav.connection?.effectiveType || '4g',
    // User prefers reduced motion (accessibility setting)
    prefersReducedMotion: typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
    // Data saver mode enabled
    saveData: nav.connection?.saveData || false,
  };
}

/**
 * Determines performance level based on device capabilities
 */
export function detectPerformanceLevel(): PerformanceLevel {
  const caps = getDeviceCapabilities();

  // Always respect user's accessibility preference
  if (caps.prefersReducedMotion || caps.saveData) {
    return 'low';
  }

  // Low-end device indicators
  if (
    caps.cores <= 2 ||
    caps.memory <= 2 ||
    caps.connection === '2g' ||
    caps.connection === 'slow-2g'
  ) {
    return 'low';
  }

  // Medium-end device indicators
  if (
    caps.cores <= 4 ||
    caps.memory <= 4 ||
    caps.connection === '3g'
  ) {
    return 'medium';
  }

  return 'high';
}

/**
 * Monitors frame rate and calls callback when performance degrades
 */
export function monitorFrameRate(
  onLowFPS: (fps: number) => void,
  threshold = 30,
  sampleDuration = 2000
): () => void {
  let frameCount = 0;
  let lastTime = performance.now();
  let rafId: number;
  let lowFPSCount = 0;

  function countFrames() {
    frameCount++;
    const now = performance.now();

    if (now - lastTime >= sampleDuration) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime));
      
      if (fps < threshold) {
        lowFPSCount++;
        // Only trigger after 2 consecutive low FPS readings to avoid false positives
        if (lowFPSCount >= 2) {
          onLowFPS(fps);
        }
      } else {
        lowFPSCount = 0;
      }

      frameCount = 0;
      lastTime = now;
    }

    rafId = requestAnimationFrame(countFrames);
  }

  rafId = requestAnimationFrame(countFrames);

  // Return cleanup function
  return () => cancelAnimationFrame(rafId);
}

/**
 * Measures long tasks (tasks > 50ms) that block the main thread
 */
export function monitorLongTasks(
  onLongTask: (duration: number) => void
): () => void {
  if (!('PerformanceObserver' in window)) {
    return () => {};
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          onLongTask(entry.duration);
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });

    return () => observer.disconnect();
  } catch {
    // longtask not supported in all browsers
    return () => {};
  }
}

/**
 * Returns animation configuration based on performance level
 */
export function getAnimationConfig(level: PerformanceLevel) {
  switch (level) {
    case 'low':
      return {
        // Disable animations entirely
        initial: false,
        animate: {},
        transition: { duration: 0 },
        whileHover: {},
        whileInView: {},
      };
    case 'medium':
      return {
        // Simplified animations - shorter duration, no complex easing
        transition: { duration: 0.3, ease: 'easeOut' },
        viewport: { once: true, margin: '0px' },
      };
    case 'high':
    default:
      return {
        // Full animations
        transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] },
        viewport: { once: true, margin: '-50px' },
      };
  }
}
