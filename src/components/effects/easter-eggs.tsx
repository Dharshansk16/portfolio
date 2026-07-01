"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Clock, Calendar, Palette, Trash2, HelpCircle, X } from "lucide-react";

type CommandResult = {
  message: string;
  action?: () => void;
};

const SECRET_COMMANDS: { [key: string]: CommandResult } = {
  time: {
    message: `Current time: ${new Date().toLocaleTimeString()}`,
  },
  date: {
    message: `Today is: ${new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
  },
  clear: {
    message: "Terminal: Display cleared successfully",
  },
  help: {
    message: "System Help: Available commands - time, date, theme, clear, help",
  },
  theme: {
    message: "Appearance: Theme preferences updated",
    action: () => toggleTheme(),
  },
};

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function getCommandResult(cmd: string): CommandResult {
  if (cmd === "time") {
    return { message: `Current time: ${new Date().toLocaleTimeString()}` };
  }
  if (cmd === "date") {
    return {
      message: `Today is: ${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`,
    };
  }
  return SECRET_COMMANDS[cmd];
}

export default function EasterEggs() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [typedCommand, setTypedCommand] = useState("");
  const [commandMode, setCommandMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const commandEntries = useMemo(
    () => ({
      time: { icon: Clock, label: "Current Time", desc: "Show system time" },
      date: { icon: Calendar, label: "Today's Date", desc: "Show system date" },
      theme: { icon: Palette, label: "Toggle Theme", desc: "Switch appearance" },
      clear: { icon: Trash2, label: "Clear Console", desc: "Reset output" },
      help: { icon: HelpCircle, label: "Help", desc: "List commands" },
    }),
    []
  );

  const triggerEasterEgg = useCallback((msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }, []);

  const checkCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase();
      const commandResult = getCommandResult(trimmedCmd);

      if (commandResult) {
        triggerEasterEgg(commandResult.message);
        if (commandResult.action) commandResult.action();
      } else {
        triggerEasterEgg(`Command Error: '${cmd}' not recognized. Type 'help' for available commands`);
      }
    },
    [triggerEasterEgg]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setCommandMode(true);
        return;
      }
      if (commandMode && e.key === "Escape") {
        setCommandMode(false);
        setTypedCommand("");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [commandMode]);

  const isMobile = typeof window !== "undefined" && /Mobile|Android|iPhone/i.test(navigator.userAgent);

  return (
    <>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 400, y: isMobile ? -50 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : 400, y: isMobile ? -50 : 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${isMobile ? 'top-4 left-4 right-4' : 'top-20 right-6 w-96'} z-[100]`}
          >
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden p-4 flex items-start space-x-3">
              <Terminal className="w-5 h-5 text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-bold text-sm mb-1">
                  {message.split(":")[0] || message.split(".")[0]}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 text-xs">
                  {message.includes(":")
                    ? message.split(":").slice(1).join(":").trim()
                    : message.includes(".")
                    ? message.split(".").slice(1).join(".").trim() || "Executed successfully"
                    : "Executed successfully"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {commandMode && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 15 : 100 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500" />
                  <span className="text-xs text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-bold uppercase tracking-widest">
                    Developer Console
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCommandMode(false);
                    setTypedCommand("");
                  }}
                  className="text-zinc-500 hover:text-slate-800 dark:hover:text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  ESC
                </button>
              </div>
              <div className="flex items-center space-x-2 font-mono bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2">
                <span className="text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-bold">$</span>
                <input
                  type="text"
                  value={typedCommand}
                  onChange={(e) => setTypedCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      checkCommand(typedCommand);
                      setTypedCommand("");
                      setCommandMode(false);
                    } else if (e.key === "Escape") {
                      setCommandMode(false);
                      setTypedCommand("");
                    }
                  }}
                  autoFocus
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 outline-none placeholder-zinc-400 dark:placeholder-zinc-600 text-sm"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-0"
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="border-b border-zinc-100 dark:border-zinc-900 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Terminal className="w-5 h-5 text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500" />
                  <h3 className="text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-bold text-lg">
                    Developer Tools
                  </h3>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-slate-800 dark:hover:text-white transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-2">
                {Object.entries(commandEntries).map(([cmd, info]) => {
                  const Icon = info.icon;
                  return (
                    <button
                      key={cmd}
                      onClick={() => {
                        const commandResult = getCommandResult(cmd);
                        if (commandResult) {
                          triggerEasterEgg(commandResult.message);
                          if (commandResult.action) commandResult.action();
                        }
                        setShowMobileMenu(false);
                      }}
                      className="flex items-center space-x-4 w-full bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/50 p-3 rounded-xl transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-bold text-sm">
                          {info.label}
                        </p>
                        <p className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 text-xs font-mono">
                          {cmd}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
