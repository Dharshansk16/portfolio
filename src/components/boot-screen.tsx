"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, CheckCircle2, Loader2 } from "lucide-react";

const BOOT_MESSAGES = [
  "Initializing DevSpace OS...",
  "Loading environment variables...",
  "Connecting to dev server...",
  "Fetching configurations...",
  "Mounting dashboard modules...",
  "Applying custom themes...",
  "Starting applications...",
  "Boot complete. Welcome aboard! 🚀",
];

export default function BootScreen() {
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_MESSAGES.length) {
        setBootMessages((prev) => [...prev, BOOT_MESSAGES[i]]);
        setProgress(((i + 1) / BOOT_MESSAGES.length) * 100);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] px-4 relative overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 209, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 209, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Particles - Only render on client to avoid hydration mismatch */}
      {mounted &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-2xl w-full bg-black/60 backdrop-blur-2xl p-8 rounded-3xl border border-cyan-500/30 shadow-2xl text-left font-mono text-sm relative overflow-hidden"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20" />

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            className="flex items-center mb-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg relative"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                  "0 0 40px rgba(168, 85, 247, 0.5)",
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Terminal className="w-7 h-7" />
            </motion.div>
            <div className="ml-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                DevSpace OS
              </h2>
              <p className="text-gray-500 text-xs">Boot Console v2.0</p>
            </div>
          </motion.div>

          {/* Boot Messages */}
          <div className="space-y-3 h-64 overflow-hidden mb-6">
            {bootMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start space-x-3"
              >
                {idx < bootMessages.length - 1 ? (
                  idx === 0 ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 mt-0.5 animate-spin flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  )
                ) : (
                  <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                )}
                <span
                  className={`${
                    idx === bootMessages.length - 1
                      ? "text-cyan-300 font-semibold"
                      : "text-green-400"
                  }`}
                >
                  {msg}
                </span>
              </motion.div>
            ))}

            {/* Cursor */}
            {bootMessages.length > 0 && (
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-cyan-400 text-lg"
              >
                █
              </motion.div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Loading system modules...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-xs text-gray-500 flex justify-between items-center"
          >
            <span>system@devspace:~$</span>
            <span className="text-cyan-400/60">Initializing...</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
