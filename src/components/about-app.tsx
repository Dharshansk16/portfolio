"use client";

import { memo, useState, useEffect} from"react";
import { motion} from"framer-motion";
import { User, Code2, ChevronLeft} from"lucide-react";
import { FaGithub, FaLinkedin} from"react-icons/fa";
import { skills, techGroups, stats, aboutMeText} from"@/constants/about";

interface AboutAppProps {
 onBack: () => void;
}

const isMobileDevice = () => {
 if (typeof window ==="undefined") return false;
 return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

function AboutApp({ onBack}: AboutAppProps) {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
 setIsMobile(isMobileDevice());
}, []);

  return (
  <div className="min-h-screen w-full bg-white dark:bg-black overflow-y-auto px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto py-12 sm:py-20">
  {/* Minimalist Back Button */}
  <div className="mb-12">
  <button
  onClick={onBack}
  className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm text-sm font-medium"
  aria-label="Back to Dashboard"
  >
  <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
  </button>
  </div>
  {/* Header Section */}
  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6}}
  className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-16"
  >
  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-black dark:bg-white flex items-center justify-center text-5xl sm:text-6xl font-black text-white dark:text-black shrink-0 shadow-2xl">
  D
  </div>
  
  <div className="text-center md:text-left flex-1">
  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
  Dharshan S Kotian
  </h1>
  <p className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-6">
  Full Stack Developer bridging the gap between design and scalable engineering.
  </p>
  <div className="flex flex-wrap justify-center md:justify-start gap-4">
  <a
  href="https://github.com/Dharshansk16"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-sm"
  >
  <FaGithub className="w-4 h-4 mr-2" /> GitHub
  </a>
  <a
  href="https://www.linkedin.com/in/dharshan-s-kotian-5053aa280/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-sm"
  >
  <FaLinkedin className="w-4 h-4 mr-2" /> LinkedIn
  </a>
  <a
  href="https://leetcode.com/u/Dharshan_S_Kotian/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-sm"
  >
  <Code2 className="w-4 h-4 mr-2" /> LeetCode
  </a>
  </div>
  </div>
  </motion.div>

  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.2}}
  className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 mb-16"
  />

  {/* About Me Prose */}
  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.3}}
  className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 mb-16"
  >
  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Background</h2>
  <p className="leading-relaxed text-lg">
  {aboutMeText}
  </p>
  </motion.div>

  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.35}}
  className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 mb-16"
  />

  {/* Minimalist Stats/Experience */}
  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.4}}
  className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16"
  >
  {stats.map((stat, index) => (
  <div key={stat.label} className="flex flex-col border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
  <div className="flex items-center space-x-3 mb-2">
  <stat.icon className="w-5 h-5 text-zinc-400" />
  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
  {stat.label}
  </div>
  </div>
  <div className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-2 leading-tight">
  {stat.value}
  </div>
  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
  {stat.description}
  </p>
  </div>
  ))}
  </motion.div>

  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.45}}
  className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 mb-16"
  />

  <div className="flex flex-col space-y-16 mb-16">
  {/* Skills */}
  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.5}}
  >
  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Core Competencies</h2>
  <div className="space-y-6">
  {skills.map((skill, index) => (
  <div key={skill.name}>
  <div className="flex justify-between text-sm font-semibold text-zinc-900 dark:text-white mb-2">
  <span>{skill.name}</span>
  <span className="text-zinc-500">{skill.level}%</span>
  </div>
  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1.5 rounded-full overflow-hidden">
  <motion.div
  initial={{ width: 0}}
  whileInView={{ width:`${skill.level}%`}}
  viewport={{ once: true}}
  transition={{ duration: 1, ease:"easeOut"}}
  className="h-full bg-black dark:bg-white rounded-full"
  />
  </div>
  </div>
  ))}
  </div>
  </motion.div>

  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.55}}
  className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"
  />

  {/* Tech Arsenal */}
  <motion.div
  initial={{ opacity: 0, y: 20}}
  animate={{ opacity: 1, y: 0}}
  transition={{ duration: 0.6, delay: 0.6}}
  >
  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Technology Stack</h2>
  <div className="space-y-8">
  {Object.entries(techGroups).map(([group, techs]) => (
  <div key={group}>
  <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-widest">
  {group}
  </h4>
  <div className="flex flex-wrap gap-2">
  {techs.map((tech) => (
  <span
  key={tech}
  className="px-3 py-1 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-medium"
  >
  {tech}
  </span>
  ))}
  </div>
  </div>
  ))}
  </div>
  </motion.div>
  </div>
  </div>
  </div>
  );
}

export default memo(AboutApp);
