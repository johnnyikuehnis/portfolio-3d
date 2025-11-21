import React from "react";
import type { Project } from "./projects";
import { ProjectInfoPanel } from "./ProjectInfoPanel";

type Props = {
  project: Project[] | null;   // ← now an array
};

export function ProjectInfoContainer({ project }: Props) {
  if (!project || project.length === 0) return null;

  return (
    <>
      {project.map((p, i) => {
        if (!p.panel) return null;

        return (
          <ProjectInfoPanel
            key={p.id + "_" + i}
            position={p.panel.position}
            rotation={[0, p.panel.rotationY, 0]}
            width={p.panel.width}
            height={p.panel.height}
            project={{
              title: p.title,
              tagline: p.tagline,
              description: p.description,
              link: p.link ?? "",
              tech: p.tech ?? [],
              verticalImage: p.verticalImage ?? "/images/placeholder-vert.png",
              horizontalImage:
                p.horizontalImage ?? "/images/placeholder-horiz.png",
            }}
          />
        );
      })}
    </>
  );
}
