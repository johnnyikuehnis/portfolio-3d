import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRef } from "react";

export type CameraRigProps = {
  target: Vector3 | null;      // world-space camera target position
  lookAt: Vector3 | null;      // world position OR direction vector
  lerpSpeed?: number;          // camera movement smoothing
  lookLerpSpeed?: number;      // rotation smoothing
};

const TMP = new Vector3();
const WORLD_LOOK = new Vector3();

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
    /* ------------------------------------------
       1. Smooth camera movement
    ------------------------------------------- */
    if (target) {
      camera.position.lerp(target, lerpSpeed);
    }

    /* ------------------------------------------
       2. Smooth rotation (lookAt handling)
    ------------------------------------------- */
    if (lookAt) {
      // Determine if lookAt is a direction (unit-ish vector)
      const isDirection =
        Math.abs(lookAt.length() - 1) < 0.001 ||
        lookAt.length() < 1.5; // small vectors likely directions

      if (isDirection) {
        // Convert direction to world target in front of camera
        WORLD_LOOK.copy(lookAt).normalize();
        WORLD_LOOK.multiplyScalar(5); // how far ahead to look
        WORLD_LOOK.add(camera.position); // convert to world space
      } else {
        WORLD_LOOK.copy(lookAt);
      }

      // Initialize smoothed look vector
      if (!currentLookAt.current) {
        currentLookAt.current = WORLD_LOOK.clone();
      } else {
        // Smooth look interpolation
        currentLookAt.current.lerp(WORLD_LOOK, lookLerpSpeed);
      }

      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}
