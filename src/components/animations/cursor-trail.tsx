"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorTrail {
  id: number;
  x: number;
  y: number;
}

// Detect if device is low-end
const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    navigator.hardwareConcurrency <= 4 ||
    /Mobile|Android|iPhone/i.test(navigator.userAgent)
  );
};

export default function CursorTrail() {
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const trailIdRef = useRef(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    setIsLowEnd(isLowEndDevice());
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();
      // Increased throttle for better performance
      const throttleDelay = isLowEnd ? 150 : 80;

      if (now - lastUpdateRef.current < throttleDelay) {
        return;
      }

      lastUpdateRef.current = now;

      // Reduce trail count significantly
      const maxTrails = isLowEnd ? 2 : 3;

      setTrails((prev) =>
        [
          ...prev,
          {
            id: trailIdRef.current++,
            x: e.clientX,
            y: e.clientY,
          },
        ].slice(-maxTrails)
      );
    },
    [isLowEnd]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Don't render cursor trail on mobile devices
  if (isLowEnd && /Mobile|Android|iPhone/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="absolute w-2 h-2 rounded-full will-change-transform"
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
              background: `radial-gradient(circle, rgba(6, 182, 212, ${
                0.6 - index * 0.2
              }) 0%, transparent 70%)`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Removed main cursor glow to reduce lag */}
    </div>
  );
}
