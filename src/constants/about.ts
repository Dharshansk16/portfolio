import { Brain, Users, Server, Flame} from"lucide-react";

export const stats = [
 {
 label:"AI & Agentic Systems",
 value:"Agentic RAG & Graph DBs",
 description:
"Built hybrid RAG architectures combining knowledge graphs (Neo4j) and vector databases.",
 icon: Brain,
 color:"text-zinc-900 dark:text-zinc-100",
},
 {
 label:"Leadership & Mentorship",
 value:"DSA Lead, Finite Loop Club",
 description:
"Led a 4-month DSA sprint, mentoring peers and conducting Career Readiness Programs.",
 icon: Users,
 color:"text-zinc-900 dark:text-zinc-100",
},
 {
 label:"Backend Development",
 value:"Distributed Architecture",
 description:
"Engineered event-driven pipelines, multi-layered microservices, and scalable systems.",
 icon: Server,
 color:"text-zinc-900 dark:text-zinc-100",
},
 {
 label:"Developer Journey",
 value:"Intern at HPE",
 description:
"Currently building AI classification pipelines and RAG services at Hewlett Packard Enterprise.",
 icon: Flame,
 color:"text-zinc-900 dark:text-zinc-100",
},
];

export const skills = [
 { name:"AI Systems", level: 90, color:"bg-zinc-900 dark:bg-zinc-200"},
 { name:"Backend", level: 85, color:"bg-slate-700 dark:bg-slate-300"},
 { name:"Frontend", level: 80, color:"bg-slate-600 dark:bg-slate-400"},
 { name:"Databases", level: 85, color:"bg-zinc-900 dark:bg-zinc-200"},
 { name:"Cloud & DevOps", level: 80, color:"bg-slate-700 dark:bg-slate-300"},
];

export const techGroups = {
"AI Systems": ["RAG","Agentic Systems","LangChain","LangGraph","Knowledge Graphs"],
"Frontend Tools": ["React","Next.js","TailwindCSS"],
"Backend & DB": [
"FastAPI",
"Django",
"Node.js",
"PostgreSQL",
"Neo4j",
"MongoDB",
"Redis"
 ],
"Cloud & DevOps": ["Azure","Docker","Kubernetes","Git","GitHub"],
};

export const aboutMeText =`Computer Science student with hands-on experience building agentic RAG systems and event-driven backend architectures.
Currently interning at Hewlett Packard Enterprise and Inspirante Technologies, building AI classification pipelines and scalable data ingestion systems. Interested in AI systems, distributed architectures, and backend engineering.`;
