import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { CodeBlock } from "@/components/projects/code-block";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projeto" };
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
    },
  };
}

const linkLabel: Record<string, string> = {
  github: "GitHub",
  nuget: "NuGet",
  live: "Ver site",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="detail">
      <div className="container">
        <nav className="detail__crumbs mono mono--xs" aria-label="Trilha">
          <Link href="/projects">← Projetos</Link>
          <span aria-hidden>/</span>
          <span>{project.name}</span>
        </nav>

        <header className="detail__head">
          <div className="detail__head-left">
            <p className="eyebrow mono mono--xs">
              {project.categoryLabel} · {project.index}
            </p>
            <h1 className="detail__title">{project.name}</h1>
            <p className="detail__tagline">{project.tagline}</p>
          </div>

          <div className="detail__head-right">
            <ul className="detail__stack" aria-label="Tecnologias">
              {project.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
            <div className="detail__links">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  {linkLabel[l.kind] ?? l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </header>

        <div className="detail__grid">
          <div className="detail__main">
            <section className="detail__section">
              <h2 className="detail__section-title">Sobre o projeto</h2>
              {project.intro.map((p, i) => (
                <p key={i} className="detail__paragraph">
                  {p}
                </p>
              ))}
            </section>

            <section className="detail__section">
              <h2 className="detail__section-title">O que está dentro</h2>
              <ul className="detail__features">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            {project.decisions && project.decisions.length > 0 && (
              <section className="detail__section">
                <h2 className="detail__section-title">Decisões técnicas</h2>
                <ul className="detail__features detail__features--alt">
                  {project.decisions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="detail__aside">
            <div className="detail__aside-block">
              <p className="mono mono--xs eyebrow">Resumo</p>
              <p className="detail__summary">{project.summary}</p>
            </div>

            {project.codeSample && (
              <CodeBlock
                lines={project.codeSample.lines}
                language={project.codeSample.language}
                caption={project.codeSample.caption}
              />
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="detail__related">
            <p className="eyebrow mono mono--xs">Ver também</p>
            <div className="related-grid">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/projects/${r.slug}`}
                  className="related-card"
                >
                  <p className="mono mono--xs">{r.categoryLabel}</p>
                  <h3 className="related-card__title">{r.name}</h3>
                  <p className="related-card__tagline">{r.tagline}</p>
                  <span
                    className="related-card__arrow mono mono--sm"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
