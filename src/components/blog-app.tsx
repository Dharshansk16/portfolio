"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Clock, ArrowRight, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import OSWindow from "@/components/ui/os-window";

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
    <div className="min-h-screen relative pt-12 pb-24 sm:pb-28 px-2 sm:px-4 md:px-6">
      <OSWindow
        title="Blog"
        subtitle="~/portfolio/blog"
        icon={<FileText className="w-5 h-5" />}
        onClose={onBack}
        accentColor="purple"
        className="max-w-5xl mx-auto h-[calc(100vh-8rem)]"
      >
        <div className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin p-4 sm:p-5 md:p-6">
          {/* Terminal Loading Animation - Compact */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 sm:p-4 font-mono mb-4 sm:mb-5 shadow-lg shadow-cyan-500/10">
            <div className="flex items-center space-x-2 mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] sm:text-xs text-gray-500">
                darsh@devspace:~/blog$
              </span>
            </div>
            <div className="text-cyan-400 text-xs sm:text-sm">
              {terminalText}
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Blog Posts - Hidden for now */}
          {false && (
            <div className="space-y-3 sm:space-y-4">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold text-white mb-1.5 group-hover:text-purple-400 transition-colors truncate">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] sm:text-xs rounded-md border border-purple-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-3 text-[10px] sm:text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Coming Soon Message - Compact */}
          {comingSoon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center mt-6 sm:mt-8 p-6 sm:p-10 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-lg shadow-purple-500/10"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-purple-500/50">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                Coming Soon!
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
                Stay tuned for insightful articles and stories from my
                development journey.
              </p>
            </motion.div>
          )}
        </div>
      </OSWindow>
    </div>
  );
}

export default memo(BlogApp);
