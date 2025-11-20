// projects.ts

export type Project = {
  id: string;
  title: string;
  tagline: string;
  tech: string[];
  description: string;
  link?: string;

  image?: string; // poster thumbnail

  verticalImage?: string;
  horizontalImage?: string;

  panel?: {
    position: [number, number, number];
    rotationY: number;
    width?: number;
    height?: number;
  };
};

export const PROJECTS: Project[] = [
  {
    id: "left",
    title: "A.R.M.",
    tagline: "Appendage Replication Machine",
    description: 
    "A.R.M. is a gesture-controlled robotic arm powered primarily by computer vision. Using MediaPipe, the system tracks the user’s hand and extracts key points that show where the hand is in 3D space. A small classifier determines whether the hand is open or closed, and depth information helps estimate how far the hand is from the camera. These CV results are then mapped to the servos on a physical robotic arm, allowing the hardware to mimic the user’s movements in a simple, intuitive way.",
    tech: ["Computer Vision", "ML", "Robotics"],
    image: "/images/placeholder.png",
    link: "https://github.com/johnnyikuehnis/Gesture-Controlled-Arm",
    verticalImage: "/images/cv-vert.jpg",
    horizontalImage: "/images/cv-horiz.png",
    panel: {
      position: [-4.6, 4, 7],
      rotationY: Math.PI / 2,
      width: 1.77,
      height: 1.3,
    },
  },

  {
    id: "right",
    title: "Plastic Analysis",
    tagline: "Chemical Data Monitoring",
    description:
      "A data-driven analysis on endocrine-disrupting chemicals in food packaging.",
    tech: ["Data Scraping", "Data Analysis"],
    image: "/images/placeholder.png",
    verticalImage: "/images/placeholder-vert.png",
    horizontalImage: "/images/placeholder-horiz.png",
    panel: {
      position: [5.9, 4, 7],
      rotationY: -Math.PI / 2,
      width: 2.7,
      height: 2.43,
    },
  },

  {
    id: "middle",
    title: "The Lingo Genie",
    tagline: "Gen-Z Slang Learning Tool",
    description:
      "A playful language-learning tool that teaches modern slang with interactive exercises.",
    tech: ["Frontend", "Backend", "Full-stack"],
    image: "/images/placeholder.png",
    // verticalImage: "/images/mario.png",
    // horizontalImage: "/images/placeholder.png",
    panel: {
      position: [0, 13, 4.3],
      rotationY: 0,
      width: 3.0,
      height: 2.2,
    },
  },
];
