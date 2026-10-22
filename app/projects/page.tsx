import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Bibliotecas C#, ferramentas e aplicações web construídas por Eduardo Amorim Pereira.",
};

export default function ProjectsPage() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow mono mono--xs">Catálogo</p>
          <h1 className="page-head__title">
            Projetos <em>publicados e em andamento.</em>
          </h1>
          <p className="page-head__lede">
            Cada entrada tem código real por trás. Alguns projetos são
            bibliotecas com distribuição pública via NuGet; outros são
            aplicações web usadas como demonstração de engenharia de front-end.
          </p>
        </header>

        <div className="project-grid project-grid--catalog">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="catalog-footer">
          <p className="mono mono--xs">
            Mais em construção — o catálogo é atualizado conforme os projetos
            chegam a um estado publicável.
          </p>
          <Link href="/contact" className="link-arrow mono mono--sm">
            Conversar sobre um projeto <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
