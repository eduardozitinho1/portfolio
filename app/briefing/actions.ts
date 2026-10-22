'use server';

import { formatBriefingText, isValidEmail, type BriefingData } from '@/lib/briefing';

const PRIMARY_EMAIL = 'dudu26315@gmail.com';
const SECONDARY_EMAIL = 'dujango@hotmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${PRIMARY_EMAIL}`;

export interface SendResult {
  ok: boolean;
  error?: string;
}

export async function sendBriefing(data: BriefingData): Promise<SendResult> {
  if (!data.name.trim() || !data.email.trim()) {
    return { ok: false, error: 'Nome e e-mail são obrigatórios.' };
  }
  if (!isValidEmail(data.email)) {
    return { ok: false, error: 'E-mail inválido.' };
  }
  if (data.notes.length > 4000) {
    return { ok: false, error: 'Observações acima do limite de 4000 caracteres.' };
  }

  const payload = {
    name: data.name,
    email: data.email,
    _subject: `Novo briefing — ${data.name}`,
    _replyto: data.email,
    _cc: SECONDARY_EMAIL,
    _template: 'table',
    _captcha: 'false',
    message: formatBriefingText(data),
  };

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        ok: false,
        error: 'O envio automático falhou. Tente novamente ou use o e-mail direto.',
      };
    }

    const json = (await res.json().catch(() => null)) as
      | { success?: string | boolean }
      | null;

    if (json && json.success === 'true') {
      return { ok: true };
    }
    if (json && json.success === true) {
      return { ok: true };
    }

    return {
      ok: false,
      error: 'O serviço de envio recusou a mensagem. Use o e-mail direto.',
    };
  } catch {
    return {
      ok: false,
      error: 'Falha de rede. Verifique sua conexão ou use o e-mail direto.',
    };
  }
}
