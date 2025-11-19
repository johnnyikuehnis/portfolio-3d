import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, useCursor } from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "./projects";

type Props = {
  project: Project;
  position: [number, number, number];
  onSelect: (project: Project) => void;
};

export function ProjectPoster({ project, position, onSelect }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  // -----------------------------------------------------
  // DYNAMIC POSTER SIZING
  // Change these and the whole layout auto-resizes
  // -----------------------------------------------------
  const posterWidth = 2.0;
  const posterHeight = 2.4;

  // Spacing ratios
  const imageHeight = posterHeight * 0.38;
  const titleY = posterHeight * -0.05;
  const taglineY = posterHeight * -0.18;
  const techY = posterHeight * -0.33;

  // Smooth hover scaling
  useFrame(() => {
    if (!groupRef.current) return;

    const target = hovered ? 1.12 : 1.0;
    groupRef.current.scale.x += (target - groupRef.current.scale.x) * 0.1;
    groupRef.current.scale.y += (target - groupRef.current.scale.y) * 0.1;
    groupRef.current.scale.z += (target - groupRef.current.scale.z) * 0.1;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Poster background */}
      <mesh>
        <planeGeometry args={[posterWidth, posterHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Image */}
      {project.image && (
        <Image
          url={project.image}
          scale={[posterWidth * 0.75, imageHeight]}
          position={[0, posterHeight * 0.23, 0.01]}
          transparent
        />
      )}

      {/* Title */}
      <Text
        position={[0, titleY, 0.02]}
        fontSize={posterHeight * 0.08}
        maxWidth={posterWidth * 0.9}
        color="#111"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>

      {/* Tagline */}
      <Text
        position={[0, taglineY, 0.02]}
        fontSize={posterHeight * 0.055}
        maxWidth={posterWidth * 0.9}
        color="#444"
        anchorX="center"
        anchorY="middle"
      >
        {project.tagline}
      </Text>

      {/* Tech list */}
      <Text
        position={[0, techY, 0.02]}
        fontSize={posterHeight * 0.048}
        maxWidth={posterWidth * 0.9}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {project.tech.join(" • ")}
      </Text>
    </group>
  );
}
