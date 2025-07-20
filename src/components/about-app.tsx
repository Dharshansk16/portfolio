"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Brain, Palette, Server, Users, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutAppProps {
  onBack: () => void;
}

const stats = [
  {
    label: "Problem Solving",
    value: "400+ Leetode Problems Solved",
    description:
      "Strong analytical skills honed through competitive programming and algorithmic thinking.",
    icon: Brain,
    color: "text-blue-500",
  },
  {
    label: "Leadership & Mentorship",
    value: "CP Team Lead",
    description:
      "Led coding club initiatives, mentored juniors, and organized contests and workshops.",
    icon: Users,
    color: "text-purple-500",
  },
  {
    label: "Backend Development",
    value: "Robust API Systems",
    description:
      "Built secure, scalable backends using Django, REST, PostgreSQL, Prisma, and auth systems.",
    icon: Server,
    color: "text-green-500",
  },
  {
    label: "Developer Journey",
    value: "3+ Years Learning",
    description:
      "Continual growth in full-stack dev, system design, and software craftsmanship.",
    icon: Flame,
    color: "text-orange-500",
  },
];

const skills = [
  { name: "Problem Solving", level: 90, color: "bg-yellow-500" },
  { name: "Frontend", level: 80, color: "bg-green-500" },
  { name: "Backend", level: 85, color: "bg-blue-500" },
  { name: "UI/UX", level: 80, color: "bg-gray-500" },
  { name: "DevOps", level: 75, color: "bg-blue-600" },
];

const techGroups = {
  "Core Languages": ["Python", "TypeScript", "C++"],
  "Frontend Tools": ["React", "Next.js", "TailwindCSS"],
  "Backend & DB": [
    "Django",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
  ],
  "DevOps & Utilities": ["Docker", "Git", "GitHub", "Vercel"],
};

export default function AboutApp({ onBack }: AboutAppProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 space-y-12"
    >
      <div className="flex items-center justify-between mb-6">
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
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8"
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-4xl font-bold text-black shadow-lg">
              D
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Dharshan S Kotian
            </h2>
            <p className="text-cyan-400 font-mono text-sm md:text-base">
              Full Stack Developer
            </p>
          </div>

          <p className="text-gray-300 text-center mb-6 text-sm md:text-base leading-relaxed">
            I'm a passionate full-stack developer who enjoys turning ideas into
            real-world solutions. I thrive in clean code, collaborative teams,
            and cutting-edge stacks.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm md:text-base text-white">
            <div>
              <span className="text-gray-400">📍 Location:</span>{" "}
              <span className="font-medium">India</span>
            </div>
            <div>
              <span className="text-gray-400">🎓 Experience:</span>{" "}
              <span className="font-medium">Fresher</span>
            </div>
            <div>
              <span className="text-gray-400">🛠️ Technical Stack:</span>{" "}
              <span className="font-medium"> React, Next.js, Django</span>
            </div>
            <div>
              <span className="text-gray-400">📚 Learning:</span>{" "}
              <span className="font-medium">Next.js & System Design</span>
            </div>
            <div>
              <span className="text-gray-400">🎯 Interests:</span>{" "}
              <span className="font-medium">Real-World Problem Solving</span>
            </div>
            <div>
              <span className="text-gray-400">💡 Strengths:</span>{" "}
              <span className="font-medium">Problem Solving, Teamwork</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-black/50 border border-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:border-cyan-500/40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className={`text-2xl font-bold pb-2 ${stat.color}`}>
                {stat.label}
              </div>
              <p className="text-gray-400 text-sm">{stat.value}</p>
              <p className="text-sm text-muted-foreground py-2">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
      >
        <motion.div
          className="bg-black/50 border border-white/10 backdrop-blur-sm rounded-xl p-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm md:text-lg text-gray-300 mb-1">
                  <span>{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 md:h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{
                      delay: 0.2,
                      duration: 1,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                    className={`h-3 md:h-4 rounded-full ${skill.color}`}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          className="bg-black/50 border border-white/10 backdrop-blur-sm rounded-xl p-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Tech Stack</h3>
          <div className="space-y-4">
            {Object.entries(techGroups).map(([group, techs], i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-cyan-400 font-semibold mb-2">{group}</h4>
                <div className="flex flex-wrap gap-3">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-2 bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 rounded-full text-sm hover:border-cyan-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
