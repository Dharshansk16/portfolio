"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "@/components/boot-screen";
import Dashboard from "@/components/dashboard";
import ContactModal from "@/components/contact-modal";
import FloatingDock from "@/components/floating-dock";
import BackgroundEffects from "@/components/particles/background-effects";
import CursorTrail from "@/components/animations/cursor-trail";
import ContextMenu from "@/components/ui/context-menu";
import MenuBar from "@/components/ui/menu-bar";
import EasterEggs from "@/components/effects/easter-eggs";
import SpotlightSearch from "@/components/ui/spotlight-search";
import UIHints from "@/components/ui/ui-hints";

// Lazy load heavy app components to reduce initial bundle
const ProjectsApp = lazy(() => import("@/components/projects-app"));
const BlogApp = lazy(() => import("@/components/blog-app"));
const AboutApp = lazy(() => import("@/components/about-app"));

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure we're on client side
    setMounted(true);
    setIsLowEnd(isLowEndDevice());

    // Shorter boot time - optimized for faster loading
    const bootTime = isLowEndDevice() ? 2000 : 2800;
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

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center">
        <div className="animate-pulse text-indigo-400">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden relative"
      style={{ willChange: "auto" }}
    >
      {/* Simplified Ambient Gradient Orbs - Only on high-end devices and reduced complexity */}
      {!isLowEnd && isBooted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 rounded-full"
            style={{ filter: "blur(100px)" }}
          />
          <div
            className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-cyan-600/10 rounded-full"
            style={{ filter: "blur(100px)" }}
          />
        </div>
      )}

      {/* Background Effects - Only show after boot to prevent lag */}
      {isBooted && <BackgroundEffects showParticles={showParticles} />}

      {/* Cursor Trail Effect - Only on high-end devices and after boot */}
      {isBooted && !isLowEnd && <CursorTrail />}

      {/* Unique UI Enhancements */}
      {isBooted && (
        <>
          <MenuBar />
          <ContextMenu />
          <EasterEggs />
          <SpotlightSearch
            onNavigate={handleAppOpen}
            onContactOpen={() => setIsContactOpen(true)}
          />
          <UIHints />
        </>
      )}

      {/* Refined Vignette Overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-slate-950/30 to-slate-950/80 pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: isLowEnd ? 0.2 : 0.5,
              ease: "easeOut",
            }}
            className="relative z-10"
          >
            <AnimatePresence mode="wait">
              {currentApp === "dashboard" && (
                <Dashboard key="dashboard" onAppOpen={handleAppOpen} />
              )}
              {currentApp === "projects" && (
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <ProjectsApp
                    key="projects"
                    onBack={() => setCurrentApp("dashboard")}
                  />
                </Suspense>
              )}
              {currentApp === "blog" && (
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <BlogApp
                    key="blog"
                    onBack={() => setCurrentApp("dashboard")}
                  />
                </Suspense>
              )}
              {currentApp === "about" && (
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <AboutApp
                    key="about"
                    onBack={() => setCurrentApp("dashboard")}
                  />
                </Suspense>
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
