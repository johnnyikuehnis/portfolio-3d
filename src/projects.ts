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
    image: "/images/arm-thumbnail.png",
    link: "https://github.com/johnnyikuehnis/Gesture-Controlled-Arm",
    verticalImage: "/images/cv-vert.jpg",
    horizontalImage: "/images/cv-horiz.png",
    panel: {
      position: [-5.3, 4, 7],
      rotationY: Math.PI / 2,
      width: 2.655,
      height: 1.95,
    },
  },

  {
    id: "right",
    title: "Plastic Analysis",
    tagline: "Chemical Data Monitoring",
    description:
      "This project analyzes endocrine-disrupting chemicals (EDCs) found in food and packaging by combining scraped datasets with statistical tests and simple machine learning models. We examined relationships between DEHP/DBP concentrations and food categories, tested several hypotheses, and visualized trends in chemical exposure. The results highlight meaningful differences between packaging types and suggest directions for future public-health research.",
    tech: ["Data Scraping", "Data Analysis"],
    image: "/images/plastic-thumbnail.jpg",
    link: "https://github.com/johnnyikuehnis/EDC-Analysis",
    verticalImage: "/images/plastic-vert.png",
    horizontalImage: "/images/plastic-horiz.png",
    panel: {
      position: [5.3, 4, 7],
      rotationY: -Math.PI / 2,
      width: 2.655,
      height: 1.95,
    },
  },

  {
    id: "middle",
    title: "The Lingo Genie",
    tagline: "Gen-Z Slang Learning Tool",
    description:
    "LingoGenie is an interactive slang-learning platform built with React and Firebase that teaches modern Gen-Z vocabulary through dynamic lessons. The system features flashcards, fill-in-the-blank exercises, matching questions, and pronunciation tests powered by built-in speech recognition. Users earn XP, maintain streaks, and track progress in real time, while the interface blends playful animations, feedback cues, and smooth navigation to create an engaging, game-like learning experience.",
    tech: ["Frontend", "Backend", "Full-stack"],
    image: "/images/lingo-thumbnail.png",
    link: "https://thelingogenie.com/",
    verticalImage: "/images/lingo-vert.png",
    horizontalImage: "/images/lingo-horiz.png",
    panel: {
      position: [0, 13, 4.3],
      rotationY: 0,
      width: 3.0,
      height: 2.2,
    },
  },

  {
    id: "left-bot",
    title: "Pokémon Sim",
    tagline: "A Pokémon Battle Simulator",
    description: 
    "A.R.M. is a gesture-controlled robotic arm powered primarily by computer vision. Using MediaPipe, the system tracks the user’s hand and extracts key points that show where the hand is in 3D space. A small classifier determines whether the hand is open or closed, and depth information helps estimate how far the hand is from the camera. These CV results are then mapped to the servos on a physical robotic arm, allowing the hardware to mimic the user’s movements in a simple, intuitive way.",
    tech: ["Computer Vision", "ML", "Robotics"],
    image: "/images/arm-thumbnail.png",
    link: "https://github.com/johnnyikuehnis/pokemon",
    verticalImage: "/images/cv-vert.jpg",
    horizontalImage: "/images/cv-horiz.png",
    panel: {
      position: [-5.3, 4, 7],
      rotationY: Math.PI / 2,
      width: 2.655,
      height: 1.95,
    },
  },
  
  
];
