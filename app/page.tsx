import Link from "next/link";
import { site } from "@/lib/site";
import { getFeaturedProjects, projects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { CodeBlock } from "@/components/projects/code-block";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const flagship = projects[0];

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__meta">
            <span className="dot" aria-hidden />
            <span className="mono mono--xs">
              Portfólio · {new Date().getFullYear()}
            </span>
          </div>

          <h1 className="hero__title">
            Software de base,
            <br />
            <em>feito com cuidado.</em>
          </h1>

          <div className="hero__body">
            <p className="hero__lead">
              Sou Eduardo Amorim Pereira, desenvolvedor autodidata. Escrevo C# e
              TypeScript, publico bibliotecas no NuGet e construo aplicações com
              React e Next.js. Este site reúne parte do que já fiz — do parser
              de unidades em .NET ao site de moda fictício usado como
              demonstração de engenharia de front-end.
            </p>
            <div className="hero__actions">
              <Link href="/projects" className="btn btn--primary">
                Ver os projetos <span aria-hidden>→</span>
              </Link>
              <Link href="/about" className="btn btn--ghost">
                Sobre mim
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--featured"
        aria-labelledby="featured-title"
      >
        <div className="container">
          <div className="section-head">
            <p className="eyebrow mono mono--xs">Destaque</p>
            <h2 id="featured-title" className="section-title">
              Humanizexternity — uma biblioteca que traduz números em linguagem
              humana.
            </h2>
          </div>

          <div className="featured">
            <div className="featured__body">
              <p className="featured__lede">{flagship.summary}</p>
              <p className="featured__text">{flagship.intro[0]}</p>
              <ul className="featured__features" aria-label="Características">
                {flagship.features.slice(0, 4).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="featured__links">
                <Link
                  href={`/projects/${flagship.slug}`}
                  className="btn btn--primary"
                >
                  Ver o projeto <span aria-hidden>→</span>
                </Link>
                <a
                  href={flagship.links[0]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  GitHub
                </a>
                <a
                  href={flagship.links[1]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  NuGet
                </a>
              </div>
            </div>

            {flagship.codeSample && (
              <div className="featured__aside">
                <CodeBlock
                  lines={flagship.codeSample.lines}
                  language={flagship.codeSample.language}
                  caption={flagship.codeSample.caption}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="projects-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow mono mono--xs">Projetos</p>
            <h2 id="projects-title" className="section-title">
              O que eu construí, do mais técnico ao mais visível.
            </h2>
            <Link href="/projects" className="section-head__link mono mono--sm">
              Ver catálogo completo <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="project-grid">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--alt"
        aria-labelledby="specialties-title"
      >
        <div className="container">
          <div className="section-head">
            <p className="eyebrow mono mono--xs">Frentes de trabalho</p>
            <h2 id="specialties-title" className="section-title">
              Duas linguagens, um mesmo cuidado.
            </h2>
          </div>

          <div className="specialties">
            <article className="specialty">
              <p className="specialty__index mono mono--xs">01</p>
              <h3 className="specialty__title">C# e .NET</h3>
              <p className="specialty__text">
                Bibliotecas distribuídas via NuGet, ferramentas de linha de
                comando, testes extensivos, benchmarks com BenchmarkDotNet,
                publicação automatizada e compatibilidade com Native AOT.
              </p>
              <ul className="specialty__list mono mono--xs">
                <li>.NET 10</li>
                <li>Roslyn</li>
                <li>BenchmarkDotNet</li>
                <li>xUnit</li>
              </ul>
            </article>

            <article className="specialty">
              <p className="specialty__index mono mono--xs">02</p>
              <h3 className="specialty__title">TypeScript e React</h3>
              <p className="specialty__text">
                Aplicações web com tipagem estrita, separação entre dados e
                apresentação, gerenciamento de estado explícito (reducers,
                contextos), sanitização de dados persistidos e testes de
                comportamento.
              </p>
              <ul className="specialty__list mono mono--xs">
                <li>React 19</li>
                <li>Next.js</li>
                <li>Vite</li>
                <li>Vitest</li>
              </ul>
            </article>

            <article className="specialty">
              <p className="specialty__index mono mono--xs">03</p>
              <h3 className="specialty__title">Ferramentas e DX</h3>
              <p className="specialty__text">
                Empacotamento e publicação, automação de releases, análise de
                código com Roslyn e síntese de áudio. Gosto de construir a
                ferramenta que resolve o problema — não só de usá-la.
              </p>
              <ul className="specialty__list mono mono--xs">
                <li>GitHub Actions</li>
                <li>NuGet</li>
                <li>Package Tool</li>
                <li>AOT</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-preview-title">
        <div className="container">
          <div className="about-preview">
            <p className="eyebrow mono mono--xs">Sobre</p>
            <h2 id="about-preview-title" className="about-preview__title">
              Aprendi construindo. Continuo construindo.
            </h2>
            <p className="about-preview__text">
              Sou desenvolvedor autodidata. Meu jeito de aprender é o mesmo que
              uso para trabalhar: pego um problema real, leio a documentação,
              escrevo testes e itero até o resultado parecer inevitável. Este
              site é uma amostra disso.
            </p>
            <Link href="/about" className="link-arrow mono mono--sm">
              Ler a história completa <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--cta" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta">
            <p className="eyebrow mono mono--xs">Criar site</p>
            <h2 id="cta-title" className="cta__title">
              Quer um site assim, feito para o seu projeto?
            </h2>
            <p className="cta__text">
              Conte o que você precisa em quatro etapas curtas. O formulário
              organiza o briefing e envia a mensagem direto para o meu e-mail.
            </p>
            <div className="cta__actions">
              <Link href="/briefing" className="btn btn--primary btn--lg">
                Começar o briefing <span aria-hidden>→</span>
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn--ghost">
                Prefiro mandar e-mail
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
