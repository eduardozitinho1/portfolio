import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container container--narrow">
      <div className="not-found">
        <p className="mono mono--xs eyebrow">Erro 404</p>
        <h1 className="not-found__title">
          Esta página <em>não existe.</em>
        </h1>
        <p className="not-found__text">
          O endereço que você tentou acessar não faz parte deste site. Se você
          veio de um link antigo, considere voltar ao início ou explorar os
          projetos diretamente.
        </p>
        <div className="not-found__actions">
          <Link href="/" className="btn btn--primary">
            Voltar ao início <span aria-hidden>→</span>
          </Link>
          <Link href="/projects" className="btn btn--ghost">
            Ver projetos
          </Link>
        </div>
      </div>
    </div>
  );
}
