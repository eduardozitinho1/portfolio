import type { Metadata } from 'next';
import { BriefingForm } from './briefing-form';

export const metadata: Metadata = {
  title: 'Criar site',
  description:
    'Formulário curto para descrever seu projeto. A mensagem chega direto no meu e-mail.',
};

export default function BriefingPage() {
  return (
    <div className="page">
      <div className="container container--narrow">
        <header className="page-head">
          <p className="eyebrow mono mono--xs">Criar site</p>
          <h1 className="page-head__title">
            Conte o que você precisa. <em>Eu respondo.</em>
          </h1>
          <p className="page-head__lede">
            Quatro etapas curtas para organizar seu projeto antes da conversa.
            Ao terminar, a mensagem chega direto no meu e-mail.
          </p>
        </header>

        <BriefingForm />
      </div>
    </div>
  );
}
