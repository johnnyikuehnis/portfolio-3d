import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FreeFlyControls({
  movementSpeed = 4,
  lookSpeed = 0.002,
}) {
  const { camera, gl } = useThree();

  // Keep track of pressed keys
  const keys = useRef<Record<string, boolean>>({});

  // For mouse look
  const isMouseDown = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown.current = true;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      const dx = e.clientX - mouse.current.x;
      const dy = e.clientY - mouse.current.y;

      camera.rotation.y -= dx * lookSpeed;
      camera.rotation.x -= dy * lookSpeed;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x)
      );

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mouseup", handleMouseUp);
    gl.domElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, gl, lookSpeed]);

  useFrame((_, delta) => {
    const speed = movementSpeed * delta;

    // Build direction vectors
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, forward).normalize().multiplyScalar(-1);

    // Movement keys
    if (keys.current["w"]) {
      camera.position.addScaledVector(forward, speed);
    }
    if (keys.current["s"]) {
      camera.position.addScaledVector(forward, -speed);
    }
    if (keys.current["a"]) {
      camera.position.addScaledVector(right, -speed);
    }
    if (keys.current["d"]) {
      camera.position.addScaledVector(right, speed);
    }
    if (keys.current[" "]) {
      camera.position.y += speed; // Space = up
    }
    if (keys.current["shift"]) {
      camera.position.y -= speed; // Shift = down
    }
  });

  return null;
}
