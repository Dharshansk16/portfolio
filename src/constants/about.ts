import { Brain, Users, Server, Flame } from "lucide-react";

export const stats = [
  {
    label: "Problem Solving",
    value: "400+ Leetode Problems Solved",
    description:
      "Strong analytical skills honed through competitive programming and algorithmic thinking.",
    icon: Brain,
    color: "text-blue-500",
  },
  {
    label: "Leadership & Mentorship",
    value: "CP Team Lead",
    description:
      "Led coding club initiatives, mentored juniors, and organized contests and workshops.",
    icon: Users,
    color: "text-purple-500",
  },
  {
    label: "Backend Development",
    value: "Robust API Systems",
    description:
      "Built secure, scalable backends using Django, REST, PostgreSQL, Prisma, and auth systems.",
    icon: Server,
    color: "text-green-500",
  },
  {
    label: "Developer Journey",
    value: "3+ Years Learning",
    description:
      "Continual growth in full-stack dev, system design, and software craftsmanship.",
    icon: Flame,
    color: "text-orange-500",
  },
];

export const skills = [
  { name: "Problem Solving", level: 90, color: "bg-yellow-500" },
  { name: "Frontend", level: 80, color: "bg-green-500" },
  { name: "Backend", level: 85, color: "bg-blue-500" },
  { name: "UI/UX", level: 80, color: "bg-gray-500" },
  { name: "DevOps", level: 75, color: "bg-blue-600" },
];

export const techGroups = {
  "Core Languages": ["Python", "TypeScript", "C++"],
  "Frontend Tools": ["React", "Next.js", "TailwindCSS"],
  "Backend & DB": [
    "Django",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
  ],
  "DevOps & Utilities": ["Docker", "Git", "GitHub", "Vercel"],
};

export const aboutMeText = `I thrive on solving real problems, exploring new tech, and building projects that excite me.
Curious by nature, always learning, always building — that’s what keeps me going`;
