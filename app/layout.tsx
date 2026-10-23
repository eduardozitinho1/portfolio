import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { site } from '@/lib/site';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  sameAs: [site.github, site.linkedin],
  knowsAbout: ['C#', '.NET', 'TypeScript', 'React', 'Next.js'],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Portfólio`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  verification: {
    google: 'jYmEOsQ-5Ljg4CXnRZEizY3xvPRO3k4I2RDntIX8-xU',
  },
  openGraph: {
    type: 'website',
    title: `${site.name} — Portfólio`,
    description: site.description,
    siteName: site.name,
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Portfólio`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a href="#main" className="skip-link">Pular para o conteúdo</a>
        <SiteHeader />
        <main id="main" className="site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
