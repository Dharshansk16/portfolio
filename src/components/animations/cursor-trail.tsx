"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorTrail {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      setTrails((prev) =>
        [
          ...prev,
          {
            id: trailId++,
            x: e.clientX,
            y: e.clientY,
          },
        ].slice(-8)
      ); // Keep last 8 trails
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: trail.x - 6,
              top: trail.y - 6,
              background: `radial-gradient(circle, rgba(6, 182, 212, ${
                0.8 - index * 0.1
              }) 0%, transparent 70%)`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full pointer-events-none"
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
    </div>
  );
}
