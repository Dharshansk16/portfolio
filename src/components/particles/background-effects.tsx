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

export default function BackgroundEffects({
  showParticles,
}: BackgroundEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !showParticles) {
      setParticles([]);
      return;
    }

    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 60; i++) {
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

    const animateParticles = () => {
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
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [showParticles, mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Refined Animated Grid Background */}
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

      {/* Professional Gradient Orbs - Indigo/Violet theme */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[100px]"
        animate={{
          x: [0, 120, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/25 rounded-full blur-[100px]"
        animate={{
          x: [0, -120, 0],
          y: [0, -60, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[90px]"
        animate={{
          x: [-120, 120, -120],
          y: [-60, 60, -60],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Particles */}
      {showParticles &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [
                particle.opacity,
                particle.opacity * 0.4,
                particle.opacity,
              ],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

      {/* Elegant Floating Lines */}
      {showParticles && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent"
              style={{
                width: "100%",
                top: `${25 + i * 18}%`,
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
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[90px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[90px]" />
    </div>
  );
}
