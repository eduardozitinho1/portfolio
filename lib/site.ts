export const site = {
  name: "Eduardo Amorim Pereira",
  shortName: "Eduardo A. Pereira",
  role: "Desenvolvedor de software",
  description:
    "Desenvolvedor autodidata. Bibliotecas em C#, ferramentas de linha de comando e interfaces com React e Next.js.",
  email: "dudu26315@gmail.com",
  emailSecondary: "dujango@hotmail.com",
  github: "https://github.com/eduardozitinho1",
  linkedin: "https://www.linkedin.com/in/eduardo-amorim-pereira-321a72422/",
  whatsapp: "https://wa.me/5511911297208",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
} as const;
