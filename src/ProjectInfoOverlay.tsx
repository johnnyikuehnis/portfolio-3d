// ProjectInfoOverlay.tsx
import React from "react";
import type { Project } from "./projects";

type OverlayProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectInfoOverlay({ project, onClose }: OverlayProps) {
  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        
        {/* TOP IMAGES */}
        <div style={styles.imageRow}>
          <img
            src={project.verticalImage ?? "/images/placeholder-vert.png"}
            style={styles.verticalImage}
          />
          <img
            src={project.horizontalImage ?? "/images/placeholder-horiz.png"}
            style={styles.horizontalImage}
          />
        </div>

        {/* TEXT CONTENT SECTION */}
        <div style={styles.content}>
          <h1 style={styles.title}>{project.title}</h1>
          <h2 style={styles.tagline}>{project.tagline}</h2>

          <p style={styles.desc}>{project.description}</p>

          {/* SKILLS */}
          {project.tech && (
            <div style={styles.skills}>
              {project.tech.map((skill) => (
                <div key={skill} style={styles.skillPill}>
                  {skill}
                </div>
              ))}
            </div>
          )}

          {/* BUTTONS */}
          <div style={styles.buttons}>
            <button style={styles.back} onClick={onClose}>
              Go Back
            </button>
            <button style={styles.more}>Learn More (Coming Soon)</button>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
    animation: "fadeIn 0.2s ease-out",
  },

  panel: {
    width: "80vw",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    color: "white",
  },

  imageRow: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    gap: "20px",
    height: "45%",
  },

  verticalImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
  },

  horizontalImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
  },

  content: {
    flex: 1,
    background: "rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "30px",
    overflowY: "auto",
  },

  title: {
    margin: 0,
    fontSize: "2.6rem",
    fontWeight: 700,
  },

  tagline: {
    margin: "6px 0 14px 0",
    color: "#92ffe0",
    fontSize: "1.3rem",
    fontWeight: 500,
  },

  desc: {
    fontSize: "1.15rem",
    lineHeight: 1.55,
    color: "#e6e6e6",
    maxWidth: "85%",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "16px",
  },

  skillPill: {
    padding: "6px 12px",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "10px",
    fontSize: "0.95rem",
  },

  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "24px",
  },

  back: {
    padding: "12px 20px",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    border: "none",
    fontSize: "1rem",
  },

  more: {
    padding: "12px 24px",
    background: "#7b3eff",
    borderRadius: "10px",
    border: "none",
    color: "white",
    fontSize: "1rem",
    opacity: 0.85,
  },
};
