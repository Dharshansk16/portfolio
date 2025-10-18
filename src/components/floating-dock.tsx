"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Download, ArrowUp, Sparkles, X } from "lucide-react";
import { useState } from "react";
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

  const dockItems = [
    {
      icon: MessageCircle,
      label: "Contact Me",
      action: onContactOpen,
      color: "from-blue-500 to-cyan-500",
      emoji: "💬",
    },
    {
      icon: Download,
      label: "Resume",
      action: () => window.open("/resume.pdf", "_blank"),
      color: "from-green-500 to-emerald-500",
      emoji: "📄",
    },
    {
      icon: ArrowUp,
      label: "Scroll Top",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      color: "from-purple-500 to-pink-500",
      emoji: "🚀",
    },
    {
      icon: showParticles ? Sparkles : X,
      label: showParticles ? "Hide Effects" : "Show Effects",
      action: onParticlesToggle,
      color: "from-orange-500 to-red-500",
      emoji: showParticles ? "✨" : "🌟",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      onTouchStart={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col-reverse items-end gap-3">
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
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 50, 
                  scale: 0.5,
                  transition: {
                    duration: 0.2,
                  }
                }}
                className="flex items-center gap-3 group"
              >
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.08 + 0.1 }}
                  className="bg-black/90 backdrop-blur-xl text-white text-sm font-medium px-4 py-2.5 rounded-xl border border-white/20 shadow-xl flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
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
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} hover:shadow-2xl transition-all duration-300 border border-white/20`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing Glow */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <Button
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 hover:shadow-2xl transition-all duration-300 border-2 border-white/30"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {isExpanded ? (
                <X className="w-7 h-7 text-white" />
              ) : (
                <Sparkles className="w-7 h-7 text-white" />
              )}
            </motion.div>
          </Button>
          
          {/* Notification Badge */}
          {!isExpanded && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-black flex items-center justify-center"
            >
              <span className="text-xs text-white font-bold">{dockItems.length}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
