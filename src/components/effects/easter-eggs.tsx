"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Terminal } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type CommandResult = {
  message: string;
  action?: () => void;
};

// Move quotes array and function before SECRET_COMMANDS
const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Code is like humor. When you have to explain it, it's bad. - Cory House",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "Talk is cheap. Show me the code. - Linus Torvalds",
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

const SECRET_COMMANDS: { [key: string]: CommandResult } = {
  matrix: {
    message: "Matrix Effect: Animation started successfully",
    action: () => startMatrixRain(),
  },
  hack: {
    message: "Security Access: Elevated privileges granted",
    action: () => startHackingEffect(),
  },
  developer: {
    message: "Developer Mode: Advanced features enabled",
  },
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
  rainbow: {
    message: "Visual Effects: Rainbow gradient mode activated",
    action: () => activateRainbowMode(),
  },
  clear: {
    message: "Terminal: Display cleared successfully",
  },
  help: {
    message:
      "System Help: Available commands - matrix, hack, developer, time, date, rainbow, theme, confetti, quote, clear, help",
  },
  theme: {
    message: "Appearance: Theme preferences updated",
    action: () => toggleTheme(),
  },
  confetti: {
    message: "Celebration Mode: Confetti effect triggered",
    action: () => triggerConfetti(),
  },
};

let matrixInterval: NodeJS.Timeout | null = null;
let hackingInterval: NodeJS.Timeout | null = null;

function startMatrixRain() {
  if (matrixInterval) return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;
  const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops: number[] = Array(Math.floor(columns)).fill(1);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }, 50);

  setTimeout(() => {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
      document.body.removeChild(canvas);
    }
  }, 5000);
}

function startHackingEffect() {
  if (hackingInterval) return;

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.fontFamily = "monospace";
  overlay.style.color = "#0F0";
  overlay.style.fontSize = "20px";
  overlay.style.pointerEvents = "none";
  document.body.appendChild(overlay);

  let text = "";
  const messages = [
    "INITIALIZING HACK SEQUENCE...",
    "BYPASSING FIREWALL...",
    "DECRYPTING PASSWORD...",
    "ACCESSING MAINFRAME...",
    "DOWNLOADING DATA...",
    "HACK COMPLETE! 💻",
  ];
  let messageIndex = 0;

  hackingInterval = setInterval(() => {
    if (messageIndex < messages.length) {
      text += messages[messageIndex] + "\n";
      overlay.textContent = text;
      messageIndex++;
    } else {
      if (hackingInterval) {
        clearInterval(hackingInterval);
        hackingInterval = null;
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 1000);
      }
    }
  }, 500);
}

function activateRainbowMode() {
  const style = document.createElement("style");
  style.id = "rainbow-mode";
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    body { animation: rainbow 3s linear infinite; }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    const rainbowStyle = document.getElementById("rainbow-mode");
    if (rainbowStyle) {
      document.head.removeChild(rainbowStyle);
    }
  }, 5000);
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function triggerConfetti() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.top = "-10px";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = "9999";
    confetti.style.pointerEvents = "none";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);

    const animation = confetti.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${(Math.random() - 0.5) * 200}px, ${
            window.innerHeight
          }px) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 3000 + Math.random() * 2000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    );

    animation.onfinish = () => {
      document.body.removeChild(confetti);
    };
  }
}

// Update the time and date commands dynamically
function getCommandResult(cmd: string): CommandResult {
  if (cmd === "time") {
    return {
      message: `Current time: ${new Date().toLocaleTimeString()}`,
    };
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
  if (cmd === "quote") {
    return {
      message: getRandomQuote(),
    };
  }
  return SECRET_COMMANDS[cmd];
}

export default function EasterEggs() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const [typedCommand, setTypedCommand] = useState("");
  const [commandMode, setCommandMode] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Konami Code Detection
      setKonamiProgress((prev) => {
        const newProgress = [...prev, e.key];
        if (newProgress.length > KONAMI_CODE.length) {
          newProgress.shift();
        }

        if (
          newProgress.length === KONAMI_CODE.length &&
          newProgress.every((key, i) => key === KONAMI_CODE[i])
        ) {
          triggerEasterEgg("Achievement Unlocked: Konami Code master detected");
          return [];
        }

        return newProgress;
      });

      // Command Mode (Ctrl + `)
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setCommandMode(true);
        return;
      }

      if (commandMode) {
        if (e.key === "Escape") {
          setCommandMode(false);
          setTypedCommand("");
        } else if (e.key === "Enter") {
          checkCommand(typedCommand);
          setTypedCommand("");
          setCommandMode(false);
        } else if (e.key === "Backspace") {
          setTypedCommand((prev) => prev.slice(0, -1));
        } else if (e.key.length === 1) {
          setTypedCommand((prev) => prev + e.key);
        }
      }

      // Secret key combinations
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        triggerEasterEgg("Developer Mode: Advanced debugging features enabled");
      }
    };

    const checkCommand = (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase();
      const commandResult = getCommandResult(trimmedCmd);

      if (commandResult) {
        triggerEasterEgg(commandResult.message);
        // Execute the action if it exists
        if (commandResult.action) {
          commandResult.action();
        }
      } else {
        triggerEasterEgg(
          `Command Error: '${cmd}' not recognized. Type 'help' for available commands`
        );
      }
    };

    const triggerEasterEgg = (msg: string) => {
      setMessage(msg);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [konamiProgress, commandMode, typedCommand]);

  return (
    <>
      {/* OS-Style System Notification */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-20 right-6 z-[100] w-96 max-w-[calc(100vw-3rem)]"
          >
            {/* macOS-style notification */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Notification header */}
              <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 px-4 py-2 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/90 font-semibold text-sm">
                      System
                    </span>
                  </div>
                  <span className="text-white/50 text-xs font-medium">now</span>
                </div>
              </div>

              {/* Notification body */}
              <div className="bg-slate-900/95 px-4 py-4">
                <div className="flex items-start space-x-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                  >
                    <Terminal className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-base leading-snug mb-1">
                      {message.split(":")[0] || message.split(".")[0]}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {message.includes(":")
                        ? message.split(":").slice(1).join(":").trim()
                        : message.includes(".")
                        ? message.split(".").slice(1).join(".").trim() ||
                          "Feature activated successfully"
                        : "Feature activated successfully"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle progress indicator */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Mode Terminal */}
      <AnimatePresence>
        {commandMode && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="bg-slate-950/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-indigo-300 font-semibold">
                  Secret Command Terminal
                </span>
              </div>
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-green-400">$</span>
                <span className="text-white">{typedCommand}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-indigo-400"
                >
                  █
                </motion.span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Try: matrix, hack, rainbow, confetti, quote, help • Press ESC to
                close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 left-4 text-xs text-slate-600 font-mono hidden lg:block"
      >
        <div className="flex items-center space-x-2">
          <Zap className="w-3 h-3" />
          <span>Press Ctrl + ` for secrets</span>
        </div>
      </motion.div>
    </>
  );
}
