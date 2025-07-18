"use client";

import { motion } from "framer-motion";
import { Briefcase, FileText, User, Terminal } from "lucide-react";
import { useState } from "react";
import type { AppType } from "@/app/page";

interface DashboardProps {
  onAppOpen: (app: AppType) => void;
}

const apps = [
  {
    id: "projects" as AppType,
    name: "Projects",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "blog" as AppType,
    name: "Blog",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "about" as AppType,
    name: "About",
    icon: User,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "resume" as AppType,
    name: "Resume",
    icon: FileText,
    color: "from-orange-500 to-red-500",
  },
];

export default function Dashboard({ onAppOpen }: DashboardProps) {
  const [terminalText, setTerminalText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
          My DevSpace
        </h1>
        <p className="text-gray-400 text-lg font-mono">
          {"> select_application()"}
        </p>
      </motion.div>

      {/* App Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAppOpen(app.id)}
            className="cursor-pointer group"
          >
            <div className="relative">
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${app.color} p-4 shadow-lg backdrop-blur-sm border border-white/10 group-hover:shadow-2xl group-hover:shadow-cyan-500/25 transition-all duration-300`}
              >
                <app.icon className="w-full h-full text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-center mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              {app.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Terminal Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 font-mono">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm ml-4">
              dharshan@devspace:~$
            </span>
          </div>
          <div className="flex items-center">
            <Terminal className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-cyan-400">
              {terminalText}
              <span className="animate-pulse">_</span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
