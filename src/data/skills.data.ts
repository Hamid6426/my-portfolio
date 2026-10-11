export interface SkillGroup {
  id: number;
  title: string;
  icon?: string;
  items: string[];
}

export const skillsData: SkillGroup[] = [
  {
    id: 1,
    title: "Languages",
    icon: "code",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Python",
      "C#",
      "Java",
      "Bash",
    ],
  },
  {
    id: 2,
    title: "Front-End",
    icon: "code",
    items: [
      "React.js",
      "Next.js",
      "Angular",
      "Astro",
      "SolidJS",
      "Three.js",
      "React-Native",
      "Tailwind",
      "Radix UI",
    ],
  },
  {
    id: 3,
    title: "Back-End",
    icon: "server",
    items: [
      "Node.js",
      "Bun",
      "Deno",
      "Express.js",
      "Nest.js",
      "Elysia",
      "FastAPI",
      ".NET Core",
      "Directus CMS",
    ],
  },
  {
    id: 4,
    title: "Databases",
    icon: "database",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Supabase",
      "Firebase",
      "SQL Server",
      "EF Core",
      "Prisma",
      "Redis",
    ],
  },
  {
    id: 5,
    title: "DevOps",
    icon: "cloud",
    items: [
      "Git/GitHub",
      "CI & CD",
      "Docker & Containerization",
      "VPS & Linux",
      "Oracle Cloud & Cloud Setup",
    ],
  },
  {
    id: 6,
    title: "AI & Agents",
    icon: "sparkles",
    items: [
      "AI Integration",
      "Workflows",
      "AI Agents & Agent Orchestration",
      "Claude Code",
      "Cursor",
    ],
  },
];
