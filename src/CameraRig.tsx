import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRef } from "react";

export type CameraRigProps = {
  target: Vector3 | null;   // world-space position the camera should move toward
  lookAt: Vector3 | null;   // world-space point the camera should look at
  lerpSpeed?: number;       // position smoothing
  lookLerpSpeed?: number;   // rotation / lookAt smoothing
};

export function CameraRig({
  target,
  lookAt,
  lerpSpeed = 0.08,
  lookLerpSpeed = 0.12,
}: CameraRigProps) {
  const { camera } = useThree();

  // We keep a smoothed lookAt point so rotation feels nice
  const currentLookAt = useRef<Vector3 | null>(null);

  useFrame(() => {
    // Smoothly move the camera position
    if (target) {
      camera.position.lerp(target, lerpSpeed);
    }

    // Smoothly rotate the camera toward the lookAt point
    if (lookAt) {
      if (!currentLookAt.current) {
        currentLookAt.current = lookAt.clone();
      } else {
        currentLookAt.current.lerp(lookAt, lookLerpSpeed);
      }
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}
