"use client";

import { motion } from "framer-motion";
import { Briefcase, FileText, User, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
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

const terminalCommand = "> select_application()";

export default function Dashboard({ onAppOpen }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className="text-4xl md:text-6xl py-2 font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4"
        >
          My DevSpace
        </motion.h1>
        <p className="text-gray-400 text-lg font-mono">{terminalCommand}</p>
      </motion.div>

      {/* App Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {apps.map((app) => (
          <motion.div
            key={app.id}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              },
            }}
            whileHover={{
              scale: 1.1,
              y: -8,
              transition: { type: "tween", duration: 0.15, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAppOpen(app.id)}
            className="cursor-pointer group"
          >
            <div className="relative">
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${app.color} p-4 shadow-xl backdrop-blur-sm border border-white/10 group-hover:shadow-cyan-500/30 transition-all duration-200 ease-in-out`}
              >
                <app.icon className="w-full h-full text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-center mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              {app.name}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Terminal Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 font-mono shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400 text-sm ml-4">
              darsh@devspace:~$
            </span>
          </div>
          <div className="flex items-center">
            <Terminal className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-cyan-400">{terminalCommand}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
