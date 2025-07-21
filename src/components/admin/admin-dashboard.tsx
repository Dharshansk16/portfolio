"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardOverview from "./dashboard-overview";
import ProjectsManager from "./projects-manager";
import BlogsManager from "./blogs-manager";
import AboutManager from "./about-manager";
import SettingsManager from "./settings-manager";

interface AdminDashboardProps {
  onLogout: () => void;
}

export type AdminSection =
  | "overview"
  | "projects"
  | "blogs"
  | "about"
  | "settings";

const sidebarItems = [
  { id: "overview" as AdminSection, label: "Overview", icon: LayoutDashboard },
  { id: "projects" as AdminSection, label: "Projects", icon: FolderOpen },
  { id: "blogs" as AdminSection, label: "Blogs", icon: FileText },
  { id: "about" as AdminSection, label: "About", icon: User },
  { id: "settings" as AdminSection, label: "Settings", icon: Settings },
];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    onLogout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "projects":
        return <ProjectsManager />;
      case "blogs":
        return <BlogsManager />;
      case "about":
        return <AboutManager />;
      case "settings":
        return <SettingsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-black">D</span>
                </div>
                <span className="font-semibold text-white">Admin Panel</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen lg:ml-0">
          {/* Header */}
          <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold capitalize">
                {activeSection}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 hidden sm:block">
                Welcome back, Dharshan
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Content */}
          <main className="p-4 lg:p-6 max-w-7xl mx-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </motion.div>
  );
}
