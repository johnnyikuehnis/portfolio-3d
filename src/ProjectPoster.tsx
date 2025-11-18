import { Text } from "@react-three/drei";
import type { Project } from "./projects";
import { useState } from "react";

type PosterProps = {
  project: Project;
  position: [number, number, number];
  onClick: (project: Project) => void;
};

export function ProjectPoster({ project, position, onClick }: PosterProps) {
  const [hover, setHover] = useState(false);

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(project);
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Poster background */}
      <mesh>
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial
          color={hover ? "#f1e3d3" : "#faf7f3"}
          roughness={0.6}
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 0.6, 0.01]}
        fontSize={0.18}
        color="#222"
        maxWidth={1.8}
        anchorX="center"
      >
        {project.title}
      </Text>

      {/* Tagline */}
      <Text
        position={[0, 0.15, 0.01]}
        fontSize={0.12}
        color="#444"
        maxWidth={1.8}
        anchorX="center"
      >
        {project.tagline}
      </Text>

      {/* Tech */}
      <Text
        position={[0, -0.6, 0.01]}
        fontSize={0.095}
        color="#666"
        anchorX="center"
      >
        {project.tech.join(" • ")}
      </Text>
    </group>
  );
}
