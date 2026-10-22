import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Como falar com Eduardo Amorim Pereira — e-mail, GitHub, LinkedIn e WhatsApp.",
};

const channels = [
  {
    label: "GitHub",
    value: "@eduardozitinho1",
    href: site.github,
    hint: "Código, issues e pull requests.",
  },
  {
    label: "LinkedIn",
    value: "in/eduardo-amorim-pereira",
    href: site.linkedin,
    hint: "Para contato profissional.",
  },
  {
    label: "WhatsApp",
    value: "+55 11 91129-7208",
    href: site.whatsapp,
    hint: "Mensagens rápidas.",
  },
];

export default function ContactPage() {
  return (
    <div className="page">
      <div className="container container--narrow">
        <header className="page-head">
          <p className="eyebrow mono mono--xs">Contato</p>
          <h1 className="page-head__title">
            Se algo aqui fizer sentido, <em>me escreva.</em>
          </h1>
          <p className="page-head__lede">
            O e-mail é o canal mais confiável. Se preferir, os outros caminhos
            estão listados abaixo. Respondo com a mesma atenção em qualquer um.
          </p>
        </header>

        <div className="contact-primary">
          <p className="mono mono--xs eyebrow">E-mail principal</p>
          <a href={`mailto:${site.email}`} className="contact-primary__email">
            {site.email}
          </a>
        </div>

        <ul className="contact-channels">
          {channels.map((c) => (
            <li key={c.label} className="contact-channel">
              <span className="contact-channel__label mono mono--xs">
                {c.label}
              </span>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel__value"
              >
                {c.value}{" "}
                <span aria-hidden className="contact-channel__arrow">
                  ↗
                </span>
              </a>
              <p className="contact-channel__hint">{c.hint}</p>
            </li>
          ))}
        </ul>

        <div className="contact-secondary">
          <p>E-mail alternativo, caso o principal não esteja funcionando:</p>
          <a
            href={`mailto:${site.emailSecondary}`}
            className="contact-secondary__link mono mono--sm"
          >
            {site.emailSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}
