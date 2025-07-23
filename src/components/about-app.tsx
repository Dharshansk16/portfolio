"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { skills, techGroups, stats, aboutMeText } from "@/constants/about";

interface AboutAppProps {
  onBack: () => void;
}

export default function AboutApp({ onBack }: AboutAppProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "linear" }}
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
        <div className="bg-black/50 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-5xl font-bold text-black shadow-lg">
              D
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Dharshan S Kotian
              </h2>
              <p className="text-cyan-400 font-mono mt-1 text-sm md:text-base">
                Full Stack Developer
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-2xl text-sm md:text-base">
              {aboutMeText}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a
                href="https://github.com/Dharshansk16"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-400 hover:text-white transition"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dharshan-s-kotian-5053aa280/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-500 hover:text-white transition"
              >
                LinkedIn
              </a>
              <a
                href="https://leetcode.com/u/Dharshan_S_Kotian/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-400 hover:text-black transition"
              >
                LeetCode
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-black/50 border border-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:border-cyan-500/40"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className={`text-2xl font-bold pb-2 ${stat.color}`}>
                {stat.label}
              </div>
              <p className="text-gray-400 text-sm">{stat.value}</p>
              <p className="text-sm text-muted-foreground py-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-black/50 border border-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm md:text-lg text-gray-300 mb-1">
                  <span>{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 md:h-4">
                  <div
                    className={`h-3 md:h-4 rounded-full ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/50 border border-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Tech Stack</h3>
          <div className="space-y-4">
            {Object.entries(techGroups).map(([group, techs]) => (
              <div key={group}>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
