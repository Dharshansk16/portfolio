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

    // Reduce particle count on low-end devices
    const particleCount = isLowEnd ? 15 : 30;

    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Use requestAnimationFrame for smoother performance
    let animationFrameId: number;
    let lastUpdate = Date.now();
    const targetFPS = isLowEnd ? 30 : 60;
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
      {/* Refined Animated Grid Background - Disabled on low-end devices */}
      {!isLowEnd && (
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "80px 80px"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Professional Gradient Orbs - Simplified for low-end devices */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[100px]"
        animate={
          isLowEnd
            ? { scale: [1, 1.15, 1] }
            : {
                x: [0, 120, 0],
                y: [0, 60, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{
          duration: isLowEnd ? 15 : 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/25 rounded-full blur-[100px]"
        animate={
          isLowEnd
            ? { scale: [1, 1.25, 1] }
            : {
                x: [0, -120, 0],
                y: [0, -60, 0],
                scale: [1, 1.25, 1],
              }
        }
        transition={{
          duration: isLowEnd ? 20 : 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Particles - Optimized rendering */}
      {showParticles &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: isLowEnd
                ? "none"
                : `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
          />
        ))}

      {/* Elegant Floating Lines - Only on high-end devices */}
      {showParticles && !isLowEnd && (
        <>
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent"
              style={{
                width: "100%",
                top: `${30 + i * 30}%`,
              }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "linear",
              }}
            />
          ))}
        </>
      )}

      {/* Sophisticated Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/5 via-transparent to-violet-600/5" />
      {!isLowEnd && (
        <>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[90px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[90px]" />
        </>
      )}
    </div>
  );
}
