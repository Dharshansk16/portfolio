"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Code, Coffee, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutAppProps {
  onBack: () => void;
}

const stats = [
  {
    label: "Lines of Code",
    value: "20,000+",
    icon: Code,
    color: "text-cyan-400",
  },
  {
    label: "Cups of Coffee",
    value: "500+",
    icon: Coffee,
    color: "text-orange-400",
  },
  {
    label: "Projects Built",
    value: "15+",
    icon: Zap,
    color: "text-purple-400",
  },
  { label: "Years Learning", value: "3+", icon: Heart, color: "text-pink-400" },
];

const skills = [
  { name: "python", level: 90, color: "bg-yellow-500" },
  { name: "django", level: 80, color: "bg-green-500" },
  { name: "React", level: 85, color: "bg-blue-500" },
  { name: "Next.js", level: 80, color: "bg-gray-500" },
  { name: "TypeScript", level: 75, color: "bg-blue-600" },
  { name: "TailwindCSS", level: 90, color: "bg-cyan-500" },
  { name: "Node.js", level: 70, color: "bg-green-500" },
  { name: "MongoDB", level: 65, color: "bg-green-600" },
  { name: "PostgreSQL", level: 70, color: "bg-purple-500" },
  { name: "Git", level: 80, color: "bg-orange-500" },
  { name: "Docker", level: 60, color: "bg-blue-700" },
];

const techStack = [
  "django",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "TailwindCSS",
  "Prisma",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
  "AWS",
];

export default function AboutApp({ onBack }: AboutAppProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-cyan-400">About Me</h1>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-3xl font-bold text-black">
              D
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Dharshan</h2>
            <p className="text-cyan-400 font-mono">Full Stack Developer</p>
          </div>

          <p className="text-gray-300 text-center mb-6">
            Passionate fresher developer with a love for creating beautiful,
            functional web applications. Always eager to learn new technologies
            and solve complex problems.
          </p>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Location:</span>
              <span className="text-white">India</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Experience:</span>
              <span className="text-white">Fresher</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Favorite Editor:</span>
              <span className="text-white">VS Code</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current Focus:</span>
              <span className="text-white">React & Next.js</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-cyan-500/50 transition-all duration-300"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className={`h-2 rounded-full ${skill.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30 hover:border-cyan-400 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
