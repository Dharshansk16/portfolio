"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
 Briefcase,
 ExternalLink,
 X,
 ChevronLeft,
 ChevronRight,
 Play,
 Pause,
 ImageIcon,
} from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { projects } from "@/constants/project";
import Image from "next/image";
import { FaGithub} from"react-icons/fa";

interface ProjectsAppProps {
 onBack?: () => void;
 isEmbedded?: boolean;
 onViewAll?: () => void;
}

// Detect mobile for simplified animations
const isMobileDevice = () => {
 if (typeof window ==="undefined") return false;
 return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

function ProjectsApp({ onBack, isEmbedded = false, onViewAll }: ProjectsAppProps) {
 const [selectedProject, setSelectedProject] = useState<
 (typeof projects)[0] | null
 >(null);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [isPlaying, setIsPlaying] = useState(false);
 const [hoveredProject, setHoveredProject] = useState<number | null>(null);
 const [isMobile, setIsMobile] = useState(false);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
   setIsMobile(isMobileDevice());
   setMounted(true);
 }, []);

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
 <div className={`w-full px-4 sm:px-6 lg:px-8 ${isEmbedded ? 'py-16 bg-transparent [.no-bg-image.dark_&]:bg-zinc-950 [.no-bg-image:not(.dark)_&]:bg-zinc-50 border-t border-white/40 dark:border-white/[0.05] [.no-bg-image.dark_&]:border-zinc-900' : 'bg-transparent min-h-screen overflow-y-auto'}`}>
  <div className={`max-w-6xl mx-auto ${isEmbedded ? '' : 'pt-20 pb-8 sm:pt-24 sm:pb-16'}`}>
  {/* Section Header for Embedded / Minimalist Back Button for Standalone */}
  {!isEmbedded && onBack && (
  <div className="mb-12">
  <button
  onClick={onBack}
  className="group inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm text-sm font-medium"
  aria-label="Back to Dashboard"
  >
  <ChevronLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
  Back to Dashboard
  </button>
  </div>
  )}
  {isEmbedded && (
  <div className="mb-16 text-center">
  <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 mb-4">Selected Works</h2>
  <p className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 dark:hover:text-orange-100/90 transition-colors duration-500 max-w-2xl mx-auto text-lg">A collection of my recent projects, demonstrating expertise in AI, architecture, and scalable systems.</p>
  </div>
  )}

  <div className="flex flex-col">
  {(isEmbedded ? projects.slice(0, 2) : projects).map((project, index) => (
  <div key={project.id}>
  <motion.div
  initial={{ opacity: 0, y: 40}}
  whileInView={{ opacity: 1, y: 0}}
  viewport={{ once: true, margin:"-100px"}}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
  className={`flex flex-col ${
  index % 2 === 0 ?"md:flex-row" :"md:flex-row-reverse"
 } gap-8 sm:gap-16 items-center group py-16 sm:py-24`}
  >
  {/* Project Text Info */}
  <div className="w-full md:w-1/2 flex flex-col justify-center">
  <div className="inline-flex items-center space-x-2 mb-4">
  <span className="text-xs font-mono tracking-widest uppercase text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 dark:hover:text-orange-100/90 transition-colors duration-500">
  Case Study {String(index + 1).padStart(2,"0")}
  </span>
  <span className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-700"></span>
  </div>
  
  <h2 
    onClick={() => handleProjectClick(project)}
    className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 mb-6 cursor-pointer"
  >
  {project.title}
  </h2>
  
  <p className="text-lg text-zinc-600 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 dark:hover:text-orange-100/90 transition-colors duration-500 leading-relaxed mb-8">
  {project.description}
  </p>

  <div className="flex flex-wrap gap-2 mb-10">
  {project.tech.map((tech) => (
  <span
  key={tech}
  className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 text-xs font-medium tracking-wide uppercase"
  >
  {tech}
  </span>
  ))}
  </div>

  <button
  onClick={() => handleProjectClick(project)}
  className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 hover:opacity-70 transition-opacity"
  >
  Explore Project
  <ChevronRight className="w-4 h-4 ml-2" />
  </button>
  </div>

  {/* Project Image */}
  <div
  className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/40 dark:bg-zinc-900/60 shadow-2xl cursor-pointer"
  onClick={() => handleProjectClick(project)}
  >
  {project.image ? (
    <Image
    src={project.image}
    alt={project.title}
    fill
    priority={index < 2}
    className="object-cover transition-transform duration-1000 group-hover:scale-105"
    sizes="(max-width: 768px) 100vw, 50vw"
    />
  ) : (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white/60 to-white/20 dark:from-zinc-800 dark:to-zinc-900 transition-transform duration-1000 group-hover:scale-105">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/70 backdrop-blur-sm dark:bg-zinc-950/60 flex items-center justify-center shadow-lg mb-4">
        <span className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-200">{project.title.charAt(0)}</span>
      </div>
      <span className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 dark:hover:text-orange-100/90 transition-colors duration-500 font-medium px-4 text-center">Images coming soon</span>
    </div>
  )}
  {/* Removed dark overlay on hover */}
  </div>
  </motion.div>
  
  {/* Divider between projects */}
  {index !== (isEmbedded ? 1 : projects.length - 1) && (
  <div className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800" />
  )}
  </div>
  ))}
  </div>

  {isEmbedded && onViewAll && (
  <motion.div
  initial={{ opacity: 0, y: 20}}
  whileInView={{ opacity: 1, y: 0}}
  viewport={{ once: true, margin:"-50px"}}
  transition={{ duration: 0.6}}
  className="flex justify-center mt-8 mb-8"
  >
  <button
  onClick={onViewAll}
  className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-slate-800 font-bold rounded-full hover:scale-105 transition-transform"
  >
  View All Projects
  </button>
  </motion.div>
  )}
  </div>

  {/* Project Detail Modal */}
 {mounted && createPortal(
 <AnimatePresence>
 {selectedProject && (
 <motion.div
 initial={{ opacity: 0}}
 animate={{ opacity: 1}}
 exit={{ opacity: 0}}
 transition={{ duration: isMobile ? 0.15 : 0.2}}
 className="fixed inset-0 bg-zinc-950/60 dark:bg-black/60 backdrop-blur-md z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
 onClick={handleCloseModal}
 >
 <motion.div
 initial={{ scale: 0.9, opacity: 0, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0}}
 exit={{ opacity: 0, scale: 0.95, y: isMobile ? 20 : 0}}
 transition={{ duration: 0.3, ease:"easeOut"}}
 onClick={(e) => e.stopPropagation()}
 className="bg-white/80 backdrop-blur-xl dark:bg-zinc-950/60 border border-white/50 dark:border-zinc-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-auto shadow-2xl relative"
 style={{ willChange:"transform, opacity"}}
 >
 {/* Modal Header */}
 <div className="flex items-center justify-between p-5 sm:p-8 border-b border-white/40 dark:border-zinc-800 sticky top-0 bg-white/50 dark:bg-zinc-950/60 backdrop-blur-md z-20">
 <div className="flex items-center gap-4 min-w-0 flex-1">
 <div
 className={`w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm dark:bg-zinc-950/60 ${selectedProject.color} flex items-center justify-center flex-shrink-0 shadow-inner`}
 >
 <span className="text-white font-bold text-xl">
 {selectedProject.title.charAt(0)}
 </span>
 </div>
 <div className="min-w-0 flex-1">
 <h2 className="text-xl sm:text-3xl font-bold text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 truncate">
 {selectedProject.title}
 </h2>
 <p className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 dark:hover:text-orange-100/90 transition-colors duration-500 text-sm mt-1 font-medium truncate">
 {selectedProject.category} • {selectedProject.year}
 </p>
 </div>
 </div>
 <Button
 variant="ghost"
 size="icon"
 onClick={handleCloseModal}
 className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 dark:hover:text-orange-100/90 transition-colors duration-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full h-10 w-10 flex-shrink-0 transition-colors ml-4"
 >
 <X className="w-5 h-5" />
 </Button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 p-5 sm:p-8">
 {/* Image Gallery */}
 {selectedProject.images && selectedProject.images.length > 0 ? (
  <div className="space-y-4">
  <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-white/40 dark:bg-black/60 border border-white/50 dark:border-zinc-800 group">
  <AnimatePresence mode="wait">
  <motion.img
  key={currentImageIndex}
  src={selectedProject.images[currentImageIndex]}
  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
  initial={{ opacity: 0, scale: 1.05}}
  animate={{ opacity: 1, scale: 1}}
  exit={{ opacity: 0}}
  transition={{ duration: 0.4}}
  className="w-full h-full object-cover"
  loading="lazy"
  />
  </AnimatePresence>

  {/* Gallery Controls (Hover reveal on desktop) */}
  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
  <Button
  variant="ghost"
  size="icon"
  onClick={prevImage}
  className="bg-white/80 dark:bg-black/60 backdrop-blur-md text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 hover:bg-white dark:hover:bg-black/70 shadow-lg h-10 w-10 sm:h-12 sm:w-12 rounded-full"
  >
  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
  </Button>
  <Button
  variant="ghost"
  size="icon"
  onClick={nextImage}
  className="bg-white/80 dark:bg-black/60 backdrop-blur-md text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 hover:bg-white dark:hover:bg-black/70 shadow-lg h-10 w-10 sm:h-12 sm:w-12 rounded-full"
  >
  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
  </Button>
  </div>

  {/* Controls Bottom Row */}
  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
  <Button
  variant="ghost"
  size="icon"
  onClick={() => setIsPlaying(!isPlaying)}
  className="bg-white/80 dark:bg-black/60 backdrop-blur-md text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 hover:bg-white dark:hover:bg-black/70 shadow-lg h-10 w-10 rounded-full"
  >
  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
  </Button>
  <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
  <span className="text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 text-xs font-semibold">
  {currentImageIndex + 1} / {selectedProject.images.length}
  </span>
  </div>
  </div>
  </div>

  {/* Thumbnail Strip */}
  <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none py-1">
  {selectedProject.images.map((image, idx) => (
  <button
  key={idx}
  onClick={() => setCurrentImageIndex(idx)}
  className={`relative flex-shrink-0 w-20 h-16 sm:w-24 sm:h-16 rounded-xl overflow-hidden transition-all touch-manipulation ${
  currentImageIndex === idx
  ?"ring-2 ring-zinc-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
  :"opacity-60 hover:opacity-100"
}`}
  >
  <Image
  src={image ||"/placeholder.svg"}
  alt={`Thumbnail ${idx + 1}`}
  fill
  className="object-cover"
  sizes="96px"
  loading={idx === 0 ?"eager" :"lazy"}
  />
  </button>
  ))}
  </div>
  </div>
  ) : (
  <div className="flex flex-col items-center justify-center h-64 sm:h-80 md:h-96 rounded-2xl bg-gradient-to-br from-white/60 to-white/20 dark:from-zinc-800 dark:to-zinc-900 border border-white/50 dark:border-zinc-800 group relative">
    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/70 backdrop-blur-sm dark:bg-zinc-950/60 flex items-center justify-center shadow-lg mb-6 z-10">
      <ImageIcon className={`w-10 h-10 sm:w-12 sm:h-12 ${selectedProject.color}`} />
      <span className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-200">{selectedProject.title.charAt(0)}</span>
    </div>
    <p className="text-zinc-500 dark:text-zinc-400 dark:hover:text-orange-100/90 transition-colors duration-500 dark:hover:text-orange-100/90 transition-colors duration-500 font-medium text-lg z-10">Project screenshots coming soon</p>
    {/* Decorative background elements */}
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-zinc-300 dark:bg-zinc-700 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
    <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-zinc-400 dark:bg-zinc-600 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
  </div>
  )}

 {/* Project Details */}
 <div className="space-y-6 sm:space-y-8 flex flex-col justify-center">
 <div>
 <h3 className="text-xl font-bold text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 mb-3">
 About This Project
 </h3>
 <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
 {selectedProject.longDescription}
 </p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 mb-3">
 Technologies Used
 </h3>
 <div className="flex flex-wrap gap-2">
 {selectedProject.tech.map((tech) => (
 <span
 key={tech}
 className="px-3 py-1.5 bg-white/60 backdrop-blur-sm dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 text-sm rounded-lg font-medium"
 >
 {tech}
 </span>
 ))}
 </div>
 </div>

 {/* Action Buttons */}
 <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
 <Button
 onClick={() => window.open(selectedProject.github,"_blank")}
 className="flex-1 bg-white/60 backdrop-blur-sm dark:bg-zinc-900/60 hover:bg-white/80 dark:hover:bg-zinc-800 text-slate-800 dark:text-white dark:hover:text-orange-50 transition-colors duration-500 border border-white/50 dark:border-zinc-800 font-semibold shadow-sm h-12 text-base rounded-xl transition-all"
 >
 <FaGithub className="w-5 h-5 mr-2" />
 View Source
 </Button>
 <Button
 onClick={() => window.open(selectedProject.live,"_blank")}
 className="flex-1 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-semibold shadow-md h-12 text-base rounded-xl transition-all"
 >
 <ExternalLink className="w-5 h-5 mr-2" />
 Live Preview
 </Button>
 </div>
 </div>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>,
 document.body
 )}
 </div>
 );
}

export default memo(ProjectsApp);
