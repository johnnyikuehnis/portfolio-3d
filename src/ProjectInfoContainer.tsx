// ProjectInfoContainer.tsx
import React from "react";
import type { Project } from "./projects";
import { ProjectInfoPanel } from "./ProjectInfoPanel";

type ProjectInfoContainerProps = {
  project: Project | null;
};

export function ProjectInfoContainer({ project }: ProjectInfoContainerProps) {
  if (!project || !project.panel) return null;

  const { position, rotationY, width = 35, height = 20 } = project.panel;

  return (
    <ProjectInfoPanel
      position={position}
      rotation={[0, rotationY, 0]}
      width={width}
      height={height}
    >
      {/* This is where we’ll later put text/images/GIFs for the project */}
    </ProjectInfoPanel>
  );
}
