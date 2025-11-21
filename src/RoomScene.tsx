import { Model } from "./Model";
import { ProjectPoster } from "./ProjectPoster";
import { PROJECTS } from "./projects";
import { Text } from "@react-three/drei";
import type { Project } from "./projects";


type RoomSceneProps = {
  onProjectSelect: (project: Project) => void;
};

export function RoomScene({ onProjectSelect }: RoomSceneProps) {
  return (
    <>
      {/* =========================================================
          GLOBAL LIGHTING
      ========================================================= */}
      <ambientLight intensity={0.2} />
      <directionalLight
        intensity={0.2}
        position={[4, 5, 3]}
        color={"#f77979"}  // valid
        castShadow
      />

      {/* =========================================================
          LAMP SPOTLIGHTS
      ========================================================= */}

      {/* Table Lamp Light */}
      <pointLight
        position={[-5.1, 1.15, -4.0]}   // right where the bulb would be
        intensity={2.2}
        distance={8}
        decay={2}
        color={"#ffddaa"}               // warm yellow
        castShadow
      />


      {/* Floor Lamp Light */}
      <pointLight
        position={[2.1, 1.35, -3.85]}    // height of bulb inside shade
        intensity={6.0}
        distance={10}
        decay={2}
        color={"#ffeecf"}               // slightly softer warm
        castShadow
      />
      
      {/* === Computer Screen (Clickable) === */}
<group
  onClick={() => onProjectSelect({ id: "about" } as any)}
  onPointerEnter={() => (document.body.style.cursor = "pointer")}
  onPointerLeave={() => (document.body.style.cursor = "default")}
>
  <Model
    url="/models/computerScreen.glb"
    position={[-4.2, 0.35, -4.4]}
    scale={3.7}
  />

  {/* ----- TEXT ON SCREEN ----- */}
  <Text
  position={[-3.45, 1.00, -4.48]}
  rotation={[0, Math.PI * -0.004, 0]}
  fontSize={0.13}
  color="#ffffff"
  font="/fonts/PressStart2P-Regular.ttf"
  anchorX="center"
  anchorY="middle"
  outlineColor="#95393c"
  outlineWidth={0.022}
>
  ABOUT ME
</Text>

</group>


      {/* =========================================================
          RIM LIGHTS BEHIND MODELS (Bike, Shine, Mimikyu)
      ========================================================= */}

      {/* Bike Rim Light */}
      <pointLight
        position={[-1.3, 1.2, -4.0]}
        intensity={0.3}
        distance={2}
        decay={2}
        color={"#88ccff"}
      />

      <pointLight
        position={[-0.7, 1.2, -4.0]}
        intensity={0.3}
        distance={2}
        decay={2}
        color={"#88ccff"}
      />

      {/* Shine Rim Light */}
      <pointLight
        position={[-1.0, 0.4, -4.0]}
        intensity={0.35}
        distance={2}
        decay={2}
        color={"#ffd966"}
      />

      {/* Mimikyu Rim Light */}
      <pointLight
        position={[-4.2, 0.75, -4.0]}
        intensity={0.8}
        distance={2.2}
        decay={2}
        color={"#ffb3d9"}
      />

      {/* =========================================================
          FLOOR
      ========================================================= */}
      <mesh
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#6a5e56" roughness={1.0} metalness={0.05} />
      </mesh>


      {/* =========================================================
          WALLS
      ========================================================= */}
      <mesh position={[0, 1.5, -5]} receiveShadow>
        <planeGeometry args={[12, 40]} />
        <meshStandardMaterial color="#5a515f" roughness={0.9} metalness={0.05} />

      </mesh>
              {/* <meshStandardMaterial color="#f9f9f9ff" roughness={0.9} metalness={0.05} /> */}


      <mesh
        position={[-6, 1.5, -2]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 40]} />
        <meshStandardMaterial color="#5a515f" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh
        position={[6, 1.5, -2]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 40]} />
        <meshStandardMaterial color="#5a515f" roughness={0.9} metalness={0.05} />
      </mesh>


      {/* =========================================================
          POSTERS
      ========================================================= */}
      {/* middle */}
      <ProjectPoster
        project={PROJECTS[2]}
        position={[0, 5.9, -4.95]}
        onSelect={onProjectSelect}
      />

      <ProjectPoster
        project={PROJECTS[5]}
        position={[0, 3.2, -4.95]}
        onSelect={onProjectSelect}
      />

      {/* left */}
      <ProjectPoster
        project={PROJECTS[0]}
        position={[-3, 5.9, -4.95]}
        onSelect={onProjectSelect}
      />

      <ProjectPoster
        project={PROJECTS[3]}
        position={[-3, 3.2, -4.95]}
        onSelect={onProjectSelect}
      />

      {/* right */}
      <ProjectPoster
        project={PROJECTS[1]}
        position={[3, 5.9, -4.95]}
        onSelect={onProjectSelect}
      />

      <ProjectPoster
        project={PROJECTS[4]}
        position={[3, 3.2, -4.95]}
        onSelect={onProjectSelect}
      />


      {/* =========================================================
          MODELS
      ========================================================= */}

      <Model
        url="/models/deskCorner.glb"
        position={[-2.5, -1, -1.5]}
        scale={3.5}
        rotation={[0, Math.PI / 2, 0]}
      />

      <Model
        url="/models/chairDesk.glb"
        position={[-2.9, -1, -3.2]}
        scale={3.5}
        rotation={[0, Math.PI, 0]}
      />

      <Model
        url="/models/lampSquareTable.glb"
        position={[-5.1, 0.35, -4.0]}
        scale={3.5}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* <Model
        url="/models/computerScreen.glb"
        position={[-4.2, 0.35, -4.4]}
        scale={3.7}
      /> */}

      <Model
        url="/models/computerKeyboard.glb"
        position={[-4.1, 0.35, -3.8]}
        scale={3.5}
      />

      <Model
        url="/models/computerMouse.glb"
        position={[-2.85, 0.35, -3.8]}
        scale={3.5}
      />

      <Model
        url="/models/pottedPlant.glb"
        position={[-5.35, 0.35, -2.1]}
        scale={2.0}
      />

      <Model
        url="/models/bedBunk.glb"
        position={[3.75, -1, -0.3]}
        scale={3.8}
      />

      <Model
        url="/models/rugSquare.glb"
        position={[-2.3, -1, 1.3]}
        scale={6.5}
      />

      <Model
        url="/models/lampRoundFloor.glb"
        position={[2.0, -1, -3.8]}
        scale={3.5}
      />

      <Model
        url="/models/bookcaseClosedWide.glb"
        position={[-2.0, -1, -3.8]}
        scale={3.5}
      />

      <Model
        url="/models/books.glb"
        position={[0.0, 0.1, -4.0]}
        scale={4.3}
      />

      <Model
        url="/models/books2.glb"
        position={[0.0, 0.92, -4.0]}
        scale={4.3}
      />

      <Model
        url="/models/books3.glb"
        position={[0.0, -0.74, -4.0]}
        scale={4.3}
      />

      <Model
        url="/models/porygon.glb"
        position={[-1.0, -0.58, -4.3]}
        scale={0.006}
        rotation={[0, Math.PI / 4, 0]}
      />

      <Model
        url="/models/shine.glb"
        position={[-1.0, 0.4, -4.3]}
        scale={0.21}
      />

      <Model
        url="/models/creeper.glb"
        position={[-1.3, 2.2, -4.3]}
        scale={0.21}
      />

      <Model
        url="/models/mimikyu.glb"
        position={[-4.5, 0.35, -4.35]}
        scale={0.41}
        rotation={[0, Math.PI * 1.75, 0]}
      />

      <Model
        url="/models/bike.glb"
        position={[-1.0, 0.92, -4.3]}
        scale={0.41}
        rotation={[0, Math.PI * 1.5, 0]}
      />
    </>
  );
}
