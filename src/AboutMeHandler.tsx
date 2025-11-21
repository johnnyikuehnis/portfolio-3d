import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function AboutMePanel({ onClose }: { onClose?: () => void } = {}) {
  const groupRef = useRef<THREE.Group>(null);
  const bgMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { camera } = useThree();

  const [visible, setVisible] = useState(true);     // controls fade in/out
  const [fullyHidden, setFullyHidden] = useState(false); // hide after fade-out

  // Listen for Escape to trigger fade-out
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false); // start fade-out
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useFrame((state) => {
    if (!groupRef.current || fullyHidden) return;

    // -----------------------------------------
    // Follow camera
    // -----------------------------------------
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    groupRef.current.position
      .copy(camera.position)
      .addScaledVector(forward, 2.2);

    groupRef.current.quaternion.copy(camera.quaternion);

    // -----------------------------------------
    // Fade-in/fade-out animation
    // -----------------------------------------
    const targetOpacity = visible ? 0.92 : 0;
    const targetScale = visible ? 1 : 0.1;

    if (bgMaterialRef.current) {
      bgMaterialRef.current.opacity +=
        (targetOpacity - bgMaterialRef.current.opacity) * 0.25;

      // When fully transparent, mark hidden + call onClose if needed
      if (!visible && bgMaterialRef.current.opacity < 0.01) {
        setFullyHidden(true);
        if (onClose) onClose();
      }
    }

    // -----------------------------------------
    // Pop animation
    // -----------------------------------------
    const s = groupRef.current.scale;
    s.x += (targetScale - s.x) * 0.08;
    s.y += (targetScale - s.y) * 0.08;
    s.z += (targetScale - s.z) * 0.08;

    // -----------------------------------------
    // Gentle float
    // -----------------------------------------
    const t = state.clock.elapsedTime;
    groupRef.current.position.y += Math.sin(t * 2.0) * 0.0025;
  });

  // If faded out completely, stop rendering the panel
  if (fullyHidden) return null;

  return (
    <group ref={groupRef} scale={[0.85, 0.85, 0.85]}>
      {/* Background */}
      <mesh>
        <planeGeometry args={[2.8, 1.7]} />
        <meshBasicMaterial
          ref={bgMaterialRef}
          color="#111111"
          transparent
          opacity={0}
        />
      </mesh>

      {/* Title */}
      <Text
        fontSize={0.18}
        position={[0, 0.60, 0.01]}
        color="white"
        font="/fonts/PressStart2P-Regular.ttf"
        anchorX="center"
        anchorY="middle"
        outlineColor="#95393c"
        outlineWidth={0.008}
      >
        About Me
      </Text>

      {/* Body text */}
      <Text
        fontSize={0.035}
        maxWidth={2.45}
        lineHeight={1.28}
        position={[0, 0.5, 0.01]}
        color="#dddddd"
        font="/fonts/PressStart2P-Regular.ttf"
        anchorX="center"
        anchorY="top"
      >
{`
I’m a full-stack, graphics, and systems-focused Computer Science student at Brown University, where I split my time between real-time 3D work, large-scale systems, and computer vision.

I study CS + Applied Math and have worked as a TA for both CS0300 (Computer Systems) and CS0200 (Data Structures/Algorithms), supporting a total of 500+ students over the semesters.

I've interned at NVIDIA — automating debugging pipelines for embedded DriveOS modules and building multi-node deployment tooling — and at O-Net Communications, where I built an 800G diagnostics GUI and automated internal workflows.

I work across the stack: Python, Java, C++, C, Go, SQL, TypeScript, React, OpenCV, OpenGL, TensorFlow/PyTorch, Node.js, Firebase, and Qt. I love projects with deep technical complexity *and* an interactive or visual component.

This room highlights some of those projects. I’ll be updating it with more interactions, artwork, and builds. Feel free to tilt the camera a bit with WASD and click the posters to see the projects.

For more information:
`}
      </Text>

      {/* Resume */}
      <Text
        fontSize={0.04}
        position={[0, -0.6, 0.02]}
        color="#95393c"
        font="/fonts/PressStart2P-Regular.ttf"
        anchorX="center"
        onClick={() =>
          window.open("/resumes/John_Kuehnis_Resume_Recent.pdf", "_blank")
        }
      >
        Resume (PDF)
      </Text>

      {/* LinkedIn */}
      <Text
        fontSize={0.03}
        position={[0, -0.7, 0.02]}
        color="#95393c"
        font="/fonts/PressStart2P-Regular.ttf"
        anchorX="center"
        onClick={() =>
          window.open("https://linkedin.com/in/johnny-kuehnis", "_blank")
        }
      >
        LinkedIn
      </Text>

      {/* Close button */}
      <Text
        fontSize={0.12}
        position={[1.25, 0.72, 0.02]}
        color="#95393c"
        font="/fonts/PressStart2P-Regular.ttf"
        anchorX="center"
        onClick={() =>
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
        }
      >
        ✕
      </Text>
    </group>
  );
}
