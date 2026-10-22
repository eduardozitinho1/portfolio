'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { sendBriefing } from './actions';
import {
  AUDIENCE_PRICES,
  EMPTY_BRIEFING,
  FEATURE_PRICES,
  PROJECT_TYPE_PRICES,
  TIMELINE_PRICES,
  calculatePrice,
  formatBRL,
  formatBriefingText,
  isValidEmail,
  type BriefingData,
  type ProjectType,
} from '@/lib/briefing';
import { site } from '@/lib/site';

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: 'institucional', label: 'Site institucional' },
  { value: 'portfolio', label: 'Portfólio' },
  { value: 'landing', label: 'Landing page' },
  { value: 'loja', label: 'Loja virtual' },
  { value: 'blog', label: 'Blog' },
  { value: 'aplicacao', label: 'Aplicação web' },
  { value: 'outro', label: 'Outro' },
];

const GOALS = [
  'Vender produtos',
  'Apresentar meus serviços',
  'Mostrar meu trabalho',
  'Captar contatos',
  'Publicar conteúdo',
];

const AUDIENCES = [
  'Empresas (B2B)',
  'Consumidores (B2C)',
  'Os dois',
  'Ainda não sei',
];

const FEATURES = [
  'Formulário de contato',
  'Newsletter',
  'Catálogo de produtos',
  'Multilíngue',
  'Integração com API',
  'Login / área restrita',
  'Pagamento online',
  'Painel administrativo',
];

const TIMELINES = ['1 a 2 meses', '3 a 6 meses', 'Sem pressa'];

const STEPS = ['Projeto', 'Funcionalidades', 'Prazo', 'Contato'] as const;

export function BriefingForm() {
  const [data, setData] = useState<BriefingData>(EMPTY_BRIEFING);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof BriefingData>(key: K, value: BriefingData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (error) setError(null);
  };

  const toggleFeature = (f: string) => {
    setData((d) => ({
      ...d,
      features: d.features.includes(f)
        ? d.features.filter((x) => x !== f)
        : [...d.features, f],
    }));
  };

  const breakdown = useMemo(() => calculatePrice(data), [data]);

  const canAdvance = useMemo(() => {
    if (step === 0) return Boolean(data.projectType);
    if (step === 1) return data.features.length > 0;
    if (step === 2) return Boolean(data.timeline);
    if (step === 3) return Boolean(data.name.trim()) && isValidEmail(data.email);
    return false;
  }, [step, data]);

  const goNext = () => {
    if (!canAdvance) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Briefing — ${data.name || 'projeto'}`,
  )}&body=${encodeURIComponent(formatBriefingText(data))}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!data.name.trim() || !data.email.trim()) {
      setError('Nome e e-mail são obrigatórios.');
      return;
    }
    if (!isValidEmail(data.email)) {
      setError('E-mail inválido.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await sendBriefing(data);
      if (!result.ok) {
        setError(result.error ?? 'Não foi possível enviar.');
        return;
      }
      setSuccess(true);
    } catch {
      setError('Falha inesperada ao enviar.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="briefing-success">
        <p className="eyebrow mono mono--xs">Enviado</p>
        <h2 className="briefing-success__title">Recebi seu briefing.</h2>
        <p className="briefing-success__text">
          Vou responder pelo e-mail que você deixou ({data.email}).
        </p>

        <div className="briefing-success__estimate">
          <span className="mono mono--xs">Estimativa calculada</span>
          <span className="briefing-success__estimate-value">
            {formatBRL(breakdown.total)}
          </span>
          <p className="briefing-success__estimate-note">
            Valor aproximado. O total final será confirmado após analisar os
            detalhes do escopo.
          </p>
        </div>

        <details className="briefing-success__details">
          <summary>Ver o que foi enviado</summary>
          <pre className="briefing-success__pre">{formatBriefingText(data)}</pre>
        </details>

        <div className="briefing-success__actions">
          <Link href="/" className="btn btn--primary">
            Voltar ao início <span aria-hidden>→</span>
          </Link>
          <Link href="/projects" className="btn btn--ghost">
            Ver projetos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="briefing" onSubmit={handleSubmit} noValidate>
      <div className="briefing__progress">
        <div className="briefing__progress-bar">
          <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
        <div className="briefing__progress-meta mono mono--xs">
          <span>
            Etapa {step + 1} de {STEPS.length}
          </span>
          <span>{STEPS[step]}</span>
        </div>
      </div>

      {step === 0 && (
        <fieldset className="briefing__step">
          <legend className="briefing__legend">
            <span className="eyebrow mono mono--xs">Etapa 01</span>
            <h2 className="briefing__title">Que tipo de site você precisa?</h2>
          </legend>

          <div className="briefing__grid">
            {PROJECT_TYPES.map((t) => (
              <label
                key={t.value}
                className={`briefing__choice${data.projectType === t.value ? ' briefing__choice--active' : ''}`}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={t.value}
                  checked={data.projectType === t.value}
                  onChange={() => update('projectType', t.value)}
                />
                <span className="briefing__choice-label">{t.label}</span>
                <span className="briefing__choice-price">
                  {formatBRL(PROJECT_TYPE_PRICES[t.value])}
                </span>
              </label>
            ))}
          </div>

          <div className="briefing__field">
            <span className="briefing__label">Objetivo principal</span>
            <div className="briefing__pills">
              {GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => update('goal', g)}
                  aria-pressed={data.goal === g}
                  className={`pill${data.goal === g ? ' pill--active' : ''}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="briefing__field">
            <span className="briefing__label">Quem vai usar?</span>
            <div className="briefing__pills">
              {AUDIENCES.map((a) => {
                const price = AUDIENCE_PRICES[a] ?? 0;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => update('audience', a)}
                    aria-pressed={data.audience === a}
                    className={`pill${data.audience === a ? ' pill--active' : ''}`}
                  >
                    {a}
                    {price > 0 && (
                      <span className="pill__price">+ {formatBRL(price)}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="briefing__step">
          <legend className="briefing__legend">
            <span className="eyebrow mono mono--xs">Etapa 02</span>
            <h2 className="briefing__title">O que o site precisa fazer?</h2>
          </legend>

          <p className="briefing__hint">
            Selecione tudo que fizer sentido. Cada item tem um custo estimado.
          </p>

          <div className="briefing__grid">
            {FEATURES.map((f) => {
              const price = FEATURE_PRICES[f] ?? 0;
              return (
                <label
                  key={f}
                  className={`briefing__choice${data.features.includes(f) ? ' briefing__choice--active' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={data.features.includes(f)}
                    onChange={() => toggleFeature(f)}
                  />
                  <span className="briefing__choice-label">{f}</span>
                  <span className="briefing__choice-price">
                    + {formatBRL(price)}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="briefing__step">
          <legend className="briefing__legend">
            <span className="eyebrow mono mono--xs">Etapa 03</span>
            <h2 className="briefing__title">Prazo desejado.</h2>
          </legend>

          <p className="briefing__hint">
            Prazos curtos exigem dedicação exclusiva e têm adicional. Sem
            pressa, você economiza.
          </p>

          <div className="briefing__pills">
            {TIMELINES.map((t) => {
              const price = TIMELINE_PRICES[t] ?? 0;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => update('timeline', t)}
                  aria-pressed={data.timeline === t}
                  className={`pill${data.timeline === t ? ' pill--active' : ''}`}
                >
                  {t}
                  {price !== 0 && (
                    <span className="pill__price">
                      {price > 0 ? '+' : '−'} {formatBRL(Math.abs(price))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="briefing__step">
          <legend className="briefing__legend">
            <span className="eyebrow mono mono--xs">Etapa 04</span>
            <h2 className="briefing__title">Como te encontro?</h2>
          </legend>

          <div className="briefing__field">
            <label className="briefing__label" htmlFor="b-name">
              Seu nome
            </label>
            <input
              id="b-name"
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              className="briefing__input"
              required
            />
          </div>

          <div className="briefing__field">
            <label className="briefing__label" htmlFor="b-email">
              Seu e-mail
            </label>
            <input
              id="b-email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              className="briefing__input"
              required
            />
          </div>

          <div className="briefing__field">
            <label className="briefing__label" htmlFor="b-notes">
              Algo mais que eu deva saber?{' '}
              <span className="briefing__optional">(opcional)</span>
            </label>
            <textarea
              id="b-notes"
              rows={4}
              value={data.notes}
              onChange={(e) => update('notes', e.target.value)}
              className="briefing__input briefing__textarea"
              placeholder="Referências, restrições, ideias soltas."
            />
          </div>

          <details className="briefing__review">
            <summary>
              <span>Rever o briefing completo</span>
              <span className="briefing__review-total">
                {formatBRL(breakdown.total)}
              </span>
            </summary>
            <pre className="briefing__pre">{formatBriefingText(data)}</pre>
          </details>
        </fieldset>
      )}

      {breakdown.total > 0 && (
        <div className="briefing__total" aria-live="polite">
          <span className="briefing__total-label mono mono--xs">
            Estimativa parcial
          </span>
          <span className="briefing__total-value">
            {formatBRL(breakdown.total)}
          </span>
        </div>
      )}

      {error && (
        <div className="briefing__error" role="alert">
          <p>{error}</p>
          <a href={mailtoHref} className="briefing__error-link">
            Prefere enviar por e-mail direto? Clique aqui.
          </a>
        </div>
      )}

      <div className="briefing__actions">
        {step > 0 && (
          <button type="button" onClick={goBack} className="btn btn--ghost">
            ← Voltar
          </button>
        )}

        {step < STEPS.length - 1 && (
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance}
            className="btn btn--primary"
          >
            Continuar <span aria-hidden>→</span>
          </button>
        )}

        {step === STEPS.length - 1 && (
          <button
            type="submit"
            disabled={!canAdvance || submitting}
            className="btn btn--primary"
          >
            {submitting ? 'Enviando…' : 'Enviar briefing'}
          </button>
        )}
      </div>
    </form>
  );
}
