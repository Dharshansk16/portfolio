"use client";

import {
  Briefcase,
  FileText,
  User,
  Terminal,
  Sparkles,
  Code2,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { AppType } from "@/app/page";

interface DashboardProps {
  onAppOpen: (app: AppType) => void;
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
    id: "projects" as AppType,
    name: "Projects",
    icon: Briefcase,
    color: "from-indigo-500 to-blue-600",
    description: "View my work",
  },
  {
    id: "blog" as AppType,
    name: "Blog",
    icon: FileText,
    color: "from-violet-500 to-purple-600",
    description: "Read articles",
  },
  {
    id: "about" as AppType,
    name: "About",
    icon: User,
    color: "from-purple-500 to-fuchsia-600",
    description: "Know me better",
  },
  {
    id: "resume" as AppType,
    name: "Resume",
    icon: FileText,
    color: "from-blue-500 to-indigo-600",
    description: "Download CV",
  },
];

const terminalCommand = "> select_application()";

export default function Dashboard({ onAppOpen }: DashboardProps) {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setIsLowEnd(isLowEndDevice());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative"
    >
      {/* Floating Elements - Professional subtle theme - Simplified for low-end devices */}
      {!isLowEnd && (
        <>
          <motion.div
            className="absolute top-20 left-10 text-indigo-400/15"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 size={60} />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-violet-400/15"
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
        className="text-center mb-16 relative"
      >
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          animate={
            isLowEnd
              ? { rotate: 360 }
              : {
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }
          }
          transition={
            isLowEnd
              ? { rotate: { duration: 20, repeat: Infinity, ease: "linear" } }
              : {
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }
          }
        >
          <Sparkles className="text-indigo-400" size={32} />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl py-2 font-bold bg-gradient-to-r from-indigo-400 via-violet-500 to-purple-500 bg-clip-text text-transparent mb-4 relative"
          animate={
            isLowEnd
              ? {}
              : {
                  backgroundPosition: ["0%", "100%", "0%"],
                }
          }
          transition={
            isLowEnd
              ? {}
              : {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          style={
            isLowEnd
              ? {}
              : {
                  backgroundSize: "200% auto",
                }
          }
        >
          My DevSpace
        </motion.h1>

        <motion.p
          className="text-slate-400 text-lg font-mono mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {terminalCommand}
        </motion.p>

        <motion.div
          className="text-indigo-400/60 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          █
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
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 relative z-10"
      >
        {apps.map((app) => (
          <motion.div
            key={app.id}
            onClick={() => onAppOpen(app.id)}
            className="cursor-pointer group relative"
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
            whileHover={{
              scale: 1.08,
              rotateZ: 2,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Enhanced Professional Glow Effect - Simplified for low-end */}
            {!isLowEnd && (
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${app.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                animate={{
                  opacity: [0, 0.35, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            )}{" "}
            <div className="relative">
              {/* Professional App Icon Container */}
              <div
                className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${app.color} p-5 shadow-[0_8px_32px_0_rgba(99,102,241,0.37)] backdrop-blur-sm border border-white/30 relative overflow-hidden`}
              >
                {/* Refined Animated Background - Only on high-end devices */}
                {!isLowEnd && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0"
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

                <app.icon className="w-full h-full text-white relative z-10 drop-shadow-2xl" />

                {/* Enhanced Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </div>

              {/* App Info with Better Typography */}
              <div className="text-center mt-4">
                <p className="text-base font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors duration-300">
                  {app.name}
                </p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {app.description}
                </p>
              </div>

              {/* Professional Hover Indicator */}
              <motion.div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full group-hover:w-full transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Terminal Display - Professional Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-3xl relative"
      >
        {/* Professional Terminal Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-2xl blur-xl" />

        <div className="relative bg-slate-950/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 font-mono shadow-2xl overflow-hidden">
          {/* Professional Background Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(99, 102, 241, 0.05) 2px,
              rgba(99, 102, 241, 0.05) 4px
            )`,
            }}
          />

          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-400"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-400"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <span className="text-gray-500 text-xs">darsh@devspace:~$</span>
          </div>

          {/* Terminal Content */}
          <div className="space-y-3 relative z-10">
            <div className="flex items-start space-x-3">
              <Terminal className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <motion.span
                  className="text-indigo-400 text-sm md:text-base"
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {terminalCommand}
                </motion.span>
              </div>
            </div>

            <div className="pl-8 space-y-1 text-xs md:text-sm">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="text-gray-400"
              >
                <span className="text-green-400">✓</span> System initialized
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="text-gray-400"
              >
                <span className="text-green-400">✓</span> {apps.length}{" "}
                applications loaded
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="text-gray-400 flex items-center"
              >
                <span className="text-yellow-400 mr-2">⚡</span>
                Ready for interaction
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-1"
                >
                  _
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Professional Scan Line Effect - Only on high-end devices */}
          {!isLowEnd && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none"
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
