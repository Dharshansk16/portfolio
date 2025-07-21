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
      window.open("/resume.pdf", "_blank");
      return;
    }
    setCurrentApp(app);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <BackgroundEffects showParticles={showParticles} />

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
