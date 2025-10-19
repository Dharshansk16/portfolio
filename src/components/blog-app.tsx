"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface BlogAppProps {
  onBack: () => void;
}

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt:
      "Exploring the latest features and improvements in Next.js 14, including the new App Router and Server Components.",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    id: 2,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt:
      "A comprehensive guide to creating beautiful, responsive user interfaces using Tailwind CSS utility classes.",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["CSS", "Tailwind", "UI/UX"],
  },
  {
    id: 3,
    title: "State Management in React Applications",
    excerpt:
      "Comparing different state management solutions for React apps, from useState to Redux and Zustand.",
    date: "2024-01-05",
    readTime: "8 min read",
    tags: ["React", "State Management", "JavaScript"],
  },
];

function BlogApp({ onBack }: BlogAppProps) {
  const [terminalText, setTerminalText] = useState("");
  const [comingSoon, setComingSoon] = useState(false);
  const fullText = "> fetching latest blogs...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setComingSoon(true), 100);
      }
    }, 10);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "linear" }}
      className="min-h-screen p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-cyan-400">Blog</h1>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal Loading */}
      <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 font-mono mb-8">
        <div className="text-cyan-400">
          {terminalText}
          <span className="animate-pulse">_</span>
        </div>
      </div>

      {/* Blog Posts - Hidden for now */}
      {false && (
        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.2, ease: "linear" }}
              className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors ml-4" />
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Coming Soon Message */}
      {comingSoon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "linear" }}
          className="text-center mt-12 p-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-cyan-400 mb-2">
            Coming Soon!
          </h3>
          <p className="text-gray-400">
            Stay tuned for stories from my development journey.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default memo(BlogApp);
