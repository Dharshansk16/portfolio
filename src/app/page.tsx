"use client";

import { useState, useEffect, lazy, Suspense} from"react";
import { motion, AnimatePresence} from"framer-motion";
import BootScreen from"@/components/boot-screen";
import Dashboard from"@/components/dashboard";
import ContactModal from"@/components/contact-modal";
import FloatingDock from"@/components/floating-dock";
import MenuBar from"@/components/ui/menu-bar";
import BackgroundEffects from"@/components/particles/background-effects";
import CursorTrail from"@/components/animations/cursor-trail";
import EasterEggs from"@/components/effects/easter-eggs";
import SpotlightSearch from"@/components/ui/spotlight-search";
import UIHints from"@/components/ui/ui-hints";

// Lazy load heavy app components to reduce initial bundle
const ProjectsApp = lazy(() => import("@/components/projects-app"));
const BlogApp = lazy(() => import("@/components/blog-app"));
const AboutApp = lazy(() => import("@/components/about-app"));
const AchievementsApp = lazy(() => import("@/components/achievements-app"));

// Optimized loading component
const AppLoader = () => (
 <div className="min-h-screen flex items-center justify-center">
 <div className="flex flex-col items-center gap-3">
 <div className="w-10 h-10 border-3 border-zinc-800 dark:border-zinc-200 border-t-transparent rounded-full animate-spin" />
 <p className="text-sm text-gray-400">Loading...</p>
 </div>
 </div>
);

export type AppType ="dashboard" |"projects" |"blog" |"about" |"achievements";

// Detect if device is low-end
const isLowEndDevice = () => {
 if (typeof window ==="undefined") return false;
 return (
 navigator.hardwareConcurrency <= 4 ||
 /Mobile|Android|iPhone/i.test(navigator.userAgent)
 );
};

export default function DevSpaceOS() {
 const [isBooted, setIsBooted] = useState(false);
 const [currentApp, setCurrentApp] = useState<AppType>("dashboard");
 const [isContactOpen, setIsContactOpen] = useState(false);
 const [showParticles, setShowParticles] = useState(false);
 const [isLowEnd, setIsLowEnd] = useState(false);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 // Ensure we're on client side
 setMounted(true);
 setIsLowEnd(isLowEndDevice());

 // Check if we've already booted in this session
 const hasBooted = sessionStorage.getItem("devspace_booted");
 
 if (hasBooted === "true") {
   setIsBooted(true);
 } else {
   // Shorter boot time - optimized for faster loading
   const bootTime = isLowEndDevice() ? 2000 : 2800;
   const timer = setTimeout(() => {
     setIsBooted(true);
     sessionStorage.setItem("devspace_booted", "true");
   }, bootTime);
   return () => clearTimeout(timer);
 }
}, []);

  const handleAppOpen = (app: AppType) => {
    setCurrentApp(app);
  };

 // Don't render until mounted on client
 if (!mounted) {
 return (
 <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center">
 <div className="animate-pulse text-zinc-500 dark:text-zinc-400">Loading...</div>
 </div>
 );
 }

 return (
 <div
 className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white overflow-hidden relative"
 style={{ willChange:"auto"}}
 >
 {/* Simplified Ambient Gradient Orbs - Only on high-end devices and reduced complexity */}
 {!isLowEnd && isBooted && (
 <div className="fixed inset-0 overflow-hidden pointer-events-none">
 <div
 className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-zinc-200/20 dark:bg-zinc-900/10 rounded-full"
 style={{ filter:"blur(100px)"}}
 />
 <div
 className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-zinc-200/20 dark:bg-zinc-900/10 rounded-full"
 style={{ filter:"blur(100px)"}}
 />
 </div>
 )}

 {/* Background Effects - Only show if effects are toggled on */}
 {isBooted && showParticles && <BackgroundEffects showParticles={showParticles} />}

 {/* Cursor Trail Effect - Only if effects are toggled on */}
 {isBooted && showParticles && !isLowEnd && <CursorTrail />}

 {/* Unique UI Enhancements */}
 {isBooted && (
 <>
 <MenuBar />
 <EasterEggs />
 <SpotlightSearch
 onNavigate={handleAppOpen}
 onContactOpen={() => setIsContactOpen(true)}
 />
 <UIHints />
 </>
 )}

 {/* Refined Vignette Overlay */}
 <div className="fixed inset-0 bg-zinc-100 dark:bg-zinc-950 pointer-events-none z-0" />

 <AnimatePresence mode="wait">
 {!isBooted ? (
 <BootScreen key="boot" />
 ) : (
 <motion.div
 key="main"
 initial={{ opacity: 0}}
 animate={{ opacity: 1}}
 exit={{ opacity: 0}}
 transition={{
 duration: isLowEnd ? 0.2 : 0.5,
 ease:"easeOut",
 }}
 className="relative z-10 h-screen w-full overflow-y-auto overflow-x-hidden"
 >
 <AnimatePresence mode="wait">
 {currentApp ==="dashboard" && (
 <motion.div
 key="dashboard-scrollable"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="flex flex-col w-full"
 >
 <div id="dashboard">
 <Dashboard onAppOpen={handleAppOpen} showParticles={showParticles} />
 </div>
  <div id="about">
  <Suspense fallback={<AppLoader />}>
  <AboutApp isEmbedded onViewAll={() => setCurrentApp("about")} />
  </Suspense>
  </div>
  <div id="projects">
  <Suspense fallback={<AppLoader />}>
  <ProjectsApp isEmbedded onViewAll={() => setCurrentApp("projects")} />
  </Suspense>
  </div>
  <div id="achievements">
  <Suspense fallback={<AppLoader />}>
  <AchievementsApp isEmbedded onViewAll={() => setCurrentApp("achievements")} />
  </Suspense>
  </div>
  <div id="blog">
  <Suspense fallback={<AppLoader />}>
  <BlogApp isEmbedded onViewAll={() => setCurrentApp("blog")} />
  </Suspense>
  </div>
  </motion.div>
 )}
 {currentApp ==="projects" && (
 <Suspense fallback={<AppLoader />}>
 <ProjectsApp
 key="projects"
 onBack={() => setCurrentApp("dashboard")}
 />
 </Suspense>
 )}
 {currentApp ==="blog" && (
 <Suspense fallback={<AppLoader />}>
 <BlogApp
 key="blog"
 onBack={() => setCurrentApp("dashboard")}
 />
 </Suspense>
 )}
 {currentApp ==="about" && (
 <Suspense fallback={<AppLoader />}>
 <AboutApp
 key="about"
 onBack={() => setCurrentApp("dashboard")}
 />
  </Suspense>
  )}
  {currentApp ==="achievements" && (
  <Suspense fallback={<AppLoader />}>
  <AchievementsApp
  key="achievements"
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
