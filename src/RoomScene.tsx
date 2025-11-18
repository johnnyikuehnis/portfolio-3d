import { Model } from "./Model";
import { ProjectPoster } from "./ProjectPoster";
import { PROJECTS } from "./projects";
import type { Project } from "./projects";

type RoomSceneProps = {
  onProjectSelect: (project: Project) => void;
};

export function RoomScene({ onProjectSelect }: RoomSceneProps) {
  return (
    <>
      {/* LIGHTING */}
      <ambientLight intensity={0.7} />
      <directionalLight intensity={2.5} position={[4, 5, 3]} castShadow />

      {/* FLOOR */}
      <mesh
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#3e3e48" />
      </mesh>

      {/* WALLS */}
      <mesh position={[0, 1.5, -5]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2a262f" />
      </mesh>

      <mesh
        position={[-6, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2b272f" />
      </mesh>

      <mesh
        position={[6, 1.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2b272f" />
      </mesh>

      {/* POSTERS */}
      <ProjectPoster
        project={PROJECTS[0]}
        position={[0, 5, -4.95]}
        onSelect={onProjectSelect}
      />

      <ProjectPoster
        project={PROJECTS[1]}
        position={[-3, 5, -4.95]}
        onSelect={onProjectSelect}
      />

      <ProjectPoster
        project={PROJECTS[2]}
        position={[3, 5, -4.95]}
        onSelect={onProjectSelect}
      />

      {/* MODELS */}
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

      <Model
        url="/models/computerScreen.glb"
        position={[-4.2, 0.35, -4.4]}
        scale={3.7}
      />

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
    </>
  );
}
