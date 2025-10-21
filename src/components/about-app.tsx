"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import OSWindow from "@/components/ui/os-window";
import { skills, techGroups, stats, aboutMeText } from "@/constants/about";

interface AboutAppProps {
  onBack: () => void;
}

// Detect mobile for simplified animations
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

function AboutApp({ onBack }: AboutAppProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className="min-h-screen relative pt-12 pb-24 sm:pb-28 px-2 sm:px-4 md:px-6">
      <OSWindow
        title="About Me"
        subtitle="~/portfolio/about"
        icon={<User className="w-5 h-5" />}
        onClose={onBack}
        accentColor="purple"
        className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)]"
      >
        <div className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin p-3 sm:p-4 md:p-6">
          {/* Two Column Layout - Better space utilization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Left Column - Profile (1/3 width) */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: isMobile ? 0 : 0.05,
                duration: isMobile ? 0.2 : 0.3,
              }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-xl hover:shadow-purple-500/20 transition-shadow sticky top-0">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <motion.div
                    initial={{ scale: isMobile ? 1 : 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: isMobile ? 0 : 0.1,
                      duration: isMobile ? 0.15 : 0.3,
                    }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-400 to-fuchsia-500 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-2xl shadow-purple-500/50 ring-4 ring-purple-500/20"
                  >
                    D
                  </motion.div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                      Dharshan S Kotian
                    </h2>
                    <p className="text-purple-400 font-mono mt-1 text-xs sm:text-sm font-semibold">
                      &lt;Full Stack Developer /&gt;
                    </p>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                    {aboutMeText}
                  </p>

                  {/* Social Links - Compact */}
                  <div className="flex flex-col w-full gap-2 mt-3">
                    <a
                      href="https://github.com/Dharshansk16"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-2 rounded-lg text-xs font-medium hover:from-gray-600 hover:to-gray-700 transition shadow-md hover:shadow-gray-500/20 touch-manipulation border border-white/10 active:scale-98"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/dharshan-s-kotian-5053aa280/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium hover:from-blue-500 hover:to-blue-600 transition shadow-md hover:shadow-blue-500/20 touch-manipulation border border-white/10 active:scale-98"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://leetcode.com/u/Dharshan_S_Kotian/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:from-orange-400 hover:to-amber-400 transition shadow-md hover:shadow-orange-500/20 touch-manipulation border border-white/10 active:scale-98"
                    >
                      LeetCode
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats, Skills, Tech (2/3 width) */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5">
              {/* Stats Grid - Compact */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: isMobile ? index * 0.03 : 0.05 * (index + 1),
                      duration: isMobile ? 0.2 : 0.3,
                    }}
                    className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:border-purple-500/40 transition-all group hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <stat.icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`}
                    />
                    <div
                      className={`text-base sm:text-lg font-bold mb-0.5 ${stat.color}`}
                    >
                      {stat.label}
                    </div>
                    <p className="text-gray-400 text-[10px] sm:text-xs font-medium">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Skills and Tech Stack - Side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* Skills Progress Bars - Compact */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 hover:shadow-lg hover:shadow-cyan-500/10 transition-shadow"
                >
                  <h3 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 flex items-center">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-2"></span>
                    Skills Proficiency
                  </h3>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1.5">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-cyan-400 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              delay: 0.5 + index * 0.05,
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                            className={`h-2 rounded-full ${skill.color} shadow-md`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Tech Stack Tags - Compact */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 hover:shadow-lg hover:shadow-purple-500/10 transition-shadow"
                >
                  <h3 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-4 flex items-center">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-purple-400 to-fuchsia-400 rounded-full mr-2"></span>
                    Tech Stack
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {Object.entries(techGroups).map(
                      ([group, techs], groupIndex) => (
                        <motion.div
                          key={group}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + groupIndex * 0.1 }}
                        >
                          <h4 className="text-purple-400 font-semibold mb-2 text-xs sm:text-sm flex items-center">
                            <span className="w-1 h-1 bg-purple-400 rounded-full mr-1.5"></span>
                            {group}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {techs.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay:
                                    0.5 + groupIndex * 0.1 + techIndex * 0.02,
                                }}
                                whileHover={{ scale: 1.05, y: -1 }}
                                className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-300 border border-purple-400/30 rounded-md text-[10px] sm:text-xs hover:border-purple-300 hover:from-purple-500/30 hover:to-fuchsia-500/30 transition-all touch-manipulation shadow-sm hover:shadow-purple-500/20 font-medium"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </OSWindow>
    </div>
  );
}

export default memo(AboutApp);
