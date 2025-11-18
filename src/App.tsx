import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { FreeFlyControls } from "./FreeFlyControls";
import { PROJECTS } from "./projects";
import type { Project } from "./projects";
import { RoomScene } from "./RoomScene";
import { Vector3 } from "three";

/* -------------------------------------------------------------
   OPTIONAL FIXED CAMERA — disabled for now so Orbit is enabled
------------------------------------------------------------- */
function FixedCamera() {
  const { camera } = useThree();

  const camPos = new Vector3(0, 4, 7);
  const lookTarget = new Vector3(0, 2.2, -5);

  useFrame(() => {
    camera.position.lerp(camPos, 0.1);
    camera.lookAt(lookTarget);
  });

  return null;
}

/* -------------------------------------------------------------
   MODAL WINDOW
------------------------------------------------------------- */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{project.title}</div>
            <div className="modal-tagline">{project.tagline}</div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-tech">
          {project.tech.map((t) => (
            <span key={t} className="modal-pill">
              {t}
            </span>
          ))}
        </div>

        <div className="modal-body">{project.description}</div>

        {project.link && (
          <div className="modal-link">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#9fd5ff" }}
            >
              View code / demo ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   MAIN APP
------------------------------------------------------------- */
function App() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  return (
    <div className="app-root">
      {/* Header */}
      <div className="app-header">
        <div>
          <div className="app-header-title">Johnny Kuehnis</div>
          <div className="app-header-subtitle">
            Software & systems — step into my dev room.
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="app-overlay">
        <div className="app-overlay-inner">
          Click the posters on the wall to explore my projects.
        </div>
      </div>

      {/* CANVAS */}
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 6], fov: 50 }}
      >
        {/* TEMPORARILY ENABLED CAMERA CONTROLS */}
        <FreeFlyControls movementSpeed={5} lookSpeed={0.002} />


        {/* If you want fixed camera again later, re-enable this */}
        <FixedCamera />

        {/* BACKGROUND */}
        <color attach="background" args={["#10211A"]} />

        {/* LIGHTING */}
        <ambientLight intensity={0.1} color="#ffffff" />
        <spotLight
          position={[2, 5, 3]}
          intensity={2.4}
          angle={0.7}
          penumbra={0.5}
          color="#ffddbb"
          castShadow
        />
        <pointLight
          position={[-3, 2, -2]}
          intensity={0.2}
          color="#88aaff"
        />
        <pointLight
          position={[0, 0.5, 0]}
          intensity={0.1}
          color="#554466"
        />

        <Environment preset="sunset" />

        <Suspense fallback={null}>
          <RoomScene onProjectSelect={setSelectedProject} />
        </Suspense>

      </Canvas>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() =>
            setSelectedProject(null)
          }
        />
      )}
    </div>
  );
}

export default App;
