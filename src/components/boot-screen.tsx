"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BootScreen() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Welcome to Dharshan's DevSpace";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-black"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-black">D</span>
          </div>
        </motion.div>

        <div className="font-mono text-2xl text-cyan-400">
          {text}
          <span
            className={`${
              showCursor ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            _
          </span>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 2, duration: 1 }}
          className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-8 rounded-full"
        />

        <div className="mt-4 text-sm text-gray-400 font-mono">
          Initializing developer environment...
        </div>
      </div>
    </motion.div>
  );
}
