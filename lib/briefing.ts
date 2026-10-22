export type ProjectType =
  | 'institucional'
  | 'portfolio'
  | 'landing'
  | 'loja'
  | 'blog'
  | 'aplicacao'
  | 'outro';

export interface BriefingData {
  projectType: ProjectType | '';
  goal: string;
  audience: string;
  features: string[];
  timeline: string;
  name: string;
  email: string;
  notes: string;
}

export const EMPTY_BRIEFING: BriefingData = {
  projectType: '',
  goal: '',
  audience: '',
  features: [],
  timeline: '',
  name: '',
  email: '',
  notes: '',
};

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  institucional: 'Site institucional',
  portfolio: 'Portfólio',
  landing: 'Landing page',
  loja: 'Loja virtual',
  blog: 'Blog',
  aplicacao: 'Aplicação web',
  outro: 'Outro',
};

export const PROJECT_TYPE_PRICES: Record<ProjectType, number> = {
  landing: 800,
  portfolio: 1200,
  blog: 1500,
  institucional: 1800,
  outro: 1800,
  loja: 3800,
  aplicacao: 5000,
};

export const FEATURE_PRICES: Record<string, number> = {
  'Formulário de contato': 150,
  'Newsletter': 200,
  'Catálogo de produtos': 500,
  'Multilíngue': 500,
  'Integração com API': 800,
  'Login / área restrita': 900,
  'Pagamento online': 1200,
  'Painel administrativo': 1500,
};

export const TIMELINE_PRICES: Record<string, number> = {
  '1 a 2 meses': 800,
  '3 a 6 meses': 0,
  'Sem pressa': -400,
};

export const AUDIENCE_PRICES: Record<string, number> = {
  'Empresas (B2B)': 0,
  'Consumidores (B2C)': 0,
  'Os dois': 300,
  'Ainda não sei': 0,
};

export interface PriceLine {
  label: string;
  value: number;
}

export interface PriceBreakdown {
  lines: PriceLine[];
  total: number;
}

export function calculatePrice(data: BriefingData): PriceBreakdown {
  const lines: PriceLine[] = [];

  if (data.projectType) {
    lines.push({
      label: `Base — ${PROJECT_TYPE_LABELS[data.projectType]}`,
      value: PROJECT_TYPE_PRICES[data.projectType],
    });
  }

  for (const feature of data.features) {
    const price = FEATURE_PRICES[feature];
    if (price !== undefined && price > 0) {
      lines.push({ label: `+ ${feature}`, value: price });
    }
  }

  if (data.audience) {
    const price = AUDIENCE_PRICES[data.audience];
    if (price && price !== 0) {
      lines.push({ label: `+ Público: ${data.audience}`, value: price });
    }
  }

  if (data.timeline) {
    const price = TIMELINE_PRICES[data.timeline];
    if (price !== undefined && price !== 0) {
      lines.push({
        label: `${price > 0 ? '+' : '−'} Prazo: ${data.timeline}`,
        value: price,
      });
    }
  }

  const total = lines.reduce((sum, line) => sum + line.value, 0);
  return { lines, total: Math.max(0, total) };
}

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatBRL(value: number): string {
  return brlFormatter.format(value);
}

export function formatBriefingText(data: BriefingData): string {
  const breakdown = calculatePrice(data);
  const lines = [
    'BRIEFING DE PROJETO',
    '',
    `Tipo de projeto: ${data.projectType ? PROJECT_TYPE_LABELS[data.projectType] : '—'}`,
    `Objetivo: ${data.goal || '—'}`,
    `Público: ${data.audience || '—'}`,
    `Funcionalidades: ${data.features.length ? data.features.join(', ') : '—'}`,
    `Prazo: ${data.timeline || '—'}`,
    '',
    'ESTIMATIVA DE INVESTIMENTO',
    ...breakdown.lines.map((l) => `  ${l.label}: ${formatBRL(l.value)}`),
    `  Total estimado: ${formatBRL(breakdown.total)}`,
    '',
    `Contato: ${data.name} <${data.email}>`,
  ];
  if (data.notes.trim()) {
    lines.push('', 'Observações:', data.notes.trim());
  }
  return lines.join('\n');
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
