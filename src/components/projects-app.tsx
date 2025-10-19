"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/constants/project";
// import FloatingParticles from "@/components/particles/floating-particles";
// import AnimatedBackground from "@/components/animations/animated-background";
import Image from "next/image";

interface ProjectsAppProps {
  onBack: () => void;
}

function ProjectsApp({ onBack }: ProjectsAppProps) {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Auto-play slideshow
  useEffect(() => {
    if (selectedProject && isPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedProject, isPlaying]);

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  const handleProjectClick = useCallback((project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "linear" }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Animated Background */}
      {/* <AnimatedBackground /> */}
      {/* Floating Particles */}
      {/* <FloatingParticles /> */}

      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "linear" }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 backdrop-blur-sm border border-cyan-500/20 flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                <span className="block sm:hidden">Projects</span>
                <span className="hidden sm:block">Featured Projects</span>
              </h1>
              <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm truncate">
                Innovative solutions crafted with passion
              </p>
            </div>
          </div>

          {/* Terminal Window Controls */}
          <div className="flex space-x-2 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project)}
              className="group cursor-pointer touch-manipulation"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    priority={index < 2}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ width: "100%", height: "100%" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB8H/9k="
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-3 sm:mb-4 mx-auto"
                      >
                        <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                      <p className="text-white font-medium text-sm sm:text-base">
                        View Details
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur-xl z-10">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${selectedProject.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-bold text-base sm:text-lg">
                      {selectedProject.title.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-2xl font-bold text-white truncate">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                      {selectedProject.category} • {selectedProject.year}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white flex-shrink-0 touch-manipulation"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6">
                {/* Image Gallery */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative h-56 sm:h-72 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.title} - Image ${
                          currentImageIndex + 1
                        }`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </AnimatePresence>

                    {/* Gallery Controls */}
                    <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevImage}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 touch-manipulation w-10 h-10 sm:w-12 sm:h-12"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 touch-manipulation w-10 h-10 sm:w-12 sm:h-12"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </Button>
                    </div>

                    {/* Play/Pause Button */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 touch-manipulation w-9 h-9 sm:w-10 sm:h-10"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 sm:px-3 sm:py-1">
                      <span className="text-white text-xs sm:text-sm">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images.length}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-500/50">
                    {selectedProject.images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all touch-manipulation ${
                          currentImageIndex === idx
                            ? "border-cyan-400 shadow-lg shadow-cyan-400/25"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                      About This Project
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 text-xs sm:text-sm rounded-lg border border-cyan-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                    <Button
                      onClick={() =>
                        window.open(selectedProject.github, "_blank")
                      }
                      className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white touch-manipulation h-11 sm:h-10"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(selectedProject.live, "_blank")
                      }
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white touch-manipulation h-11 sm:h-10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(ProjectsApp);
