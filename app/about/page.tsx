import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Eduardo Amorim Pereira — desenvolvedor autodidata. Como aprende, o que constrói e como pensa sobre software.",
};

export default function AboutPage() {
  return (
    <div className="page">
      <div className="container container--narrow">
        <header className="page-head">
          <p className="eyebrow mono mono--xs">Sobre</p>
          <h1 className="page-head__title">
            Desenvolvedor autodidata, <em>aprendiz permanente.</em>
          </h1>
        </header>

        <div className="prose">
          <p>
            Meu nome é Eduardo Amorim Pereira. Aprendi a programar de forma
            autodidata, e a maior parte do que sei veio de projetos reais que
            comecei e terminei por conta própria — bibliotecas publicadas no
            NuGet, ferramentas de linha de comando, aplicações web.
          </p>
          <p>
            Não tenho uma trajetória linear. O que tenho é uma prática
            consistente de construir coisas de ponta a ponta, escrever testes
            para elas e voltar depois para revisar decisões. Isso é o que me
            interessa em software: iterar até o resultado parecer inevitável.
          </p>
        </div>

        <section className="about-section">
          <h2 className="about-section__title">Como eu aprendo</h2>
          <p className="about-section__lede">
            Construindo. Cada biblioteca deste portfólio nasceu de uma
            necessidade concreta — formatar unidades sem reinventar a roda,
            transformar código em música como exercício de análise sintática.
          </p>
          <p>
            O processo é sempre parecido: começar pequeno, ler documentação
            primária (não tutoriais), cobrir o comportamento com testes à medida
            que o código cresce, e aceitar que a primeira versão vai ser
            refatorada. Não me interessa aprender a ferramenta pela ferramenta —
            me interessa resolver o problema que me fez procurá-la.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section__title">O que eu construo</h2>
          <div className="about-columns">
            <div>
              <h3 className="about-columns__title">C# e .NET</h3>
              <p>
                Bibliotecas distribuídas via NuGet e ferramentas de linha de
                comando. Gosto do ecossistema .NET pela combinação entre tipagem
                forte, ferramental maduro (BenchmarkDotNet, Roslyn) e suporte a
                Native AOT.
              </p>
              <p className="about-columns__note mono mono--xs">
                Humanizexternity · Mics.Core · Mics.CodeAnalysis · Mics.Cli
              </p>
            </div>
            <div>
              <h3 className="about-columns__title">TypeScript e React</h3>
              <p>
                Aplicações web com tipagem estrita, estado explícito e separação
                clara entre dados, apresentação e lógica. Gosto de e-commerce
                como exercício porque ele força você a lidar com os problemas
                reais de front-end: persistência, validação, estados vazios,
                fluxos de checkout.
              </p>
              <p className="about-columns__note mono mono--xs">
                VANTA STUDIO · Chronos Relojoaria
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section__title">Como eu trabalho</h2>
          <ul className="about-principles">
            <li>
              <span className="mono mono--xs">01</span>
              <div>
                <p className="about-principles__title">
                  Tipagem estrita sempre que possível.
                </p>
                <p>
                  Tipos são documentação executável — quando eles mentem, o
                  código já perdeu.
                </p>
              </div>
            </li>
            <li>
              <span className="mono mono--xs">02</span>
              <div>
                <p className="about-principles__title">
                  Testes como parte do design.
                </p>
                <p>
                  Escrever testes força a API a ser pensada de fora para dentro.
                </p>
              </div>
            </li>
            <li>
              <span className="mono mono--xs">03</span>
              <div>
                <p className="about-principles__title">Uma decisão por vez.</p>
                <p>
                  Prefiro código legível e com poucas abstrações a uma
                  arquitetura de vitrine.
                </p>
              </div>
            </li>
            <li>
              <span className="mono mono--xs">04</span>
              <div>
                <p className="about-principles__title">Documentação honesta.</p>
                <p>
                  Se é demo, o README diz que é demo. Se não foi testado, não é
                  apresentado como se tivesse sido.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <div className="about-cta">
          <p>
            Para conhecer o resultado desse processo, o próximo passo é ver os
            projetos.
          </p>
          <div className="about-cta__actions">
            <Link href="/projects" className="btn btn--primary">
              Ver projetos <span aria-hidden>→</span>
            </Link>
            <a href={`mailto:${site.email}`} className="btn btn--ghost">
              Falar comigo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
