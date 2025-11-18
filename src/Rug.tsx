export function Rug() {
  return (
    <mesh position={[0, 0.005, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4.5, 2.8]} />
      <meshStandardMaterial
        color="#4A433E"
        roughness={0.95}
        metalness={0.02}
      />
    </mesh>
  );
}
