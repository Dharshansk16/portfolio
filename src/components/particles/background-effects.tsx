"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundEffectsProps {
  showParticles: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

// Professional color palette with indigo/violet theme
const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#7c3aed", "#6d28d9"];

// Detect if device is low-end
const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    navigator.hardwareConcurrency <= 4 ||
    /Mobile|Android|iPhone/i.test(navigator.userAgent)
  );
};

export default function BackgroundEffects({
  showParticles,
}: BackgroundEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLowEnd(isLowEndDevice());
  }, []);

  useEffect(() => {
    if (!mounted || !showParticles) {
      setParticles([]);
      return;
    }

    // Significantly reduce particle count for better performance
    const particleCount = isLowEnd ? 8 : 15;

    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Use requestAnimationFrame for smoother performance
    let animationFrameId: number;
    let lastUpdate = Date.now();
    const targetFPS = isLowEnd ? 24 : 30; // Reduced FPS for better performance
    const frameDelay = 1000 / targetFPS;

    const animateParticles = () => {
      const now = Date.now();
      const elapsed = now - lastUpdate;

      if (elapsed > frameDelay) {
        setParticles((prev) =>
          prev.map((particle) => {
            let newX = particle.x + particle.speedX;
            let newY = particle.y + particle.speedY;

            if (newX > window.innerWidth) newX = 0;
            else if (newX < 0) newX = window.innerWidth;

            if (newY > window.innerHeight) newY = 0;
            else if (newY < 0) newY = window.innerHeight;

            return {
              ...particle,
              x: newX,
              y: newY,
            };
          })
        );
        lastUpdate = now;
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animationFrameId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, [showParticles, mounted, isLowEnd]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Removed animated grid to reduce lag */}

      {/* Simplified Gradient Orbs - Reduced animation complexity */}
      {isLowEnd ? (
        <>
          <div
            className="absolute top-0 left-0 w-[300px] h-[300px] bg-indigo-600/15 rounded-full"
            style={{ filter: "blur(60px)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-violet-600/15 rounded-full"
            style={{ filter: "blur(60px)" }}
          />
        </>
      ) : (
        <>
          <motion.div
            className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Optimized Particles - Reduced box-shadow for better performance */}
      {showParticles &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: "translateZ(0)", // Force GPU acceleration
              willChange: "transform",
            }}
          />
        ))}

      {/* Removed floating lines to reduce animations */}

      {/* Simplified Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/5 via-transparent to-violet-600/5" />
    </div>
  );
}
