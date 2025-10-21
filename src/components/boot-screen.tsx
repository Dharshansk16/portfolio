"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, CheckCircle2, Loader2 } from "lucide-react";

// Detect if device is low-end
const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    navigator.hardwareConcurrency <= 4 ||
    /Mobile|Android|iPhone/i.test(navigator.userAgent)
  );
};

export default function BootScreen() {
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setIsLowEnd(isLowEndDevice());
  }, []);

  useEffect(() => {
    const messages: Array<{ text: string; icon: string }> = [
      { text: "Initializing DevSpace OS...", icon: "loader" },
      { text: "Loading environment variables...", icon: "check" },
      { text: "Connecting to dev server...", icon: "check" },
      { text: "Fetching configurations...", icon: "check" },
      { text: "Mounting dashboard modules...", icon: "check" },
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
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-4 relative overflow-hidden"
    >
      {/* Simplified Ambient Gradient Orbs - Static for better performance */}
      {!isLowEnd && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[100px]" />
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full relative text-left font-mono text-sm"
      >
        {/* Simplified Glow Effect - Single layer for performance */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-purple-500/30 rounded-3xl blur-lg" />

        {/* Main Content Container */}
        <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          <div className="relative z-10">
            {/* Professional Header */}
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Terminal className="w-7 h-7" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  DevSpace OS
                </h2>
                <p className="text-slate-500 text-xs">Boot Console v2.0</p>
              </div>
            </div>

            {/* Professional Boot Messages */}
            <div className="space-y-3 h-64 overflow-hidden mb-6">
              {bootMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
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
            </div>

            {/* Professional Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Loading system modules...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Professional Footer */}
            <div className="mt-4 text-xs text-slate-500 flex justify-between items-center">
              <span>system@devspace:~$</span>
              <span className="text-indigo-400/60">Initializing...</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
