import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__identity">
            <p className="site-footer__name">{site.name}</p>
            <p className="site-footer__role">{site.role} — autodidata.</p>
          </div>

          <nav className="site-footer__nav" aria-label="Rodapé">
            <Link href="/projects">Projetos</Link>
            <Link href="/about">Sobre</Link>
            <Link href="/briefing">Criar site</Link>
            <Link href="/contact">Contato</Link>
          </nav>

          <div className="site-footer__contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="site-footer__base">
          <p className="mono mono--xs">
            © {new Date().getFullYear()} — feito em Next.js
          </p>
          <p className="mono mono--xs">Brasil</p>
        </div>
      </div>
    </footer>
  );
}
