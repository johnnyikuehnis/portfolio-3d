export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  link?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Project One",
    tagline: "A sample project",
    description: "Description for project one.",
    tech: ["TypeScript", "React", "Three.js"],
  },
  {
    id: "p2",
    title: "Project Two",
    tagline: "Another sample",
    description: "Description for project two.",
    tech: ["Go", "B+ Trees", "Concurrency"],
  },
  {
    id: "p3",
    title: "Project Three",
    tagline: "Last placeholder",
    description: "Description for project three.",
    tech: ["C++", "OpenGL", "Shaders"],
  },
];
