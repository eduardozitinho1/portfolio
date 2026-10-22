import Link from "next/link";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
  variant?: "default" | "featured";
}

export function ProjectCard({ project, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card${isFeatured ? " project-card--featured" : ""}`}
    >
      <div className="project-card__head">
        <span className="project-card__index mono">{project.index}</span>
        <span className="project-card__category mono mono--xs">
          {project.categoryLabel}
        </span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__summary">{project.summary}</p>
      </div>

      <div className="project-card__foot">
        <ul className="project-card__stack" aria-label="Tecnologias">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <span className="project-card__arrow" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}
