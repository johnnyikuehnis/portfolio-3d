// ProjectInfoPanel.tsx
import React from "react";
import { Html } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

type ProjectInfoPanelProps = ThreeElements["mesh"] & {
  width?: number;
  height?: number;
  project?: {
    title: string;
    tagline: string;
    description: string;
    thumbnail?: string;
    skills?: string[];
    features?: string[];
  };
};

export function ProjectInfoPanel({
  width = 35,
  height = 20,
  project,
  children,
  ...meshProps
}: ProjectInfoPanelProps) {
  return (
    <mesh {...meshProps} castShadow receiveShadow>
      {/* Background plane */}
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color="#000000"
        transparent
        opacity={0.85}
      />

      {/* HTML content overlay */}
      <Html
        transform
        distanceFactor={1}
        position={[0, 0, 0.1]} // render slightly in front of plane
        style={{
          width: `${width * 20}px`, // scale for readability
          height: `${height * 20}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "auto", // allow hovering/clicking
        }}
      >
        <div
          style={{
            color: "white",
            padding: "20px 30px",
            width: "100%",
            height: "100%",
            fontFamily: "Inter, sans-serif",
            display: "flex",
            gap: "20px",
          }}
        >
          {/* LEFT: Thumbnail */}
          {project?.thumbnail && (
            <div
              style={{
                flex: "0 0 45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={project.thumbnail}
                alt="project preview"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
                }}
              />
            </div>
          )}

          {/* RIGHT: Text Content */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: "0 0 10px 0",
                fontSize: "2.4rem",
                fontWeight: 700,
              }}
            >
              {project?.title}
            </h1>

            <div
              style={{
                fontSize: "1.2rem",
                color: "#92ffe0",
                marginBottom: "15px",
              }}
            >
              {project?.tagline}
            </div>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#eee",
                lineHeight: "1.45",
                marginBottom: "15px",
              }}
            >
              {project?.description}
            </p>

            {/* Skills */}
            {project?.skills && (
              <>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Skills
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                >
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "6px 12px",
                        background: "#222",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        border: "1px solid #444",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Features */}
            {project?.features && (
              <>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  Features
                </div>

                <ul
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.4",
                    marginBottom: "25px",
                  }}
                >
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                style={{
                  padding: "10px 18px",
                  background: "#ffffff10",
                  border: "1px solid #ffffff30",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "Escape" })
                  );
                }}
              >
                Go Back
              </button>

              <button
                style={{
                  padding: "10px 18px",
                  background: "#6644ff",
                  opacity: 0.6,
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "1rem",
                  cursor: "not-allowed",
                }}
              >
                Learn More (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </Html>

      {children}
    </mesh>
  );
}
