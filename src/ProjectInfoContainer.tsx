// ProjectInfoContainer.tsx
import React from "react";
import type { Project } from "./projects";
import { ProjectInfoPanel } from "./ProjectInfoPanel";

type Props = {
  project: Project | null;
};

export function ProjectInfoContainer({ project }: Props) {
  if (!project || !project.panel) return null;

  const { position, rotationY, width, height } = project.panel;

  return (
    <ProjectInfoPanel
      position={position}
      rotation={[0, rotationY, 0]}
      width={width}
      height={height}
      project={{
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        link: project.link ?? "",

        // MUST be mapped to "skills" because the panel expects that name
        tech: project.tech ?? [],

        // correct fallback images
        verticalImage: project.verticalImage ?? "/images/placeholder-vert.png",
        horizontalImage:
          project.horizontalImage ?? "/images/placeholder-horiz.png",
      }}
    />
  );
}
