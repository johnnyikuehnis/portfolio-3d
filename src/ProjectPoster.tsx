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

  const posterWidth = 2.2;
  const posterHeight = 2.4;

  const imageWidth = posterWidth * 0.83;
  const imageHeight = posterHeight * 0.72;
  const footerY = -posterHeight * 0.37;

  // animated frame glow
  const frameMaterial = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Hover scale
    const target = hovered ? 1.08 : 1.0;
    groupRef.current.scale.x += (target - groupRef.current.scale.x) * 0.1;
    groupRef.current.scale.y += (target - groupRef.current.scale.y) * 0.1;
    groupRef.current.scale.z += (target - groupRef.current.scale.z) * 0.1;

    // Glow
    if (frameMaterial.current) {
      frameMaterial.current.emissiveIntensity +=
        ((hovered ? 0.55 : 0.15) - frameMaterial.current.emissiveIntensity) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Frame */}
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[posterWidth + 0.15, posterHeight + 0.15]} />
        <meshStandardMaterial
          ref={frameMaterial}
          color="#222222"
          roughness={0.8}
          metalness={0.3}
          emissive="#95393c"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Poster background */}
      <mesh>
        <planeGeometry args={[posterWidth, posterHeight]} />
        <meshStandardMaterial color="#2a2a2b" roughness={1.0} />
      </mesh>

      {/* Image */}
      {project.image && (
        <Image
          url={project.image}
          scale={[imageWidth, imageHeight]}
          position={[0, posterHeight * 0.12, 0.01]}
          transparent
        />
      )}

      {/* Title */}
      <Text
        position={[0, footerY, 0.02]}
        fontSize={posterHeight * 0.065}
        maxWidth={posterWidth * 0.95}
        color="#f0e6e6"
        font="/fonts/PressStart2P-Regular.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {project.tagline}
      </Text>
    </group>
  );
}
