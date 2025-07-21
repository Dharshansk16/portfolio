"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AdminLogin from "@/components/admin/admin-login";
import AdminDashboard from "@/components/admin/admin-dashboard";
import { AdminProvider } from "@/contexts/admin-context";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-black">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <AdminLogin key="login" onLogin={() => setIsAuthenticated(true)} />
          ) : (
            <AdminDashboard
              key="dashboard"
              onLogout={() => setIsAuthenticated(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </AdminProvider>
  );
}
