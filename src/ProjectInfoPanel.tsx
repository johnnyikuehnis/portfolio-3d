// ProjectInfoPanel.tsx
import React from "react";
import { Html } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

type Props = ThreeElements["mesh"] & {
  width?: number;
  height?: number;
  project?: {
    title: string;
    tagline: string;
    description: string;
    verticalImage?: string;
    horizontalImage?: string;
    tech?: string[];
    link: string;
  };
};

export function ProjectInfoPanel({
  width = 3.0,
  height = 2.2,
  project,
  children,
  ...meshProps
}: Props) {

  // DESIGN SPACE
  const DESIGN_W = width * 1000;
  const DESIGN_H = height * 1000;

  // HTML SCALE (your chosen value)
  const scale = 0.38;

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <mesh {...meshProps}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#000" transparent opacity={0.25} />

      {mounted && (
        <Html
          transform
          distanceFactor={1}
          position={[0, 0, 0.1]}
          style={{
            width: `${DESIGN_W}px`,
            height: `${DESIGN_H}px`,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            pointerEvents: "auto",
          }}
        >
          {/* UI PANEL */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: DESIGN_W * 0.02 + "px",
              gap: DESIGN_W * 0.015 + "px",
              fontFamily: "Inter, sans-serif",
              color: "white",
              boxSizing: "border-box",
            }}
          >
            {/* TOP IMAGES */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40% 60%",
                height: "48%",
                gap: DESIGN_W * 0.015 + "px",
              }}
            >
              {/* Vertical image */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: DESIGN_W * 0.01 + "px",
                  background: "#111",
                }}
              >
                <img
                  src={project?.verticalImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Horizontal image */}
              <div
                style={{
                  width: "97%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: DESIGN_W * 0.01 + "px",
                  background: "#111111",
                }}
              >
                <img
                  src={project?.horizontalImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* TEXT PANEL */}
            <div
              style={{
                flex: "1 1 auto",
                minHeight: 0,
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                overflow: "hidden",
              }}
            >
              {/* ------- TITLE + TAGLINE ON ONE LINE ------- */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: DESIGN_W * 0.045 + "px",
                    fontWeight: 700,
                  }}
                >
                  {project?.title}
                </h1>

                <span
                  style={{
                    fontSize: DESIGN_W * 0.03 + "px",
                    color: "#92ffe0",
                    fontWeight: 500,
                  }}
                >
                  {project?.tagline}
                </span>
              </div>

              {/* ------- SMALLER DESCRIPTION ------- */}
              <p
                style={{
                  margin: 0,
                  opacity: 0.95,
                  lineHeight: 1.35,
                  fontSize: DESIGN_W * 0.020   + "px",
                  maxWidth: "92%",
                }}
              >
                {project?.description}
              </p>

              {/* ------- TECH TAGS ------- */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: DESIGN_W * 0.01 + "px",
                }}
              >
                {project?.tech?.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      padding: `${DESIGN_W * 0.01}px ${DESIGN_W * 0.015}px`,
                      borderRadius: DESIGN_W * 0.01 + "px",
                      fontSize: DESIGN_W * 0.02 + "px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* ------- BUTTONS ------- */}
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  gap: DESIGN_W * 0.015 + "px",
                }}
              >
                {/* GREEN GO BACK BUTTON */}
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new KeyboardEvent("keydown", { key: "Escape" })
                    )
                  }
                  style={{
                    padding: `${DESIGN_W * 0.012}px ${DESIGN_W * 0.018}px`,
                    background: "#00E3B2",
                    borderRadius: DESIGN_W * 0.012 + "px",
                    border: "none",
                    color: "black",
                    fontWeight: 600,
                    fontSize: DESIGN_W * 0.025 + "px",
                    cursor: "pointer",
                  }}
                >
                  Go Back
                </button>

                <button
                  onClick={() => window.open(project?.link, "_blank")}
                  style={{
                    padding: `${DESIGN_W * 0.012}px ${DESIGN_W * 0.02}px`,
                    background: "#00E3B2",
                    borderRadius: DESIGN_W * 0.012 + "px",
                    border: "none",
                    color: "black",
                    fontWeight: 600,
                    fontSize: DESIGN_W * 0.025 + "px",
                    cursor: "pointer",
                  }}
                >
                  See Full Repo
                </button>
              </div>
            </div>
          </div>
        </Html>
      )}

      {children}
    </mesh>
  );
}
