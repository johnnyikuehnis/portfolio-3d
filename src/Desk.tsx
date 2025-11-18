import { RoundedBox, Cylinder } from "@react-three/drei";

export function DeskAccessories() {
  return (
    <group>

      {/* Mug */}
      <group position={[-0.8, 0.82, -1.4]}>
        <Cylinder args={[0.18, 0.18, 0.24, 32]}>
          <meshStandardMaterial color="#E5D4C7" roughness={0.65} />
        </Cylinder>
        {/* Handle */}
        <mesh position={[0.23, 0, 0]}>
          <torusGeometry args={[0.13, 0.04, 16, 32]} />
          <meshStandardMaterial color="#E5D4C7" roughness={0.65} />
        </mesh>
      </group>

      {/* Keyboard */}
      <RoundedBox
        args={[0.9, 0.06, 0.28]}
        position={[0.2, 0.81, -1.45]}
        radius={0.03}
      >
        <meshStandardMaterial color="#2A2420" roughness={0.55} />
      </RoundedBox>

      {/* Mouse */}
      <RoundedBox
        args={[0.18, 0.08, 0.3]}
        position={[0.7, 0.81, -1.4]}
        radius={0.08}
      >
        <meshStandardMaterial color="#3C332E" roughness={0.5} />
      </RoundedBox>

    </group>
  );
}
