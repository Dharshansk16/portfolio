"use client";

import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { ReactNode, useState } from "react";

interface OSWindowProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
  accentColor?: string;
}

export default function OSWindow({
  title,
  subtitle,
  icon,
  onClose,
  onMinimize,
  onMaximize,
  children,
  className = "",
  showControls = true,
  accentColor = "cyan",
}: OSWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const gradientMap: Record<string, string> = {
    cyan: "from-cyan-400 via-blue-400 to-indigo-400",
    purple: "from-purple-400 via-violet-400 to-fuchsia-400",
    green: "from-green-400 via-emerald-400 to-teal-400",
    orange: "from-orange-400 via-amber-400 to-yellow-400",
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{
        opacity: 1,
        scale: isMaximized ? 1.02 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden ${className}`}
      style={{
        boxShadow: isMaximized
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          : undefined,
      }}
    >
      {/* Window Title Bar - macOS Style */}
      <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 border-b border-white/10 px-3 md:px-4 py-2.5 md:py-3 flex items-center justify-between backdrop-blur-xl group">
        {/* Left: Window Controls */}
        <div className="flex items-center">
          {showControls && (
            <>
              {/* Mobile: Simple horizontal lines indicator */}
              <div className="md:hidden flex flex-col gap-0.5 opacity-50">
                <div className="w-3 h-0.5 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"></div>
                <div className="w-3 h-0.5 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"></div>
              </div>

              {/* Desktop: Traditional macOS dots */}
              <div className="hidden md:flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50 group-hover:shadow-xl group-hover:shadow-red-500/60 relative transition-all touch-manipulation"
                  aria-label="Close window"
                >
                  <X className="w-2 h-2 text-red-900 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onMinimize}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-yellow-500/50 group-hover:shadow-xl group-hover:shadow-yellow-500/60 relative transition-all touch-manipulation"
                  aria-label="Minimize window"
                >
                  <Minus className="w-2 h-2 text-yellow-900 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMaximize}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/50 group-hover:shadow-xl group-hover:shadow-green-500/60 relative transition-all touch-manipulation"
                  aria-label="Maximize window"
                >
                  <Square className="w-2 h-2 text-green-900 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>
            </>
          )}
        </div>

        {/* Center: Window Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2.5">
          {icon && (
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              {icon}
            </motion.div>
          )}
          <div className="text-center">
            <h3
              className={`text-sm font-semibold bg-gradient-to-r ${
                gradientMap[accentColor] || gradientMap.cyan
              } bg-clip-text text-transparent drop-shadow-sm`}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Additional Controls (placeholder for symmetry) */}
        <div className="w-16 flex items-center justify-end">
          {/* Status indicator */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
          />
        </div>
      </div>

      {/* Window Content */}
      <div className="relative">{children}</div>

      {/* Window Resize Handle (bottom-right corner) */}
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize group">
        <svg
          className="w-full h-full text-gray-600 opacity-0 group-hover:opacity-50 transition-opacity"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            d="M14 14L14 10M14 14L10 14M14 14L8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
