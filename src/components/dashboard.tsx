"use client";

import { Briefcase, User, Code2, Rocket, BookOpen, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { AppType } from "@/app/page";

interface DashboardProps {
  onAppOpen: (app: AppType) => void;
  showParticles?: boolean;
}

// Detect if device is low-end
const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    navigator.hardwareConcurrency <= 4 ||
    /Mobile|Android|iPhone/i.test(navigator.userAgent)
  );
};

const apps = [
  {
    id: "about" as AppType,
    name: "About",
    icon: User,
    description: "Know me better",
  },
  {
    id: "projects" as AppType,
    name: "Projects",
    icon: Briefcase,
    description: "View my work",
  },
  {
    id: "achievements" as AppType,
    name: "Achievements",
    icon: Trophy,
    description: "My Awards",
  },
  {
    id: "blog" as AppType,
    name: "Blog",
    icon: BookOpen,
    description: "Read articles",
  },
];

const terminalCommand = "> select_application()";

export default function Dashboard({
  onAppOpen,
  showParticles = true,
}: DashboardProps) {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setIsLowEnd(isLowEndDevice());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pt-14 sm:pt-16 pb-24 sm:pb-28 relative safe-area bg-transparent [.no-bg-image.dark_&]:bg-zinc-950 [.no-bg-image:not(.dark)_&]:bg-zinc-50 transition-colors duration-500"
    >
      {/* Floating Elements - Conditional based on showParticles */}
      {showParticles && !isLowEnd && (
        <>
          <motion.div
            className="absolute top-20 left-10 text-zinc-500 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 size={60} />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-zinc-500 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket size={60} />
          </motion.div>
        </>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12 sm:mb-14 md:mb-16 relative px-4 mt-8 sm:mt-12"
      >
        {/* Main Headline */}
        <motion.h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-800 dark:text-white mb-4 sm:mb-6 leading-tight">
          Dharshan S Kotian
        </motion.h1>

        {/* Subtitle / Role */}
        <motion.p
          className="text-base sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 font-medium max-w-2xl mx-auto mb-8 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Building scalable backend applications and intelligent AI systems.
        </motion.p>

        {/* Terminal Command Simulation */}
        <motion.div
          className="flex flex-col sm:flex-row items-center sm:inline-flex gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-md dark:bg-zinc-900/50 border border-white/50 dark:border-zinc-800 font-mono text-xs sm:text-sm md:text-base shadow-inner w-full sm:w-auto max-w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-zinc-400 whitespace-nowrap">
            darsh@devspace:~$
          </span>
          <div className="flex items-center break-all sm:break-normal text-center sm:text-left">
            <span className="text-zinc-700 dark:text-zinc-300 mr-1">
              {terminalCommand}
            </span>
            <motion.span
              className="w-1.5 h-3 sm:w-2 sm:h-4 bg-zinc-400 inline-block"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* App Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.3,
            },
          },
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20 relative z-10 max-w-4xl mx-auto px-4"
      >
        {apps.map((app) => (
          <motion.div
            key={app.id}
            onClick={() => onAppOpen(app.id)}
            className="cursor-pointer group relative w-full"
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.8 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                },
              },
            }}
            whileHover={
              isLowEnd
                ? {}
                : {
                    scale: 1.05,
                    y: -8,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    },
                  }
            }
            whileTap={{ scale: 0.95 }}
            style={{ willChange: "transform" }}
          >
            {/* Enhanced Professional Glow Effect - Only if showParticles is true */}
            {showParticles && !isLowEnd && (
              <motion.div
                className={`absolute -inset-1 bg-white/40 dark:bg-zinc-800 rounded-3xl blur-xl opacity-0 transition-opacity duration-500`}
                whileHover={{ opacity: 0.5 }}
                animate={{
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            )}
            <div className="relative">
              {/* Professional App Icon Container */}
              <motion.div
                className={`mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-zinc-900/80 p-4 sm:p-5 backdrop-blur-md border border-white/60 dark:border-zinc-800 relative overflow-hidden touch-manipulation transition-all duration-300`}
                style={{
                  boxShadow: isLowEnd
                    ? "0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                    : "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
                  willChange: "transform",
                }}
                whileHover={
                  isLowEnd
                    ? {}
                    : {}
                }
              >
                {/* Refined Animated Background - Only if showParticles is true */}
                {showParticles && !isLowEnd && (
                  <motion.div
                    className="absolute inset-0 bg-white/40 dark:bg-zinc-800/20 opacity-50"
                    animate={{
                      x: [-200, 200],
                      y: [-200, 200],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                )}

                <motion.div
                  className="w-full h-full relative z-10"
                  whileHover={
                    isLowEnd
                      ? {}
                      : {
                          rotate: [0, -5, 5, -5, 0],
                          transition: { duration: 0.5 },
                        }
                  }
                >
                  <app.icon className="w-full h-full text-slate-800 dark:text-white dark:group-hover:text-orange-50 transition-colors duration-500 group-hover:scale-110" />
                </motion.div>

                {/* Enhanced Shimmer Effect - Only if showParticles is true */}
                {showParticles && !isLowEnd && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-700/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                )}
              </motion.div>

              {/* App Info with Better Typography */}
              <div className="text-center mt-3 sm:mt-4">
                <p className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-white mb-0.5 sm:mb-1 group-hover:text-zinc-500 dark:group-hover:text-orange-50 transition-colors duration-500">
                  {app.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-orange-100/90 transition-colors duration-500">
                  {app.description}
                </p>
              </div>

              {/* Professional Hover Indicator */}
              <motion.div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 sm:h-1 bg-white/60 dark:bg-zinc-950 rounded-full group-hover:w-full transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
