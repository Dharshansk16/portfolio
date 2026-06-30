import { Brain, Users, Server, Flame, GraduationCap } from "lucide-react";

export const personalInfo = {
  name: "Dharshan S Kotian",
  title: "Full Stack Developer",
  tagline: "Bridging the gap between design and scalable engineering.",
  location: "India",
  bio: `Computer Science student with hands-on experience building agentic RAG systems and event-driven backend architectures. Currently interning at Hewlett Packard Enterprise and Inspirante Technologies, building AI classification pipelines and scalable data ingestion systems. Interested in AI systems, distributed architectures, and backend engineering.`,
  socials: {
    github: "https://github.com/Dharshansk16",
    linkedin: "https://www.linkedin.com/in/dharshan-s-kotian-5053aa280/",
    leetcode: "https://leetcode.com/u/Dharshan_S_Kotian/",
  },
};

export const experience = [
  {
    role: "Software Engineering Intern",
    company: "Hewlett Packard Enterprise",
    period: "Present",
    description:
      "Building AI classification pipelines and RAG services for enterprise-grade data processing.",
    icon: Flame,
    current: true,
  },
  {
    role: "Software Engineering Intern",
    company: "Inspirante Technologies",
    period: "2024",
    description:
      "Developed scalable data ingestion systems and event-driven microservice architectures.",
    icon: Server,
    current: false,
  },
  {
    role: "DSA Lead",
    company: "Finite Loop Club",
    period: "2023 – 2024",
    description:
      "Led a 4-month DSA sprint, mentoring peers and conducting Career Readiness Programs.",
    icon: Users,
    current: false,
  },
];

export const education = [
  {
    degree: "B.E. in Computer Science",
    institution: "NMAM Institute of Technology",
    period: "2022 – 2026",
    icon: GraduationCap,
  },
];

export const highlights = [
  {
    label: "AI & Agentic Systems",
    value: "Agentic RAG & Graph DBs",
    description:
      "Built hybrid RAG architectures combining knowledge graphs (Neo4j) and vector databases.",
    icon: Brain,
  },
  {
    label: "Backend Development",
    value: "Distributed Architecture",
    description:
      "Engineered event-driven pipelines, multi-layered microservices, and scalable systems.",
    icon: Server,
  },
];

export const skills = [
  { name: "AI Systems", level: 90 },
  { name: "Backend", level: 85 },
  { name: "Frontend", level: 80 },
  { name: "Databases", level: 85 },
  { name: "Cloud & DevOps", level: 80 },
];

export const techGroups: Record<string, { name: string; color: string }[]> = {
  "AI Systems": [
    { name: "RAG", color: "#8b5cf6" },
    { name: "Agentic Systems", color: "#7c3aed" },
    { name: "LangChain", color: "#6d28d9" },
    { name: "LangGraph", color: "#5b21b6" },
    { name: "Knowledge Graphs", color: "#4c1d95" },
  ],
  Frontend: [
    { name: "React", color: "#06b6d4" },
    { name: "Next.js", color: "#0ea5e9" },
    { name: "TailwindCSS", color: "#0284c7" },
  ],
  "Backend & DB": [
    { name: "FastAPI", color: "#10b981" },
    { name: "Django", color: "#059669" },
    { name: "Node.js", color: "#047857" },
    { name: "PostgreSQL", color: "#0d9488" },
    { name: "Neo4j", color: "#14b8a6" },
    { name: "MongoDB", color: "#0f766e" },
    { name: "Redis", color: "#0e7490" },
  ],
  "Cloud & DevOps": [
    { name: "Azure", color: "#f59e0b" },
    { name: "Docker", color: "#d97706" },
    { name: "Kubernetes", color: "#b45309" },
    { name: "Git", color: "#92400e" },
    { name: "GitHub", color: "#78350f" },
  ],
};

// Keep legacy exports for backward compatibility with embedded mode
export const stats = [
  {
    label: "AI & Agentic Systems",
    value: "Agentic RAG & Graph DBs",
    description:
      "Built hybrid RAG architectures combining knowledge graphs (Neo4j) and vector databases.",
    icon: Brain,
    color: "text-zinc-900 dark:text-zinc-100",
  },
  {
    label: "Leadership & Mentorship",
    value: "DSA Lead, Finite Loop Club",
    description:
      "Led a 4-month DSA sprint, mentoring peers and conducting Career Readiness Programs.",
    icon: Users,
    color: "text-zinc-900 dark:text-zinc-100",
  },
  {
    label: "Backend Development",
    value: "Distributed Architecture",
    description:
      "Engineered event-driven pipelines, multi-layered microservices, and scalable systems.",
    icon: Server,
    color: "text-zinc-900 dark:text-zinc-100",
  },
  {
    label: "Developer Journey",
    value: "Intern at HPE",
    description:
      "Currently building AI classification pipelines and RAG services at Hewlett Packard Enterprise.",
    icon: Flame,
    color: "text-zinc-900 dark:text-zinc-100",
  },
];

export const aboutMeText = `Computer Science student with hands-on experience building agentic RAG systems and event-driven backend architectures.
Currently interning at Hewlett Packard Enterprise and Inspirante Technologies, building AI classification pipelines and scalable data ingestion systems. Interested in AI systems, distributed architectures, and backend engineering.`;
