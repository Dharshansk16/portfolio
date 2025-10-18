"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "@/components/boot-screen";
import Dashboard from "@/components/dashboard";
import ProjectsApp from "@/components/projects-app";
import BlogApp from "@/components/blog-app";
import AboutApp from "@/components/about-app";
import ContactModal from "@/components/contact-modal";
import FloatingDock from "@/components/floating-dock";
import BackgroundEffects from "@/components/particles/background-effects";
import CursorTrail from "@/components/animations/cursor-trail";

export type AppType = "dashboard" | "projects" | "blog" | "about" | "resume";

export default function DevSpaceOS() {
  const [isBooted, setIsBooted] = useState(false);
  const [currentApp, setCurrentApp] = useState<AppType>("dashboard");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleAppOpen = (app: AppType) => {
    if (app === "resume") {
      window.open("/resume_pdf.pdf", "_blank");
      return;
    }
    setCurrentApp(app);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Background Effects */}
      <BackgroundEffects showParticles={showParticles} />

      {/* Cursor Trail Effect */}
      {isBooted && <CursorTrail />}

      {/* Vignette Overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            className="relative z-10"
          >
            <AnimatePresence mode="wait">
              {currentApp === "dashboard" && (
                <Dashboard key="dashboard" onAppOpen={handleAppOpen} />
              )}
              {currentApp === "projects" && (
                <ProjectsApp
                  key="projects"
                  onBack={() => setCurrentApp("dashboard")}
                />
              )}
              {currentApp === "blog" && (
                <BlogApp key="blog" onBack={() => setCurrentApp("dashboard")} />
              )}
              {currentApp === "about" && (
                <AboutApp
                  key="about"
                  onBack={() => setCurrentApp("dashboard")}
                />
              )}
            </AnimatePresence>

            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />

            <FloatingDock
              onContactOpen={() => setIsContactOpen(true)}
              onParticlesToggle={() => setShowParticles(!showParticles)}
              showParticles={showParticles}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
