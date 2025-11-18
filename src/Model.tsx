import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { JSX } from "react";

type ModelProps = JSX.IntrinsicElements["group"] & {
  url: string;
  scale?: number | [number, number, number];
};

export function Model({ url, scale = 1, ...props }: ModelProps) {
  console.log("Attempting to load model:", url);

  try {
    const gltf = useGLTF(url) as any;
    console.log("GLTF loaded:", gltf);
    return (
      <group {...props} scale={scale}>
        <primitive object={gltf.scene} />
      </group>
    );
  } catch (err) {
    console.error("GLTF failed:", err);
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
}
