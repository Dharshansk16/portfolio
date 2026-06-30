"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogAppProps {
  onBack?: () => void;
  isEmbedded?: boolean;
  onViewAll?: () => void;
}

const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Mobile|Android|iPhone/i.test(navigator.userAgent);
};

function BlogApp({ onBack, isEmbedded = false, onViewAll }: BlogAppProps) {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [terminalText, setTerminalText] = useState("");
  const [comingSoon, setComingSoon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  const fullText = "> fetching latest blogs...";

  useEffect(() => {
    setIsMobile(isMobileDevice());
    
    // Fetch posts from API
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const speed = isMobile ? 20 : 10;
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setComingSoon(true), 500);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isMobile, fullText]);

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div
      className={`w-full bg-white dark:bg-black px-4 sm:px-6 lg:px-8 ${
        isEmbedded
          ? "py-16 border-t border-zinc-100 dark:border-zinc-900"
          : "min-h-screen overflow-y-auto"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto ${
          isEmbedded ? "" : "pt-20 pb-12 sm:pt-24 sm:pb-20"
        }`}
      >
        {/* Minimalist Back Button */}
        {!isEmbedded && onBack && (
          <div className="mb-12">
            <button
              onClick={onBack}
              className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm text-sm font-medium"
              aria-label="Back to Dashboard"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className={`mb-16 ${isEmbedded ? "text-center" : ""}`}
        >
          <h1
            className={`${
              isEmbedded ? "text-4xl sm:text-5xl" : "text-4xl sm:text-6xl"
            } font-black tracking-tight text-zinc-900 dark:text-white mb-4`}
          >
            Writing & Insights
          </h1>
          <p
            className={`${
              isEmbedded ? "text-lg max-w-2xl mx-auto" : "text-xl sm:text-2xl"
            } text-zinc-500 dark:text-zinc-400 font-medium`}
          >
            Thoughts on software engineering, design patterns, and building
            products.
          </p>
        </motion.div>

        {/* Terminal Animation (Hide in embedded mode for cleaner look) */}
        {!isEmbedded && (
          <div className="mb-12">
            <div className="font-mono text-zinc-500 text-sm">
              <span className="text-zinc-400">guest@portfolio:~/blog$ </span>
              {terminalText}
              <span className="animate-pulse font-bold ml-1">_</span>
            </div>
          </div>
        )}

        {/* Blog Posts List */}
        <div
          className={`space-y-12 ${
            !isEmbedded
              ? "mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-12"
              : ""
          }`}
        >
          {loading ? (
            <div className="animate-pulse space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-1/4 rounded"></div>
                  <div className="h-8 bg-zinc-200 dark:bg-zinc-800 w-3/4 rounded"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-full rounded"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-5/6 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            (isEmbedded ? blogPosts.slice(0, 2) : blogPosts).map(
              (post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="flex items-center space-x-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                    <span>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-zinc-500 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm font-medium text-zinc-900 dark:text-white underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              )
            )
          )}
          
          {!loading && blogPosts.length === 0 && (
             <p className="text-zinc-500 dark:text-zinc-400">No posts found.</p>
          )}
        </div>

        {isEmbedded && onViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-12 mb-8"
          >
            <button
              onClick={() => {
                if (onViewAll) onViewAll();
                // Optionally redirect to full blog page route
                // router.push("/blog");
              }}
              className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-full hover:scale-105 transition-transform"
            >
              View All Posts
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default memo(BlogApp);
