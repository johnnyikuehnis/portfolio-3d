export type Project = {
  id: string;
  title: string;
  tagline: string;
  tech: string[];
  description: string;
  link?: string;
  image?: string;
};


export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "A.R.M.",
    tagline: "Appendage Replication Machine",
    description: "An gesture-controlled robotic arm that moves in accordance with the user's own arm",
    tech: ["Computer Vision", "Robotics"],
    image: "/images/placeholder.png"
  },
  {
    id: "p2",
    title: "Dangers in Packaging",
    tagline: "Data Analysis on Chemicals in Food",
    description: "A data-driven analysis on endocrine-disrupting chemicals in food packaging",
    tech: ["Data Analysis", "Data Scraping"],
    image: "/images/placeholder.png"
  },
  {
    id: "p3",
    title: "The Lingo Genie",
    tagline: "The language learning tool for gen z slang!",
    description: "Are you of an older generation and want to learn slang? Now you can!",
    tech: ["Frontend", "Backend", "SWE"],
    image: "/images/placeholder.png"
  },
];
