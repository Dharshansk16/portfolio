"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Download, ArrowUp, Sparkles, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface FloatingDockProps {
  onContactOpen: () => void;
  onParticlesToggle: () => void;
  showParticles: boolean;
}

export default function FloatingDock({
  onContactOpen,
  onParticlesToggle,
  showParticles,
}: FloatingDockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  // Close dock when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isExpanded]);

  const dockItems = [
    {
      icon: MessageCircle,
      label: "Contact Me",
      action: onContactOpen,
      color: "from-indigo-500 to-blue-600",
      emoji: "💬",
    },
    {
      icon: Download,
      label: "Resume",
      action: () => window.open("/resume.pdf", "_blank"),
      color: "from-violet-500 to-purple-600",
      emoji: "📄",
    },
    {
      icon: ArrowUp,
      label: "Scroll Top",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      color: "from-purple-500 to-fuchsia-600",
      emoji: "🚀",
    },
    {
      icon: showParticles ? Sparkles : X,
      label: showParticles ? "Hide Effects" : "Show Effects",
      action: onParticlesToggle,
      color: "from-blue-500 to-indigo-600",
      emoji: showParticles ? "✨" : "🌟",
    },
  ];

  // Don't render floating dock on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={dockRef}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <div className="flex flex-col-reverse items-end gap-2 sm:gap-3 pb-safe">
          {/* Dock Items */}
          <AnimatePresence>
            {isExpanded &&
              dockItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 50, scale: 0.5, rotate: 10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.08,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: 50,
                    scale: 0.5,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  className="flex items-center gap-2 sm:gap-3 group"
                >
                  {/* Professional Label */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.08 + 0.1 }}
                    className="bg-slate-950/90 backdrop-blur-xl text-white text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-indigo-500/30 shadow-xl shadow-indigo-500/10 flex items-center gap-2 whitespace-nowrap"
                  >
                    <span className="text-sm sm:text-base">{item.emoji}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label}</span>
                  </motion.div>

                  {/* Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r ${item.color} rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <Button
                      size="icon"
                      onClick={item.action}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} hover:shadow-2xl transition-all duration-300 border border-white/20 touch-manipulation`}
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Professional Main Toggle Button */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Professional Pulsing Glow */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-full blur-xl opacity-50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <Button
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 border-2 border-white/30 touch-manipulation"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {isExpanded ? (
                  <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                ) : (
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                )}
              </motion.div>
            </Button>

            {/* Professional Notification Badge */}
            {!isExpanded && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg"
              >
                <span className="text-xs text-white font-bold">
                  {dockItems.length}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
