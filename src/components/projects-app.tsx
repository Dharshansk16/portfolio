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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/constants/project";
// import FloatingParticles from "@/components/particles/floating-particles";
// import AnimatedBackground from "@/components/animations/animated-background";
import Image from "next/image";

interface ProjectsAppProps {
  onBack: () => void;
}

export default function ProjectsApp({ onBack }: ProjectsAppProps) {
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

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "linear" }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Animated Background */}
      {/* <AnimatedBackground /> */}
      {/* Floating Particles */}
      {/* <FloatingParticles /> */}

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "linear" }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 backdrop-blur-sm border border-cyan-500/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </h1>
              <p className="text-gray-400 mt-2">
                Innovative solutions crafted with passion
              </p>
            </div>
          </div>

          {/* Terminal Window Controls */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/50 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ width: "100%", height: "100%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
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
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4 mx-auto"
                      >
                        <ExternalLink className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className="text-white font-medium">View Details</p>
                    </div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {project.year} • {project.duration}
                    </span>
                    <span>{project.team}</span>
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
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedProject.color} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-lg">
                      {selectedProject.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-400">
                      {selectedProject.category} • {selectedProject.year}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative h-80 rounded-2xl overflow-hidden">
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
                      />
                    </AnimatePresence>

                    {/* Gallery Controls */}
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevImage}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Play/Pause Button */}
                    <div className="absolute bottom-4 left-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images.length}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex space-x-2 overflow-x-auto">
                    {selectedProject.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-cyan-400 shadow-lg shadow-cyan-400/25"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      About This Project
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 text-sm rounded-lg border border-cyan-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <p className="text-white font-medium">
                          {selectedProject.duration}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Team:</span>
                        <p className="text-white font-medium">
                          {selectedProject.team}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <p className="text-white font-medium">
                          {selectedProject.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      onClick={() =>
                        window.open(selectedProject.github, "_blank")
                      }
                      className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(selectedProject.live, "_blank")
                      }
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
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
