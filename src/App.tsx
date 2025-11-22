import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";

import { FreeFlyControls } from "./FreeFlyControls";
import { RoomScene } from "./RoomScene";
import { CameraRig } from "./CameraRig";
import { FixedCamera } from "./FixedCamera";
import type { Project } from "./projects";
import { PROJECTS } from "./projects";
import { ProjectInfoContainer } from "./ProjectInfoContainer";
import { AboutMePanel } from "./AboutMeHandler";

/* -------------------------------------------------------------
   ORIGINAL HOME CAMERA (matches your early setup exactly)
------------------------------------------------------------- */
const HOME_POS = new Vector3(0, 4, 7);
const HOME_LOOK = new Vector3(0, 2.2, -5);



/* -------------------------------------------------------------
   CAMERA PRESETS FOR EACH POSTER
   - left: rotate + slide left a bit
   - middle: go up, look at upper wall
   - right: rotate + slide right a bit
------------------------------------------------------------- */
const CAMERA_PRESETS: Record<string, { target: Vector3; lookAt: Vector3 }> = {
  left: {
    target: new Vector3(-3, 4, 7),
    lookAt: new Vector3(-1, 0, 0), // pure left
  },
  left2: {
    target: new Vector3(-3, 4, 10),
    lookAt: new Vector3(-1, 0, 0), // pure left
  },
  middle: {
    target: new Vector3(0, 13, 7),
    lookAt: new Vector3(0, 0, -1), // forward
  },
  middle2: {
    target: new Vector3(0, 16, 7),
    lookAt: new Vector3(0, 0, -1), // forward
  },
  right: {
    target: new Vector3(3, 4, 7),
    lookAt: new Vector3(1, 0, 0), // pure right
  },
  right2: {
    target: new Vector3(3, 4, 10),
    lookAt: new Vector3(1, 0, 0), // forward
  },
};

function App() {
const [selectedProject, setSelectedProject] = useState<Project[] | null>(null);

  // CameraRig animation targets
  const [cameraTarget, setCameraTarget] = useState<Vector3 | null>(null);
  const [cameraLookAt, setCameraLookAt] = useState<Vector3 | null>(null);

  // Idle fixed camera position (used when no project is selected)
  const [idlePos, setIdlePos] = useState(HOME_POS.clone());
  const [idleLook, setIdleLook] = useState(HOME_LOOK.clone());

  const [aboutOpen, setAboutOpen] = useState(false);


  useEffect(() => {
  PROJECTS.forEach(p => {
    if (p.verticalImage) preloadImage(p.verticalImage);
    if (p.horizontalImage) preloadImage(p.horizontalImage);
  });
}, []);


  useEffect(() => {
  // Wait 1 frame so R3F is initialized
  requestAnimationFrame(() => {
    // Fake "middle" camera movement
    setCameraTarget(new Vector3(0, 10, 7));
    setCameraLookAt(new Vector3(0, 5, -5));

    // After tiny delay, return home
    setTimeout(() => {
      setSelectedProject(null);
      setCameraTarget(HOME_POS.clone());
      setCameraLookAt(HOME_LOOK.clone());
    }, 50);
  });
}, []);


  /* -------------------------------------------------------------
     ESC KEY → return to exact home camera
  ------------------------------------------------------------- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // setSelectedProject(null);
        // setAboutOpen(false);

        // Reset idle to home
        setIdlePos(HOME_POS.clone());
        setIdleLook(HOME_LOOK.clone());

        // Smooth CameraRig transition back home
        setCameraTarget(HOME_POS.clone());
        setCameraLookAt(HOME_LOOK.clone());
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);


  function preloadImage(src: string) {
    const img = new Image();
    img.src = src;
  }


  /* -------------------------------------------------------------
     Poster click → choose camera preset based on project.id
  ------------------------------------------------------------- */
 const handleProjectSelect = (project: Project) => {

  if (project.id === "about") {
    setAboutOpen(true);
    return; // do NOT run camera preset logic
  }


  if (project.id === "left" || project.id === "left2") {
    // Render BOTH
    const left = PROJECTS.find(p => p.id === "left")!;
    const left2 = PROJECTS.find(p => p.id === "left2")!;

    setSelectedProject([left, left2]);

    // Use the camera of whichever one was clicked
    const preset = CAMERA_PRESETS[project.id];
    setCameraTarget(preset.target.clone());
    setCameraLookAt(preset.lookAt.clone());
    return;
  }

  if (project.id === "right" || project.id === "right2") {
    // Render BOTH
    const right = PROJECTS.find(p => p.id === "right")!;
    const right2 = PROJECTS.find(p => p.id === "right2")!;

    setSelectedProject([right, right2]);

    // Use the camera of whichever one was clicked
    const preset = CAMERA_PRESETS[project.id];
    setCameraTarget(preset.target.clone());
    setCameraLookAt(preset.lookAt.clone());
    return;
  }
  
  if (project.id === "middle" || project.id === "middle2") {
    // Render BOTH
    const middle = PROJECTS.find(p => p.id === "middle")!;
    const middle2 = PROJECTS.find(p => p.id === "middle2")!;

    setSelectedProject([middle, middle2]);

    // Use the camera of whichever one was clicked
    const preset = CAMERA_PRESETS[project.id];
    setCameraTarget(preset.target.clone());
    setCameraLookAt(preset.lookAt.clone());
    return;
  }

  // All normal projects
  setSelectedProject([project]);

  const preset = CAMERA_PRESETS[project.id];
  setCameraTarget(preset.target.clone());
  setCameraLookAt(preset.lookAt.clone());
};


  /* -------------------------------------------------------------
     RENDER
  ------------------------------------------------------------- */
  return (
    <div className="app-root">
      {/* Header */}
      <div className="app-header">
        <div>
          <div className="app-header-title">Johnny Kuehnis</div>
          <div className="app-header-subtitle">
            cool stuff here — step into my dev room!
          </div>
        </div>
      </div>

      {/* Overlay Instructions */}
      <div className="app-overlay">
        <div className="app-overlay-inner">
          Click the posters on the wall to explore my projects.
        </div>
      </div>

      

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 4, 7], fov: 50 }}>

        {aboutOpen && (
          <AboutMePanel onClose={() => setAboutOpen(false)} />
        )}



        {/* Optional debug fly controls */}
        <FreeFlyControls movementSpeed={9} lookSpeed={0.008} />

        {/* Idle camera when no project selected */}
        <FixedCamera
          active={selectedProject === null}
          targetPos={idlePos}
          targetLook={idleLook}
        />

        <CameraRig
          target={cameraTarget}
          lookAt={cameraLookAt}
          lerpSpeed={0.08}
          lookLerpSpeed={0.12}
        />

        {/* Background color */}
        <color attach="background" args={["#10211A"]} />

        {/* Lighting */}
        <ambientLight intensity={0.1} color="#ffffff" />
        <spotLight
          position={[2, 5, 3]}
          intensity={0.4}
          angle={0.7}
          penumbra={0.5}
          color="#ffddbb"
          castShadow
        />
        <pointLight position={[-3, 2, -2]} intensity={0.15} color="#88aaff" />
        <pointLight position={[0, 0.5, 0]} intensity={0.2} color="#554466" />

        {/* Room */}
        <Suspense fallback={null}>
          <RoomScene onProjectSelect={handleProjectSelect} />

          {/* NEW — Generalized project info panel */}
          <ProjectInfoContainer project={selectedProject} />
        </Suspense>

      </Canvas>
    </div>
  );
}

export default App;
