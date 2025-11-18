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

  // changes cursor to pointer automatically
  useCursor(hovered);

  // Smooth hover scale animation
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
        <planeGeometry args={[1.6, 2.3]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Image */}
      {project.image && (
        <Image
          url={project.image}
          scale={[1.2, 0.7]}
          position={[0, 0.55, 0.01]}
          transparent
        />
      )}

      {/* Title */}
      <Text
        position={[0, -0.10, 0.02]}
        fontSize={0.16}
        maxWidth={1.3}
        color="#111"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>

      {/* Tagline */}
      <Text
        position={[0, -0.32, 0.02]}
        fontSize={0.115}
        maxWidth={1.3}
        color="#444"
        anchorX="center"
        anchorY="middle"
      >
        {project.tagline}
      </Text>

      {/* Tech list */}
      <Text
        position={[0, -0.80, 0.02]}
        fontSize={0.11}
        maxWidth={1.3}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {project.tech.join(" • ")}
      </Text>
    </group>
  );
}
