"use client";

import { motion } from "framer-motion";
import { Minus, Square, X, ChevronLeft } from "lucide-react";
import { ReactNode, useState, useEffect } from "react";

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

// Detect mobile for simplified animations
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

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
      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
      animate={{
        opacity: 1,
        scale: isMaximized ? 1.02 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: isMobile ? 10 : 20 }}
      transition={{ duration: isMobile ? 0.15 : 0.25, ease: "easeOut" }}
      className={`bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden ${className}`}
      style={{
        boxShadow: isMaximized
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          : undefined,
        willChange: "transform, opacity",
      }}
    >
      {/* Window Title Bar - macOS Style */}
      <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 border-b border-white/10 px-3 md:px-4 py-2.5 md:py-3 flex items-center justify-between backdrop-blur-xl group">
        {/* Left: Window Controls */}
        <div className="flex items-center gap-2">
          {showControls && (
            <>
              {/* Mobile: Back button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-400 hover:text-indigo-300 transition-all touch-manipulation"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Desktop: Traditional macOS dots */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors touch-manipulation"
                  style={{ boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)" }}
                  aria-label="Close window"
                >
                  <X className="w-2 h-2 text-red-900 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={onMinimize}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors touch-manipulation"
                  style={{ boxShadow: "0 2px 4px rgba(234, 179, 8, 0.3)" }}
                  aria-label="Minimize window"
                >
                  <Minus className="w-2 h-2 text-yellow-900 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={handleMaximize}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors touch-manipulation"
                  style={{ boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)" }}
                  aria-label="Maximize window"
                >
                  <Square className="w-2 h-2 text-green-900 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Center: Window Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-1.5 sm:space-x-2.5 max-w-[50%] sm:max-w-[60%]">
          {icon && <div className="flex-shrink-0 hidden sm:block">{icon}</div>}
          <div className="text-center min-w-0 flex-1">
            <h3
              className={`text-xs sm:text-sm font-semibold bg-gradient-to-r ${
                gradientMap[accentColor] || gradientMap.cyan
              } bg-clip-text text-transparent drop-shadow-sm truncate`}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="text-[9px] sm:text-[10px] text-gray-500 font-mono mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Additional Controls (placeholder for symmetry) */}
        <div className="w-16 flex items-center justify-end">
          {/* Status indicator - Simplified animation */}
          <div
            className="w-2 h-2 rounded-full bg-green-400"
            style={{
              boxShadow: "0 2px 8px rgba(74, 222, 128, 0.5)",
              animation: isMobile ? "none" : "pulse 2s ease-in-out infinite",
            }}
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
