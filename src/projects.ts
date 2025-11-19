// projects.ts

export type Project = {
  id: string;
  title: string;
  tagline: string;
  tech: string[];
  description: string;
  link?: string;
  image?: string;

  // Optional panel placement for the project info wall
  panel?: {
    position: [number, number, number]; // where the panel lives in world space
    rotationY: number;                  // rotation around Y axis (radians)
    width?: number;                     // optional plane width
    height?: number;                    // optional plane height
  };
};
export const PROJECTS: Project[] = [
  {
    id: "left",
    title: "A.R.M.",
    tagline: "Appendage Replication Machine",
    description:
      "A gesture-controlled robotic arm that moves in accordance with the user's own arm.",
    tech: ["Computer Vision", "Robotics"],
    image: "/images/placeholder.png",
    panel: {
      position: [-5.9, 4, 7],      // 0.1 in front of wall to avoid z-fighting
      rotationY: Math.PI / 2,     // face the room
      width: 4,
      height: 2.5,
    },
  },
  {
    id: "right",
    title: "Plastic Analysis",
    tagline: "Data Analysis on Chemicals in Food",
    description:
      "A data-driven analysis on endocrine-disrupting chemicals in food packaging.",
    tech: ["Data Analysis", "Data Scraping"],
    image: "/images/placeholder.png",
    panel: {
      position: [5.9, 4, 7],    // also higher
      rotationY: -Math.PI / 2,
      width: 2.7,
      height: 2.43,
    },
  },
  {
    id: "middle",
    title: "The Lingo Genie",
    tagline: "The language learning tool for Gen Z slang!",
    description:
      "A playful language-learning tool that teaches modern slang through interactive exercises.",
    tech: ["Frontend", "Backend", "SWE"],
    image: "/images/placeholder.png",
    panel: {
      position: [0, 13, -4.3],    // MUCH higher, centered above posters
      rotationY: 0,
      width: 10,                 // big center panel
      height: 9,
    },
  },
];
