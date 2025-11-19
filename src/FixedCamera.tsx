import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export type FixedCameraProps = {
  active: boolean;   // only controls camera when true
  targetPos: Vector3;
  targetLook: Vector3;
};

export function FixedCamera({ active, targetPos, targetLook }: FixedCameraProps) {
  const { camera } = useThree();

  useFrame(() => {
    if (!active) return;

    camera.position.lerp(targetPos, 0.1);
    camera.lookAt(targetLook);
  });

  return null;
}
