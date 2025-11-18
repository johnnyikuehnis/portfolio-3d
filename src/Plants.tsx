import { RoundedBox } from "@react-three/drei";

export function Plants() {
  return (
    <group>

      {/* Floor Monstera Pot */}
      <group position={[-3.2, 0.55, -1]}>
        <RoundedBox args={[0.6, 0.4, 0.6]} radius={0.05} smoothness={3}>
          <meshStandardMaterial color="#5A4638" roughness={0.7} />
        </RoundedBox>

        {/* Leaves */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={i}
            position={[0, 0.4 + i * 0.12, 0]}
            rotation={[0, (i - 2) * 0.4, 0.2]}
          >
            <planeGeometry args={[0.7, 0.4]} />
            <meshStandardMaterial
              color="#3F5D3A"
              roughness={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Desk Succulent */}
      <group position={[0.8, 0.9, -1.4]}>
        <RoundedBox args={[0.25, 0.15, 0.25]} radius={0.03}>
          <meshStandardMaterial color="#6C5E52" roughness={0.7} />
        </RoundedBox>

        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[0, 0.15, 0]}
            rotation={[0, (Math.PI / 3) * i, 0.4]}
          >
            <planeGeometry args={[0.25, 0.12]} />
            <meshStandardMaterial color="#4F7A4E" roughness={0.6} />
          </mesh>
        ))}
      </group>

    </group>
  );
}
