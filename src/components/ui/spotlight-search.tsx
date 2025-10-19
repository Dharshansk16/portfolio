"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Briefcase,
  User,
  FileText,
  Mail,
} from "lucide-react";
import type { AppType } from "@/app/page";

interface SpotlightSearchProps {
  onNavigate: (app: AppType) => void;
  onContactOpen: () => void;
}

const searchItems = [
  {
    id: "projects",
    name: "Projects",
    icon: Briefcase,
    category: "Navigate",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "about",
    name: "About Me",
    icon: User,
    category: "Navigate",
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    id: "blog",
    name: "Blog",
    icon: FileText,
    category: "Navigate",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "resume",
    name: "Resume",
    icon: FileText,
    category: "Navigate",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    category: "Action",
    color: "from-green-500 to-emerald-600",
  },
];

export default function SpotlightSearch({
  onNavigate,
  onContactOpen,
}: SpotlightSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (id: string) => {
      if (id === "contact") {
        onContactOpen();
      } else {
        onNavigate(id as AppType);
      }
      setIsOpen(false);
      setQuery("");
      setSelectedIndex(0);
    },
    [onContactOpen, onNavigate]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      // ESC to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }

      if (isOpen) {
        // Arrow navigation
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
        }

        // Enter to select
        if (e.key === "Enter" && filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleSelect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 px-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            {/* Search Box */}
            <div className="bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center px-4 py-4 border-b border-indigo-500/20">
                <Search className="w-5 h-5 text-indigo-400 mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search for projects, pages, or actions..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-2 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredItems.length > 0 ? (
                  <div className="py-2">
                    {filteredItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSelect(item.id)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                            selectedIndex === index
                              ? "bg-indigo-500/20"
                              : "hover:bg-indigo-500/10"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="text-white font-medium">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {item.category}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-indigo-400" />
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-slate-500">No results found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-indigo-500/20 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                    ⌘K
                  </kbd>
                  <span>to open</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
