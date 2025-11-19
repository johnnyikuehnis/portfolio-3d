import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

// ------------------------------
// GLOBAL LOAD TRACKER
// ------------------------------
let totalModels = 0;
let loadedModels = 0;
const listeners: (() => void)[] = [];

export function onAllModelsLoaded(cb: () => void) {
  listeners.push(cb);
}

type Props = {
  url: string;
  [key: string]: any;
};

// ------------------------------
// MODEL WRAPPER
// ------------------------------
export function Model({ url, ...props }: Props) {
  totalModels++;

  const gltf = useGLTF(url);

  useEffect(() => {
    loadedModels++;
    if (loadedModels === totalModels) {
      listeners.forEach((fn) => fn());
    }
  }, []);

  return <primitive object={gltf.scene} {...props} />;
}
