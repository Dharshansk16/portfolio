"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import MenuBar from "@/components/ui/menu-bar";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}

interface BlogListClientProps {
  posts: BlogPost[];
}

const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

function BlogListClient({ posts }: BlogListClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [terminalDone, setTerminalDone] = useState(false);
  const fullText = `> found ${posts.length} posts. rendering...`;

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    const speed = isMobile ? 25 : 15;
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setTerminalDone(true), 300);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [isMobile, fullText]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <MenuBar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 relative z-10"
          >
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-slate-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-800 dark:text-white mb-6">
              Writing &<br />
              <span className="text-zinc-400 dark:text-zinc-600">Insights</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-xl leading-relaxed">
              Thoughts on software engineering, developer mindset, and building
              products that matter.
            </p>
          </motion.div>

          {/* Terminal Line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 font-mono text-sm text-zinc-400"
          >
            <span className="text-zinc-300 dark:text-zinc-600">
              guest@portfolio:~/blog${" "}
            </span>
            {terminalText}
            {!terminalDone && (
              <span className="animate-pulse font-bold ml-0.5">_</span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="space-y-0">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={terminalDone ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="py-10 sm:py-14 border-b border-zinc-100 dark:border-zinc-900 last:border-none">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-sm font-medium text-zinc-400 dark:text-zinc-500 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors duration-300 leading-tight">
                    {post.title}
                    <ArrowUpRight className="inline-block w-5 h-5 sm:w-6 sm:h-6 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h2>

                  {/* Excerpt */}
                  <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Post Count Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={terminalDone ? { opacity: 1 } : {}}
          transition={{ delay: posts.length * 0.12 + 0.3 }}
          className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800"
        >
          <p className="text-sm font-mono text-zinc-400 dark:text-zinc-600 text-center">
            {posts.length} post{posts.length !== 1 ? "s" : ""} published ·
            more coming soon
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default memo(BlogListClient);
