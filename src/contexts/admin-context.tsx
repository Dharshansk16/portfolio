"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  color: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

interface AboutData {
  name: string;
  title: string;
  bio: string;
  location: string;
  experience: string;
  favoriteEditor: string;
  currentFocus: string;
  skills: Array<{
    name: string;
    level: number;
    color: string;
  }>;
  techStack: string[];
}

interface AdminContextType {
  projects: Project[];
  blogs: BlogPost[];
  aboutData: AboutData;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addBlog: (blog: Omit<BlogPost, "id">) => void;
  updateBlog: (id: number, blog: Partial<BlogPost>) => void;
  deleteBlog: (id: number) => void;
  updateAboutData: (data: AboutData) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    github: "https://github.com",
    live: "https://demo.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com",
    live: "https://demo.com",
    color: "from-green-500 to-emerald-500",
  },
];

const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt:
      "Exploring the latest features and improvements in Next.js 14, including the new App Router and Server Components.",
    content: "Full blog content here...",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["Next.js", "React", "Web Development"],
    published: true,
  },
  {
    id: 2,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt:
      "A comprehensive guide to creating beautiful, responsive user interfaces using Tailwind CSS utility classes.",
    content: "Full blog content here...",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["CSS", "Tailwind", "UI/UX"],
    published: false,
  },
];

const initialAboutData: AboutData = {
  name: "Dharshan",
  title: "Full Stack Developer",
  bio: "Passionate fresher developer with a love for creating beautiful, functional web applications. Always eager to learn new technologies and solve complex problems.",
  location: "India",
  experience: "Fresher",
  favoriteEditor: "VS Code",
  currentFocus: "React & Next.js",
  skills: [
    { name: "React", level: 85, color: "bg-blue-500" },
    { name: "Next.js", level: 80, color: "bg-gray-500" },
    { name: "TypeScript", level: 75, color: "bg-blue-600" },
    { name: "TailwindCSS", level: 90, color: "bg-cyan-500" },
  ],
  techStack: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "TailwindCSS",
    "Node.js",
  ],
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [aboutData, setAboutData] = useState<AboutData>(initialAboutData);

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now() };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: number, updatedProject: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const addBlog = (blog: Omit<BlogPost, "id">) => {
    const newBlog = { ...blog, id: Date.now() };
    setBlogs((prev) => [...prev, newBlog]);
  };

  const updateBlog = (id: number, updatedBlog: Partial<BlogPost>) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === id ? { ...blog, ...updatedBlog } : blog))
    );
  };

  const deleteBlog = (id: number) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  const updateAboutData = (data: AboutData) => {
    setAboutData(data);
  };

  return (
    <AdminContext.Provider
      value={{
        projects,
        blogs,
        aboutData,
        addProject,
        updateProject,
        deleteProject,
        addBlog,
        updateBlog,
        deleteBlog,
        updateAboutData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}
