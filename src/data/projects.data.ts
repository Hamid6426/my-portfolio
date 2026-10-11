export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  tags: readonly string[] | string[];
  image: string;
  imageAlt: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Neptune EHSS",
    category: "Enterprise SaaS",
    description: "Health & safety SaaS for safer, smarter workplaces.",
    url: "https://neptunehs.com",
    tags: ["Next.js", ".NET Core", "PostgreSQL"],
    image: "/projects/neptunehs-hero.png",
    imageAlt: "Neptune EHSS website with its safety management dashboard",
  },
  {
    id: 2,
    title: "Optician Dynamics",
    category: "ERP & Point of Sale",
    description:
      "ERP & POS that simplifies the everyday for eyewear retailers.",
    url: "https://opticiandynamics.com",
    tags: ["Angular", "Node.js", "MongoDB"],
    image: "/projects/opticiandynamics-hero.png",
    imageAlt:
      "Optician Dynamics website showing its optical retail point-of-sale system",
  },
  {
    id: 3,
    title: "El Molino Drywall",
    category: "Contractor Website",
    description:
      "A service website for residential and commercial drywall installation, repair, and finishing.",
    url: "https://www.elmolinodrywall.com",
    tags: ["Responsive UI", "Service Pages", "Local Business"],
    image: "/projects/elmolinodrywall-hero.png",
    imageAlt:
      "El Molino Drywall website featuring its drywall services and a finished interior",
  },
  {
    id: 4,
    title: "3Q NextGen",
    category: "Logistics & International Trade",
    description:
      "A business website connecting global freight, industrial supply, and auto parts sourcing.",
    url: "https://www.3qnextgen.com",
    tags: ["Responsive UI", "SEO", "B2B"],
    image: "/projects/3qnextgen-hero.png",
    imageAlt:
      "3Q NextGen website showcasing freight and global supply services",
  },
  {
    id: 5,
    title: "Peak Construction",
    category: "SEO & Web Development",
    description: "An SEO-focused website for a trusted roofing contractor.",
    url: "https://peakconstruction.net",
    tags: ["Next.js", "Tailwind", "SEO"],
    image: "/projects/peakcontruction-hero.png",
    imageAlt:
      "Peak Construction website featuring a Washington roofing project",
  },
];
