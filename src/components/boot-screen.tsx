"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BootScreen() {
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const messages = [
    "Loading environment variables...",
    "Connecting to dev server...",
    "Fetching configs...",
    "Mounting dashboard modules...",
    "Applying themes...",
    "Boot complete. Welcome!",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setBootMessages((prev) => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl text-left font-mono text-sm text-green-400"
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-xl shadow-md">
            D
          </div>
          <span className="ml-3 text-cyan-300 tracking-wide text-base">
            DevSpace Boot Console
          </span>
        </div>

        <div className="space-y-2 h-48 overflow-hidden">
          {bootMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-green-400"
            >
              {msg}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-6"
        />

        <div className="mt-3 text-xs text-gray-400">
          system@devspace ~ booting...
        </div>
      </motion.div>
    </motion.div>
  );
}
