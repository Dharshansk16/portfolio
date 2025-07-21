"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Download, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function SettingsManager() {
  const [settings, setSettings] = useState({
    siteTitle: "Dharshan's DevSpace",
    siteDescription:
      "A futuristic OS-style portfolio showcasing web development projects and skills",
    contactEmail: "dharshan@example.com",
    contactPhone: "+91 12345 67890",
    githubUrl: "https://github.com/Dharshansk16",
    linkedinUrl: "https://linkedin.com/in/dharshan",
    twitterUrl: "https://twitter.com/dharshan",
    resumeUrl: "/resume.pdf",
    enableParticles: true,
    enableMusic: false,
    enableAnalytics: true,
    maintenanceMode: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("Resume uploaded:", file.name);
    }
  };

  const exportData = () => {
    const data = {
      settings,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearCache = () => {
    if (confirm("Are you sure you want to clear all cached data?")) {
      localStorage.clear();
      sessionStorage.clear();
      alert("Cache cleared successfully!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">
            Manage your portfolio settings and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
        >
          {isSaving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Settings */}
        <Card className="bg-black/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Site Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Title
              </label>
              <Input
                value={settings.siteTitle}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    siteTitle: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Description
              </label>
              <Input
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    siteDescription: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Maintenance Mode
              </label>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-black/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contactEmail: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <Input
                value={settings.contactPhone}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contactPhone: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-black/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL
              </label>
              <Input
                value={settings.githubUrl}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    githubUrl: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn URL
              </label>
              <Input
                value={settings.linkedinUrl}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    linkedinUrl: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter URL
              </label>
              <Input
                value={settings.twitterUrl}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    twitterUrl: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="bg-black/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Enable Particles
              </label>
              <Switch
                checked={settings.enableParticles}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, enableParticles: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Enable Background Music
              </label>
              <Switch
                checked={settings.enableMusic}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, enableMusic: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Enable Analytics
              </label>
              <Switch
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, enableAnalytics: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Management */}
      <Card className="bg-black/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Resume Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Resume
              </label>
              <Input
                value={settings.resumeUrl}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    resumeUrl: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
                readOnly
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() =>
                  document.getElementById("resume-upload")?.click()
                }
                className="bg-cyan-500 hover:bg-cyan-600 text-black"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
              <Button
                onClick={() => window.open(settings.resumeUrl, "_blank")}
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-black/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={exportData}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
            <Button
              onClick={clearCache}
              variant="outline"
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
