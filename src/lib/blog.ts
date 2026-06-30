import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  content: string;
}

// ---------------------------------------------------------------------------
// Frontmatter parser – no external dependencies
// ---------------------------------------------------------------------------

interface ParsedFile {
  metadata: Record<string, string | string[]>;
  content: string;
}

/**
 * Parse a raw MDX / Markdown file string and separate the YAML-like
 * frontmatter from the body content.
 *
 * Supports:
 *   key: "value"          → string
 *   key: value             → string (quotes are optional)
 *   key: ["a", "b", "c"]  → string[]
 */
function parseFrontmatter(raw: string): ParsedFile {
  const trimmed = raw.trimStart();

  // The file must start with "---"
  if (!trimmed.startsWith("---")) {
    return { metadata: {}, content: raw };
  }

  // Find the closing "---" delimiter (skip the opening one)
  const firstNewline = trimmed.indexOf("\n");
  const closingIndex = trimmed.indexOf("---", firstNewline);

  if (closingIndex === -1) {
    return { metadata: {}, content: raw };
  }

  const frontmatterBlock = trimmed.slice(firstNewline + 1, closingIndex);
  const content = trimmed.slice(closingIndex + 3).trimStart();

  const metadata: Record<string, string | string[]> = {};

  for (const line of frontmatterBlock.split("\n")) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) continue;

    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex === -1) continue;

    const key = trimmedLine.slice(0, colonIndex).trim();
    let value = trimmedLine.slice(colonIndex + 1).trim();

    // Handle array values: ["a", "b", "c"]
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1);
      metadata[key] = inner
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      // Strip surrounding quotes if present
      metadata[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return { metadata, content };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function ensureBlogDir(): boolean {
  return fs.existsSync(BLOG_DIR);
}

function fileToPost(filename: string): BlogPost | null {
  const slug = filename.replace(/\.mdx?$/, "");
  const filePath = path.join(BLOG_DIR, filename);

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }

  const { metadata, content } = parseFrontmatter(raw);

  return {
    slug,
    title: (metadata.title as string) ?? slug,
    excerpt: (metadata.excerpt as string) ?? "",
    date: (metadata.date as string) ?? "",
    readTime: (metadata.readTime as string) ?? "",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    author: (metadata.author as string) ?? "",
    content,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Return every blog post, sorted by date descending (newest first).
 */
export function getAllPosts(): BlogPost[] {
  if (!ensureBlogDir()) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f));

  const posts = files
    .map(fileToPost)
    .filter((p): p is BlogPost => p !== null);

  // Sort newest first
  posts.sort((a, b) => {
    const da = new Date(a.date).getTime() || 0;
    const db = new Date(b.date).getTime() || 0;
    return db - da;
  });

  return posts;
}

/**
 * Look up a single post by its slug (filename without extension).
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  if (!ensureBlogDir()) return undefined;

  // Try .mdx first, then .md
  for (const ext of [".mdx", ".md"]) {
    const filename = `${slug}${ext}`;
    const filePath = path.join(BLOG_DIR, filename);
    if (fs.existsSync(filePath)) {
      return fileToPost(filename) ?? undefined;
    }
  }

  return undefined;
}

/**
 * Return all available slugs (useful for static path generation).
 */
export function getAllSlugs(): string[] {
  if (!ensureBlogDir()) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}
