import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { useRef, useEffect } from "react";

export function Window() {
  const lightRef = useRef<THREE.RectAreaLight>(null);

  useEffect(() => {
    if (lightRef.current) {
      // RectAreaLight requires an update to work properly
      lightRef.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <group position={[0, 2.4, -3.98]}>
      {/* Window Frame */}
      <RoundedBox args={[2.5, 1.6, 0.08]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#4A413C" roughness={0.8} />
      </RoundedBox>

      {/* Glass Pane */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.3, 1.4]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Warm Sunlight RectAreaLight */}
      <primitive
        object={new THREE.RectAreaLight("#FFD8A6", 8, 3, 2)}
        position={[0, 0, 0.2]}
        rotation={[0, 0, 0]}
        ref={lightRef}
      />
    </group>
  );
}
