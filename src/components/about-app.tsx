"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Code2,
  MapPin,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Download,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  personalInfo,
  experience,
  education,
  skills,
  techGroups,
  highlights,
} from "@/constants/about";

interface AboutAppProps {
  onBack?: () => void;
  isEmbedded?: boolean;
  onViewAll?: () => void;
}

const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

// Stagger container variant
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Section heading component
function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function AboutApp({ onBack, isEmbedded = false, onViewAll }: AboutAppProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div
      className={`w-full ${
        isEmbedded
          ? "py-20 bg-white/40 dark:bg-white/[0.02] [.no-bg-image.dark_&]:bg-black [.no-bg-image:not(.dark)_&]:bg-white border-t border-white/40 dark:border-white/[0.05] [.no-bg-image.dark_&]:border-zinc-900"
          : "bg-transparent min-h-screen overflow-y-auto"
      }`}
    >
      <div
        className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isEmbedded ? "" : "pt-20 pb-16 sm:pt-24 sm:pb-24"
        }`}
      >
        {/* Back Button */}
        {!isEmbedded && onBack && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <button
              onClick={onBack}
              className="group inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm text-sm font-medium"
              aria-label="Back to Dashboard"
            >
              <ChevronLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Dashboard
            </button>
          </motion.div>
        )}

        {/* ─── HERO SECTION ─── */}
        {!isEmbedded ? (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-20"
          >
            {/* Avatar + Name */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              <motion.div variants={itemVariants} className="relative shrink-0">
                {/* Animated ring removed per request */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-2xl ring-4 ring-white dark:ring-black overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src="/profile/darsh_pfp.jpeg"
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 128px, 160px"
                    priority
                  />
                </div>
              </motion.div>

              <div className="text-center md:text-left flex-1 space-y-5">
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      Available for opportunities
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 leading-[1.1]">
                    {personalInfo.name}
                  </h1>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 font-medium max-w-xl"
                >
                  {personalInfo.tagline}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center md:justify-start gap-2 text-sm text-zinc-400 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{personalInfo.location}</span>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap justify-center md:justify-start gap-3 pt-1"
                >
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm shadow-lg shadow-zinc-900/10 dark:shadow-white/10"
                  >
                    <FaGithub className="w-4 h-4" />
                    GitHub
                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-medium border border-zinc-200 dark:border-zinc-800 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm"
                  >
                    <FaLinkedin className="w-4 h-4" />
                    LinkedIn
                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <a
                    href="/resume_pdf.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group md:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-medium border border-zinc-200 dark:border-zinc-800 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <a
                    href={personalInfo.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 font-medium border border-zinc-200 dark:border-zinc-800 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm"
                  >
                    <Code2 className="w-4 h-4" />
                    LeetCode
                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 mb-4">
                About Me
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 max-w-2xl mx-auto text-lg">
                My background, core competencies, and the tools I use to build
                robust software.
              </p>
            </motion.div>
          </div>
        )}

        {/* ─── ABOUT / BACKGROUND ─── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60 p-6 sm:p-8 overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-violet-500/5 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent rounded-tr-full pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500">
                  Background
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500">
                {personalInfo.bio}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── HIGHLIGHTS BENTO GRID ─── */}
        <section className="mb-20">
          <SectionHeading
            title="What I Do"
            subtitle="Key areas of expertise and impact."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="group relative rounded-2xl border border-white/50 dark:border-zinc-800 bg-white/60 backdrop-blur-md dark:bg-zinc-950/60 p-6 hover:border-white/80 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 mb-2">
                    {item.label}
                  </div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 mb-2">
                    {item.value}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* For embedded mode, show a condensed version + CTA */}
        {isEmbedded && onViewAll ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-4 mb-8"
          >
            <button
              onClick={onViewAll}
              className="group px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-zinc-900/10 dark:shadow-white/10 inline-flex items-center gap-2"
            >
              View Full Profile
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <>
            {/* ─── EXPERIENCE TIMELINE ─── */}
            <section className="mb-20">
              <SectionHeading
                title="Experience"
                subtitle="My professional journey so far."
              />
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-zinc-300 via-zinc-200 to-transparent dark:from-zinc-700 dark:via-zinc-800 dark:to-transparent" />

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="space-y-8"
                >
                  {experience.map((exp, index) => (
                    <motion.div
                      key={`${exp.company}-${exp.role}`}
                      variants={itemVariants}
                      className="relative flex gap-6 group"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 shrink-0 mt-1">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-colors duration-300 ${
                            exp.current
                              ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white"
                              : "bg-white/60 backdrop-blur-sm dark:bg-zinc-950/60 border-white/50 dark:border-zinc-700 group-hover:border-white/80 dark:group-hover:border-zinc-600"
                          }`}
                        >
                          <Briefcase
                            className={`w-4 h-4 ${
                              exp.current
                                ? "text-white dark:text-zinc-900"
                                : "text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Content card */}
                      <div className="flex-1 rounded-2xl border border-white/50 dark:border-zinc-800 bg-white/60 backdrop-blur-md dark:bg-zinc-950/60 p-5 sm:p-6 group-hover:border-white/80 dark:group-hover:border-zinc-700 transition-all duration-300">
                        <div className="flex flex-col h-full justify-between">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500">
                              {exp.role}
                            </h3>
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${
                                exp.current
                                  ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"
                                  : "bg-zinc-100 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 border border-zinc-200 dark:border-zinc-800"
                              }`}
                            >
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 mb-2">
                            {exp.company}
                          </p>
                          {Array.isArray(exp.description) ? (
                            <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 leading-relaxed marker:text-zinc-400 dark:marker:text-zinc-600">
                              {exp.description.map((item, i) => (
                                <li key={i} className="pl-1">{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ─── EDUCATION ─── */}
            <section className="mb-20">
              <SectionHeading title="Education" />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {education.map((edu) => (
                  <motion.div
                    key={edu.institution}
                    variants={itemVariants}
                    className="group flex items-start gap-5 rounded-2xl border border-white/50 dark:border-zinc-800 bg-white/60 backdrop-blur-md dark:bg-zinc-950/60 p-5 sm:p-6 hover:border-white/80 dark:hover:border-zinc-700 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 mt-0.5">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 mt-1 font-medium">
                        {edu.period}
                      </p>
                      {/* @ts-ignore */}
                      {edu.description && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 mt-2 leading-relaxed">
                          {/* @ts-ignore */}
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* ─── SKILLS ─── */}
            <section className="mb-20">
              <SectionHeading
                title="Core Competencies"
                subtitle="Proficiency across key domains."
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
                className="space-y-5"
              >
                {skills.map((skill) => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500">
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-900/60 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* ─── TECHNOLOGY STACK ─── */}
            <section className="mb-20">
              <SectionHeading
                title="Technology Stack"
                subtitle="Tools and technologies I work with daily."
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
                className="space-y-8"
              >
                {Object.entries(techGroups).map(([group, techs]) => (
                  <motion.div key={group} variants={itemVariants}>
                    <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 dark:hover:text-orange-200/90 transition-colors duration-500 mb-3 uppercase tracking-[0.15em]">
                      {group}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech.name}
                          className="group relative px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-white/50 dark:border-zinc-800 bg-white/60 backdrop-blur-md dark:bg-zinc-950/60 text-zinc-700 dark:text-zinc-300 hover:border-white/80 dark:hover:border-zinc-600 transition-all duration-300 cursor-default overflow-hidden"
                        >
                          {/* Colored accent on hover */}
                          <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300"
                            style={{ backgroundColor: tech.color }}
                          />
                          <span
                            className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: tech.color }}
                          />
                          <span className="relative">{tech.name}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* ─── PHILOSOPHY ───
            <section className="mb-8">
              <SectionHeading
                title="Philosophy"
                subtitle="Principles that guide my work."
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {philosophyItems.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="group rounded-2xl border border-white/50 dark:border-zinc-800 bg-white/60 backdrop-blur-md dark:bg-zinc-950/60 p-6 hover:border-white/80 dark:hover:border-zinc-700 transition-all duration-300 text-center"
                  >
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {item.emoji}
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </section> */}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(AboutApp);
