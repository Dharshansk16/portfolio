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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLowEnd, setIsLowEnd] = useState(false);
  const trailIdRef = useRef(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    setIsLowEnd(isLowEndDevice());
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();
      // Throttle updates for better performance
      const throttleDelay = isLowEnd ? 100 : 50;

      if (now - lastUpdateRef.current < throttleDelay) {
        return;
      }

      lastUpdateRef.current = now;
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Reduce trail count on low-end devices
      const maxTrails = isLowEnd ? 3 : 5;

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
            className="absolute w-3 h-3 rounded-full will-change-transform"
            style={{
              left: trail.x - 6,
              top: trail.y - 6,
              background: `radial-gradient(circle, rgba(6, 182, 212, ${
                0.8 - index * 0.15
              }) 0%, transparent 70%)`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: isLowEnd ? 0.4 : 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor glow - Simplified on low-end devices */}
      {!isLowEnd && (
        <motion.div
          className="absolute w-8 h-8 rounded-full pointer-events-none will-change-transform"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
