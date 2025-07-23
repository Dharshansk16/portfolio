"use client";

import { motion } from "framer-motion";
import { MessageCircle, Download, ArrowUp, Palette } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

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
      label: "Contact",
      action: onContactOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Download,
      label: "Resume",
      action: () => window.open("/resume.pdf", "_blank"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: ArrowUp,
      label: "Scroll Top",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: showParticles ? Palette : Palette,
      label: "Particles",
      action: onParticlesToggle,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <div className="flex flex-col-reverse items-end space-y-reverse space-y-3">
        {/* Dock Items */}
        <AnimatePresence>
          {isExpanded &&
            dockItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg border border-white/20"
                >
                  {item.label}
                </motion.span>
                <Button
                  size="icon"
                  onClick={item.action}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </Button>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Main Contact Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            onClick={onContactOpen}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/25"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
