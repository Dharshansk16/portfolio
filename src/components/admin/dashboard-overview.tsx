"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  FileText,
  User,
  Eye,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminContext } from "@/contexts/admin-context";

const stats = [
  {
    title: "Total Projects",
    value: "12",
    change: "+2 this month",
    icon: FolderOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Blog Posts",
    value: "8",
    change: "+1 this week",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Profile Views",
    value: "1,234",
    change: "+15% this month",
    icon: Eye,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Last Updated",
    value: "2 days ago",
    change: "About section",
    icon: Calendar,
    color: "from-orange-500 to-red-500",
  },
];

const recentActivity = [
  {
    action: "Updated project",
    item: "E-Commerce Platform",
    time: "2 hours ago",
  },
  {
    action: "Published blog post",
    item: "Getting Started with Next.js 14",
    time: "1 day ago",
  },
  {
    action: "Modified about section",
    item: "Skills updated",
    time: "2 days ago",
  },
  {
    action: "Added new project",
    item: "Weather Dashboard",
    time: "1 week ago",
  },
];

export default function DashboardOverview() {
  const { projects, blogs } = useAdminContext();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Welcome back, Dharshan!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your portfolio today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/50 backdrop-blur-sm border-white/10 hover:border-cyan-500/50 transition-all duration-300">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-black/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-white/5"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        <span className="text-cyan-400">{activity.action}</span>{" "}
                        - {activity.item}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-black/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-colors text-left">
                  <FolderOpen className="w-6 h-6 text-cyan-400 mb-2" />
                  <p className="text-sm font-medium text-white">Add Project</p>
                  <p className="text-xs text-gray-400">Create new project</p>
                </button>
                <button className="p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400 transition-colors text-left">
                  <FileText className="w-6 h-6 text-emerald-400 mb-2" />
                  <p className="text-sm font-medium text-white">Write Blog</p>
                  <p className="text-xs text-gray-400">New blog post</p>
                </button>
                <button className="p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-400 transition-colors text-left">
                  <User className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-sm font-medium text-white">Edit Profile</p>
                  <p className="text-xs text-gray-400">Update about section</p>
                </button>
                <button className="p-4 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:border-orange-400 transition-colors text-left">
                  <Eye className="w-6 h-6 text-orange-400 mb-2" />
                  <p className="text-sm font-medium text-white">View Site</p>
                  <p className="text-xs text-gray-400">Preview portfolio</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
