"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, CheckCircle2, Loader2 } from "lucide-react";

export default function BootScreen() {
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const messages: Array<{ text: string; icon: string }> = [
      { text: "Initializing DevSpace OS...", icon: "loader" },
      { text: "Loading environment variables...", icon: "check" },
      { text: "Connecting to dev server...", icon: "check" },
      { text: "Fetching configurations...", icon: "check" },
      { text: "Mounting dashboard modules...", icon: "check" },
      { text: "Applying custom themes...", icon: "check" },
      { text: "Starting applications...", icon: "check" },
      { text: "Boot complete. Welcome aboard! 🚀", icon: "zap" },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        const currentMessage = messages[i];
        if (currentMessage) {
          setBootMessages((prev) => [...prev, currentMessage.text]);
          setProgress(((i + 1) / messages.length) * 100);
        }
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
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-4 relative overflow-hidden"
    >
      {/* Professional Ambient Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Professional Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Professional Floating Particles - Only render on client */}
      {mounted &&
        [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-2xl w-full relative text-left font-mono text-sm"
      >
        {/* Elegant Multi-Layer Glow Effect */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-3xl blur-xl opacity-40" />
        <div className="absolute -inset-[1px] bg-gradient-to-br from-indigo-400/50 via-violet-400/50 to-purple-400/50 rounded-3xl" />

        {/* Main Content Container */}
        <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/95 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          <div className="relative z-10">
            {/* Professional Header */}
            <motion.div
              className="flex items-center mb-8"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.5)",
                    "0 0 40px rgba(139, 92, 246, 0.5)",
                    "0 0 20px rgba(99, 102, 241, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <Terminal className="w-7 h-7" />
              </motion.div>
              <div className="ml-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  DevSpace OS
                </h2>
                <p className="text-slate-500 text-xs">Boot Console v2.0</p>
              </div>
            </motion.div>

            {/* Professional Boot Messages */}
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
                      <Loader2 className="w-4 h-4 text-indigo-400 mt-0.5 animate-spin flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    )
                  ) : (
                    <Zap className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  )}
                  <span
                    className={`${
                      idx === bootMessages.length - 1
                        ? "text-indigo-300 font-semibold"
                        : "text-emerald-400"
                    }`}
                  >
                    {msg}
                  </span>
                </motion.div>
              ))}

              {/* Professional Cursor */}
              {bootMessages.length > 0 && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-indigo-400 text-lg"
                >
                  █
                </motion.div>
              )}
            </div>

            {/* Professional Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Loading system modules...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-full relative shadow-lg shadow-indigo-500/50"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Enhanced Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Professional Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-xs text-slate-500 flex justify-between items-center"
            >
              <span>system@devspace:~$</span>
              <span className="text-indigo-400/60">Initializing...</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
