"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  ExternalLink,
  Home,
  Mail,
  Moon,
  Sun,
  Terminal,
  Zap,
} from "lucide-react";

interface ContextMenuItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export default function ContextMenu() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const menuItems: ContextMenuItem[] = [
    {
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      shortcut: "⌘H",
    },
    {
      label: "Contact",
      icon: <Mail className="w-4 h-4" />,
      action: () => console.log("Open contact"),
      shortcut: "⌘K",
    },
    {
      label: "Toggle Theme",
      icon: isDarkMode ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      ),
      action: () => setIsDarkMode(!isDarkMode),
      shortcut: "⌘T",
    },
    {
      label: "Copy URL",
      icon: <Copy className="w-4 h-4" />,
      action: () => navigator.clipboard.writeText(window.location.href),
      shortcut: "⌘C",
    },
    {
      label: "Open Console",
      icon: <Terminal className="w-4 h-4" />,
      action: () => console.log("🚀 DevSpace OS Console"),
      shortcut: "⌘J",
    },
    {
      label: "Portfolio Repo",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () =>
        window.open("https://github.com/yourusername/portfolio", "_blank"),
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            zIndex: 9999,
          }}
          className="min-w-[240px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-2 border-b border-indigo-500/20 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300">
                DevSpace Menu
              </span>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    item.action();
                    setIsVisible(false);
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-indigo-500/20 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-sm text-white group-hover:text-indigo-200 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  {item.shortcut && (
                    <span className="text-xs text-slate-500 group-hover:text-slate-400 font-mono">
                      {item.shortcut}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-indigo-500/20 text-xs text-slate-500 text-center">
              Right-click anywhere for menu
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
