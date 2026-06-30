"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
} from "lucide-react";
import Link from "next/link";
import MarkdownRenderer from "@/lib/mdx";
import MenuBar from "@/components/ui/menu-bar";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  content: string;
}

interface AdjacentPost {
  slug: string;
  title: string;
}

interface BlogPostClientProps {
  post: BlogPost;
  prevPost: AdjacentPost | null;
  nextPost: AdjacentPost | null;
}

function BlogPostClient({ post, prevPost, nextPost }: BlogPostClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(Math.min(progress, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <MenuBar />
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-zinc-900 dark:bg-zinc-100 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Article Header */}
      <header className="relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-12 sm:pb-16">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-12 relative z-10"
          >
            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">All Posts</span><span className="sm:hidden">Back</span>
              </Link>
              <Link
                href="/"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm text-sm font-medium"
              >
                Dashboard
              </Link>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all shadow-sm text-sm font-medium"
              aria-label="Share post"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-400 dark:text-zinc-500 mb-6"
          >
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
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>{post.author}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl"
          >
            {post.excerpt}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <MarkdownRenderer content={post.content} />
      </motion.article>

      {/* Post Footer */}
      <footer className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-bold text-zinc-900 dark:text-white text-lg">
                {post.author}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Building scalable backend applications and intelligent AI
                systems. Passionate about clean code and developer experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Adjacent Posts Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1 mb-2">
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors text-right"
            >
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1 justify-end mb-2">
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to all posts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:scale-105 transition-transform text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All Posts
          </Link>
        </motion.div>
      </footer>
    </div>
  );
}

export default memo(BlogPostClient);
