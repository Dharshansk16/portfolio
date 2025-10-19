"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X, Keyboard, Sparkles, HelpCircle } from "lucide-react";

export default function UIHints() {
  const [showTooltips, setShowTooltips] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showShortcutsPanel, setShowShortcutsPanel] = useState(false);
  const [showPersistentHint, setShowPersistentHint] = useState(true);

  useEffect(() => {
    // Check if user has seen hints before
    const hasSeenHints = localStorage.getItem("hasSeenUIHints");

    if (!hasSeenHints) {
      // Show tooltips after a delay
      const timer = setTimeout(() => {
        setShowTooltips(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    } else {
      // If they've seen it, just show the persistent hint
      setShowPersistentHint(true);
    }
  }, []);

  const dismissTooltips = () => {
    setShowTooltips(false);
    setHasInteracted(true);
    localStorage.setItem("hasSeenUIHints", "true");
  };

  useEffect(() => {
    // Auto-dismiss tooltips after 12 seconds
    if (showTooltips) {
      const timer = setTimeout(() => {
        dismissTooltips();
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [showTooltips]);

  // Keyboard shortcuts and features
  const shortcuts = [
    { key: "⌘K / Ctrl+K", description: "Quick Search", category: "Navigation" },
    {
      key: "Ctrl + `",
      description: "Secret Terminal",
      category: "Easter Eggs",
    },
    { key: "Right Click", description: "Context Menu", category: "Navigation" },
    {
      key: "Ctrl+Shift+D",
      description: "Developer Mode",
      category: "Easter Eggs",
    },
    { key: "↑↑↓↓←→←→BA", description: "Konami Code", category: "Easter Eggs" },
  ];

  const terminalCommands = [
    { command: "matrix", description: "The Matrix effect" },
    { command: "hack", description: "Hacking sequence" },
    { command: "rainbow", description: "Rainbow mode" },
    { command: "confetti", description: "Celebration!" },
    { command: "quote", description: "Random quote" },
    { command: "time", description: "Current time" },
    { command: "date", description: "Today's date" },
    { command: "theme", description: "Toggle theme" },
    { command: "help", description: "Show all commands" },
  ];

  return (
    <>
      {/* Floating Help Button - Always visible */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowShortcutsPanel(!showShortcutsPanel)}
        className="fixed top-20 right-4 z-[60] w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg border border-white/20 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
        title="Keyboard Shortcuts & Secrets"
      >
        <Keyboard className="w-5 h-5 text-white" />
      </motion.button>

      {/* Shortcuts Panel */}
      <AnimatePresence>
        {showShortcutsPanel && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-32 right-4 z-[60] w-80 max-w-[calc(100vw-2rem)]"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-[2px] rounded-2xl shadow-2xl">
              <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 max-h-[70vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-white font-bold text-lg">
                      Shortcuts & Secrets
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowShortcutsPanel(false)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="space-y-3 mb-5">
                  <h4 className="text-indigo-300 font-semibold text-sm flex items-center space-x-2">
                    <Keyboard className="w-4 h-4" />
                    <span>Keyboard Shortcuts</span>
                  </h4>
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start justify-between space-x-3 p-2 rounded-lg hover:bg-indigo-500/10 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {shortcut.description}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {shortcut.category}
                        </p>
                      </div>
                      <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-xs text-indigo-300 whitespace-nowrap">
                        {shortcut.key}
                      </kbd>
                    </motion.div>
                  ))}
                </div>

                {/* Terminal Commands */}
                <div className="space-y-3 border-t border-slate-800 pt-4">
                  <h4 className="text-purple-300 font-semibold text-sm flex items-center space-x-2">
                    <Command className="w-4 h-4" />
                    <span>Terminal Commands</span>
                  </h4>
                  <p className="text-slate-400 text-xs">
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-xs">
                      Ctrl + `
                    </kbd>{" "}
                    then type:
                  </p>
                  {terminalCommands.map((cmd, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center justify-between space-x-3 p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                    >
                      <code className="text-purple-400 text-sm font-mono">
                        {cmd.command}
                      </code>
                      <p className="text-slate-400 text-xs">
                        {cmd.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Fun fact */}
                <div className="mt-4 p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20">
                  <p className="text-xs text-indigo-300 flex items-start space-x-2">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Pro tip:</strong> Right-click anywhere on the page
                      for quick actions!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Hint - Smaller, less intrusive */}
      <AnimatePresence>
        {showPersistentHint && !showTooltips && !showShortcutsPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 z-[60] hidden lg:block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowShortcutsPanel(true)}
              className="bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-lg px-3 py-2 shadow-lg flex items-center space-x-2 group hover:bg-slate-900/95 transition-colors"
            >
              <Keyboard className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
              <span className="text-xs text-slate-400 group-hover:text-slate-300 font-medium">
                Press{" "}
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-indigo-300 font-mono text-xs border border-slate-700">
                  ⌘K
                </kbd>{" "}
                or click here
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Tooltips - Show once */}
      <AnimatePresence>
        {showTooltips && !hasInteracted && (
          <>
            {/* Main Tooltip - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="fixed bottom-8 left-8 z-[60] hidden lg:block max-w-sm"
            >
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[2px] rounded-xl shadow-2xl">
                <div className="bg-slate-950/95 backdrop-blur-xl rounded-xl px-5 py-4">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0"
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-base mb-2">
                        🎉 Welcome! Discover Hidden Features
                      </p>
                      <ul className="space-y-1 text-sm text-indigo-200 mb-3">
                        <li>
                          • Press{" "}
                          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-xs">
                            ⌘K
                          </kbd>{" "}
                          for quick search
                        </li>
                        <li>• Right-click for context menu</li>
                        <li>
                          • Try{" "}
                          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-xs">
                            Ctrl + `
                          </kbd>{" "}
                          for secrets!
                        </li>
                      </ul>
                      <button
                        onClick={() => setShowShortcutsPanel(true)}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition-all mb-2"
                      >
                        View All Shortcuts
                      </button>
                    </div>
                    <button
                      onClick={dismissTooltips}
                      className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Hint */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="fixed bottom-40 left-1/2 -translate-x-1/2 z-[60] lg:hidden max-w-[90vw]"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-[2px] rounded-xl shadow-2xl">
                <div className="bg-slate-950/95 backdrop-blur-xl rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-6 h-6 text-indigo-300 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Tap the terminal icon (bottom-right) for secret
                          commands!
                        </p>
                        <p className="text-indigo-300 text-xs">
                          Matrix, hacks, and more hidden features...
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={dismissTooltips}
                      className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
