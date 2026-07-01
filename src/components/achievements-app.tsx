"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ArrowLeft,
  Award,
} from "lucide-react";
import Image from "next/image";

interface AchievementsAppProps {
  onBack?: () => void;
  isEmbedded?: boolean;
  onViewAll?: () => void;
}

const achievements = [
  {
    id: 1,
    title: "Career Readiness Program",
    date: "2026",
    description:
      "Conducted a Career Readiness Program session for 250+ students, covering DSA, interview preparations. Empowered students to crack top-tier technical interviews with confidence.",
    images: [
      "/achievements/career-readiness-program/session_cse1.jpeg",
      "/achievements/career-readiness-program/session_cse2.jpeg",
      "/achievements/career-readiness-program/session_cse3.jpeg",
      "/achievements/career-readiness-program/session_cse4.jpeg",
      "/achievements/career-readiness-program/session_cse5.jpeg",
    ],
  },
  {
    id: 2,
    title: "Finalist, AI Innovation Hackathon",
    date: "2025",
    description:
      "Emerged as a Finalist at the prestigious AI Innovation Hackathon organised by Kyndryl and Microsoft. Developed scalable AI solutions competing against top national talent.",
    images: ["/achievements/aiinnovation/aiinnovation_finals.jpeg"],
  },
  {
    id: 3,
    title: "Second Runner-up, Crack the Campus",
    date: "2025",
    description:
      "Secured Second Runner-up in the Crack the Campus Crackathon organised by Castle Rock Inc. Showcased exceptional problem-solving and system design under extreme time constraints.",
    images: ["/achievements/crack-the-campus/crack_the_campus.jpeg"],
  },
  {
    id: 4,
    title: "DSA Lead, Finite Loop Club",
    date: "2025 - 2026",
    description:
      "Led a comprehensive DSA sprint, mentoring peers in advanced data structures and algorithms. Fostered a culture of competitive programming and continuous learning.",
    images: ["/achievements/dsa-lead/dsa_lead.jpeg"],
  },
  {
    id: 5,
    title: "Hackathon Mentor",
    date: "2025",
    description:
      "Mentored students during a month-long hackathon, guiding them in ideation, complex problem-solving, and building scalable design architectures from scratch.",
    images: [],
  },
  {
    id: 6,
    title: "South Zone Cricket Championship",
    date: "",
    description:
      "Represented Nitte University at the South Zone Inter-University Cricket Championship in Chennai. Demonstrated outstanding teamwork, leadership, and athletic excellence.",
    images: ["/achievements/cricket-karate/cricket_karate.jpeg"],
  },
  {
    id: 7,
    title: "National-Level Karate Championship",
    date: "",
    description:
      "Represented Karnataka at the SGFI National-Level Karate Championship in Madhya Pradesh. Achieved peak physical discipline and martial arts proficiency at the national level.",
    images: ["/achievements/cricket-karate/cricket_karate2.jpeg"],
  },
];

function ImageGallery({
  images,
  onExpand,
}: {
  images: string[];
  onExpand: (img: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl group bg-white/40 dark:bg-zinc-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Achievement ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Expand Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExpand(images[currentIndex]);
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/50 text-zinc-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20 hover:scale-105 active:scale-95 shadow-sm"
        aria-label="Expand image"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          <button
            onClick={prevImage}
            className="pointer-events-auto p-2 rounded-full bg-white/80 dark:bg-black/50 text-zinc-900 dark:text-white backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform shadow-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="pointer-events-auto p-2 rounded-full bg-white/80 dark:bg-black/50 text-zinc-900 dark:text-white backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform shadow-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-5 bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                  : "w-1.5 bg-white/60 shadow-[0_0_2px_rgba(0,0,0,0.5)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AchievementsApp({
  onBack,
  isEmbedded = false,
  onViewAll,
}: AchievementsAppProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayAchievements = isEmbedded
    ? achievements.slice(0, 2)
    : achievements;

  return (
    <div
      className={`w-full bg-transparent px-4 sm:px-6 lg:px-8 ${
        isEmbedded
          ? "py-16 border-t border-zinc-100 dark:border-zinc-900"
          : "min-h-screen overflow-y-auto"
      }`}
    >
      <div className={`max-w-4xl mx-auto ${isEmbedded ? "" : "pt-24 pb-24"}`}>
        {/* Header */}
        <div className="mb-16 md:mb-24">
          {!isEmbedded && onBack && (
            <button
              onClick={onBack}
              className="group inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm dark:bg-zinc-900 border border-white/50 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-white/80 dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm text-sm font-medium mb-8"
              aria-label="Back to Dashboard"
            >
              <ChevronLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Dashboard
            </button>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4"
          >
            Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl"
          >
            A timeline of milestones, leadership roles, and recognitions in both
            technology and sports.
          </motion.p>
        </div>

        {/* Editorial List */}
        <div className="flex flex-col">
          {displayAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="group py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-16 border-t border-zinc-100 dark:border-zinc-800/50 first:border-t-0"
            >
              {/* Image Side (Left) */}
              <div className="w-full md:w-5/12 shrink-0">
                {achievement.images.length > 0 ? (
                  <ImageGallery
                    images={achievement.images}
                    onExpand={setSelectedImage}
                  />
                ) : (
                  <div className="w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl bg-white/40 dark:bg-zinc-900 border border-white/50 dark:border-zinc-800 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 dark:from-zinc-800/50 dark:to-zinc-900/10" />
                    <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm dark:bg-black/50 shadow-sm flex items-center justify-center mb-4 z-10">
                      <Award className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium z-10">
                      Achievement Badge
                    </p>
                  </div>
                )}
              </div>

              {/* Text Side (Right) */}
              <div className="w-full md:w-7/12 flex flex-col justify-center py-4">
                {achievement.date && (
                  <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4 block">
                    {achievement.date}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                  {achievement.title}
                </h3>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {isEmbedded && onViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={onViewAll}
              className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-full hover:scale-105 transition-transform"
            >
              View All Achievements
            </button>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 dark:bg-black/95 p-4 sm:p-8 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[3/4] sm:aspect-video rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(AchievementsApp);
