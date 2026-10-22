export type ProjectCategory = "biblioteca" | "ferramenta" | "aplicacao-web";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "nuget" | "live";
}

export interface CodeLine {
  code: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  categoryLabel: string;
  stack: string[];
  summary: string;
  intro: string[];
  features: string[];
  decisions?: string[];
  links: ProjectLink[];
  featured?: boolean;
  codeSample?: { caption?: string; language: string; lines: CodeLine[] };
}

export const projects: Project[] = [
  {
    slug: "humanizexternity",
    index: "01",
    name: "Humanizexternity",
    tagline: "Biblioteca C# para humanizar medidas numéricas.",
    category: "biblioteca",
    categoryLabel: "Biblioteca · .NET",
    stack: ["C#", ".NET 10", "NuGet", "AOT-friendly"],
    summary:
      'Converte valores numéricos brutos em strings legíveis e converte de volta. 1024 MB vira "1 GB"; 1500 g vira "1.5 kg"; 3661 s vira "1 h 1 min 1 s".',
    intro: [
      "Humanizexternity (H13y) é uma biblioteca C# distribuída via NuGet que traduz valores numéricos brutos em strings legíveis, e interpreta essas strings de volta em valores estruturados. O objetivo é resolver o problema recorrente de exibir medidas — bytes, gramas, metros, segundos — de forma compreensível para humanos, sem perder precisão.",
      'A biblioteca cobre quinze dimensões (dados, massa, comprimento, tempo, volume, área, temperatura, velocidade, energia, potência, pressão, frequência, ângulo, bits e taxa de transferência), oferece medidas tipadas (DataSize, Mass, Length, Duration, etc.) com aritmética e comparação, e inclui um parser tolerante que entende formas compostas como "1h30min" e "1:30:45".',
    ],
    features: [
      'Auto-seleção da melhor unidade para exibição: 1500 g vira "1.5 kg"; 3661 s vira "1 h 1 min 1 s".',
      "Parser culture-aware com Span<char>, que respeita o separador decimal da cultura.",
      "Medidas tipadas (Mass, Length, DataSize, Duration, Temperature, etc.) implementando IFormattable.",
      "Conversão, aritmética e comparação entre unidades do mesmo tipo.",
      "JSON converters via System.Text.Json, com serialização por unidade base.",
      "Suporte a localização via IStringLocalizer, com fallback para inglês quando uma chave está ausente.",
      'Recursos extras: tempo relativo ("5 minutes ago"), ordinais ("22nd"), numerais romanos, notação compacta ("1.5M") e aproximação ("about 1200").',
      "Marcada como IsAotCompatible — funciona sob Native AOT e trimming.",
    ],
    decisions: [
      "O parser single-value usa Span<char> e stackalloc em vez de regex, reduzindo alocações em hot path.",
      "A lista de unidades e a seleção de melhor unidade são pré-computadas por dimensão; loops de formatação não realocam.",
      'Desde a v1.0.0, todas as APIs de parsing exigem CultureInfo explícito, eliminando ambiguidade entre "1,5" e "1.5".',
      "A biblioteca inclui projeto de benchmarks (BenchmarkDotNet) mantido fora da solução para não desacelerar dotnet test.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/eduardozitinho1/Humanizexternity",
        kind: "github",
      },
      {
        label: "NuGet",
        href: "https://www.nuget.org/packages/Humanizexternity",
        kind: "nuget",
      },
    ],
    featured: true,
    codeSample: {
      caption: "API principal do pacote.",
      language: "csharp",
      lines: [
        { code: "using H13y;" },
        { code: "" },
        { code: "H.Bytes(1073741824);" },
        { code: "H.Grams(1500);" },
        { code: "H.Seconds(3661);" },
        { code: 'H.Parse("100 km/h").ToBase();' },
        { code: "H.Ordinal(22);" },
        { code: "H.Compact(1_500_000);" },
      ],
    },
  },
  {
    slug: "mics",
    index: "02",
    name: "Mics",
    tagline: "Transforma código C# em música — CLI e biblioteca.",
    category: "ferramenta",
    categoryLabel: "Ferramenta · Ecossistema .NET",
    stack: ["C#", ".NET 10", "Roslyn", "NuGet Tool", "Síntese de áudio"],
    summary:
      "Uma biblioteca fluente para compor som em C# e uma CLI que usa Roslyn para mapear a árvore sintática de um arquivo .cs a eventos musicais, produzindo um WAV.",
    intro: [
      "Mics é um ecossistema em três pacotes NuGet: Mics.Core (biblioteca de composição), Mics.CodeAnalysis (análise de código baseada em Roslyn) e Mics.Cli (ferramenta de linha de comando instalável via dotnet tool).",
      'A biblioteca sozinha permite compor notas, melodias e acordes em C# puro, com escalas e instrumentos pré-definidos, e exporta para WAV. A CLI combina as duas partes: lê um arquivo .cs, percorre a árvore sintática com Roslyn e mapeia nós (métodos, condicionais, loops, declarações) para uma timeline musical, com uma "voz" por tipo declarado.',
    ],
    features: [
      "Biblioteca fluente: Sound.Note, Sound.Melody, Sound.Chord, Track, SongBuilder.",
      "Síntese de áudio com quatro instrumentos (sine, triangle, square, sawtooth) e envelope ADSR.",
      "Seis escalas: major, minor, dorian, mixolydian, pentatonic, blues.",
      "CLI com subcomandos: mics compose, mics scales, mics instruments.",
      "Sonificação baseada em Roslyn: cada declaração de tipo abre uma nova voz; corpos de método e estruturas de controle emitem notas na voz ativa.",
      "Saída determinística — testes garantem que a mesma entrada produz a mesma composição e o mesmo array de amostras.",
    ],
    decisions: [
      "Renderização e escrita de WAV são internas; a API pública do Mics.Core expõe apenas o que o usuário deve precisar.",
      "A CLI valida entrada (escala, tempo, instrumento) antes de invocar o parser e recusa valores não finitos ou não positivos.",
      "Testes cobrem o cabeçalho RIFF/WAVE em byte-level, garantindo que a saída de áudio seja interoperável.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/eduardozitinho1/Mics",
        kind: "github",
      },
      {
        label: "Mics.Cli (NuGet)",
        href: "https://www.nuget.org/packages/Mics.Cli",
        kind: "nuget",
      },
      {
        label: "Mics.Core (NuGet)",
        href: "https://www.nuget.org/packages/Mics.Core",
        kind: "nuget",
      },
    ],
    featured: true,
    codeSample: {
      caption: "Uso da biblioteca Mics.Core.",
      language: "csharp",
      lines: [
        { code: 'Sound.Note("C4").Save("note.wav");' },
        { code: 'Sound.Melody("C4", "E4", "G4").Save("melody.wav");' },
        { code: 'Sound.Chord("C4", "E4", "G4").Save("chord.wav");' },
        { code: "" },
        { code: "Sound.Song()" },
        { code: "    .Tempo(100)" },
        { code: '    .Voice("lead", "triangle", v => v' },
        { code: '        .Note("C4").Note("E4").Note("G4").Note("C5"))' },
        { code: '    .Voice("bass", "sawtooth", v => v' },
        { code: '        .Note("C2", beats: 4))' },
        { code: '    .Save("song.wav");' },
      ],
    },
  },
  {
    slug: "vanta-studio",
    index: "03",
    name: "VANTA STUDIO",
    tagline: "E-commerce de moda fictício com painel administrativo.",
    category: "aplicacao-web",
    categoryLabel: "Aplicação web · React",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "React Router",
      "Tailwind",
      "Zod",
      "Supabase (opcional)",
    ],
    summary:
      "Loja fictícia de moda editorial + dashboard administrativo, usada como demonstração de engenharia de front-end. Sem backend por padrão, com modo Supabase opcional protegido por RLS.",
    intro: [
      "VANTA STUDIO é uma aplicação web completa — loja e painel administrativo — construída como peça de portfólio. Não é uma loja real; todo o catálogo, preços e pedidos são fictícios e nenhum pagamento é processado.",
      "O site funciona em dois modos: modo local (padrão), em que os dados vivem em localStorage; e modo Supabase (opcional), em que a persistência e a autenticação usam o Supabase com Row Level Security habilitado.",
    ],
    features: [
      "Loja: home editorial, catálogo com filtros, busca, página de produto, carrinho, checkout simulado e página de confirmação de pedido.",
      "Administração: autenticação demo, painel, CRUD de produtos, listagem de pedidos com atualização de status, coleções.",
      "Persistência em localStorage (modo demo) ou Supabase com RLS (modo opcional).",
      "Schema SQL para Supabase incluído, com RLS em todas as tabelas e função is_admin() baseada em JWT.",
      "Testes com Vitest cobrindo cart reducer, filtros de catálogo e schemas Zod.",
    ],
    decisions: [
      "A autenticação demo é explicitamente declarada como não-segurança no README e no código; toda autorização real é delegada ao RLS do Supabase.",
      "Nenhum segredo (SUPABASE_SERVICE_ROLE_KEY) é exposto em código cliente; apenas a anon key.",
      "O README e a UI reiteram que a marca é fictícia, evitando qualquer ambiguidade.",
    ],
    links: [
      {
        label: "Ver site",
        href: "https://www.vanta-studio.xubi.org",
        kind: "live",
      },
    ],
    featured: true,
  },
  {
    slug: "chronos-relojoaria",
    index: "04",
    name: "Chronos Relojoaria",
    tagline: "Loja fictícia de relógios de alta relojoaria.",
    category: "aplicacao-web",
    categoryLabel: "Aplicação web · React",
    stack: ["React 19", "TypeScript", "Vite", "React Router", "CSS modular"],
    summary:
      "Vitrine de relógios fictícios com catálogo tipado, filtros, página de detalhe com especificações técnicas e carrinho persistente. Sem backend — front-end estático.",
    intro: [
      "Chronos Relojoaria é uma vitrine estática de uma marca fictícia de relógios de alta relojoaria. Toda a coleção (12 peças), referências, calibres e descrições foram inventados especificamente para o projeto.",
      "A aplicação é front-end puro: catálogo no código, carrinho em localStorage, sem processamento de pagamento. O botão de finalizar compra é intencionalmente desabilitado, reforçando o caráter demonstrativo.",
    ],
    features: [
      "Catálogo com busca por nome/referência e filtros por categoria, movimento e faixa de preço.",
      "Página de detalhe com galeria de imagens, especificações técnicas (movimento, caixa, pulseira, diâmetro, resistência) e peças relacionadas.",
      "Carrinho persistente em localStorage com sanitização de dados — entradas malformadas são descartadas e quantidades são clampeadas.",
      "Totais são sempre recalculados a partir do preço × quantidade; nenhum total armazenado é confiado.",
    ],
    decisions: [
      "O dataset de produtos é a única fonte de verdade; componentes não redeclaram produtos.",
      "A sanitização no hydrate protege contra dados corrompidos ou injetados no localStorage.",
      "Nenhuma dependência de UI third-party — apenas React Router e lucide-react.",
    ],
    links: [
      { label: "Ver site", href: "https://www.chronos.opik.net", kind: "live" },
    ],
    featured: true,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);
