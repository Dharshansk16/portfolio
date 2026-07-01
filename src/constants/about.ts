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
    role: "HPE CPP Intern",
    company: "Hewlett Packard Enterprise",
    period: "Feb 2026 - Present",
    description: [
      "Built an event-driven pipeline auto-ingesting and normalising docs from GitHub, Confluence, and Jira.",
      "Designed an AI classification agent using multi-medoid clustering and vector pre-filtering to auto-group docs.",
      "Deployed a 3-layer Dockerized RAG service on Azure with tracing, delivering source-cited answers over the Knowledge.",
    ],
    icon: Flame,
    current: true,
  },
  {
    role: "Software Development Intern",
    company: "Inspirante Technologies Pvt. Ltd.",
    period: "Oct 2025 - Present",
    description: [
      "Developing a scalable hostel management system supporting 3000+ students with role-based access control (RBAC).",
      "Engineering core modules including attendance tracking (biometric-integrated), bulk notifications, authentication.",
      "Automated bulk student onboarding via Excel ingestion with flexible schema handling and room allocation workflows.",
    ],
    icon: Server,
    current: true,
  },
  {
    role: "DSA Advisor",
    company: "Finite Loop Club",
    period: "2026 - Present",
    description: [
      "Advising and mentoring the core committee and students in advanced data structures and algorithms.",
    ],
    icon: Users,
    current: true,
  },
  {
    role: "DSA Lead",
    company: "Finite Loop Club",
    period: "2025 - 2026",
    description: [
      "Led a comprehensive DSA sprint, mentoring peers and conducting Career Readiness Programs.",
    ],
    icon: Users,
    current: false,
  },
];

export const education = [
  {
    degree: "B.E., Computer Science & Engineering",
    institution: "NMAM Institute of Technology",
    period: "2023 - 2027",
    description:
      "CGPA: 9.65/10.00 - Course works: Object Oriented Programming, Database, Operating System, Networking",
    icon: GraduationCap,
  },
  {
    degree: "Pre-University Education - PCMCs",
    institution: "Vidyodaya Pre-University College",
    period: "2021 - 2023",
    description: "Aggregate: 97.67/100 - Karnataka State Board",
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
