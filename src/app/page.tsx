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

// Detect if device is low-end
const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    navigator.hardwareConcurrency <= 4 ||
    /Mobile|Android|iPhone/i.test(navigator.userAgent)
  );
};

export default function DevSpaceOS() {
  const [isBooted, setIsBooted] = useState(false);
  const [currentApp, setCurrentApp] = useState<AppType>("dashboard");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setIsLowEnd(isLowEndDevice());

    // Shorter boot time for low-end devices
    const bootTime = isLowEndDevice() ? 2500 : 4000;
    const timer = setTimeout(() => {
      setIsBooted(true);
    }, bootTime);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden relative">
      {/* Ambient Gradient Orbs - Simplified for low-end devices */}
      {!isLowEnd && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-sky-600/15 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      )}

      {/* Background Effects */}
      <BackgroundEffects showParticles={showParticles} />

      {/* Cursor Trail Effect - Only on high-end devices */}
      {isBooted && !isLowEnd && <CursorTrail />}

      {/* Refined Vignette Overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-slate-950/30 to-slate-950/80 pointer-events-none z-0" />

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
