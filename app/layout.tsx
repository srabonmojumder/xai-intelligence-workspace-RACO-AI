import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Xai — Intelligence Workspace',
  description:
    'Transform raw data into structured intelligence and actionable insight. AI-powered analysis that surfaces what matters, when it matters.',
  keywords: [
    'intelligence',
    'AI',
    'data analysis',
    'workspace',
    'automation',
    'machine learning',
    'real-time analytics',
  ],
  authors: [{ name: 'Xai Intelligence' }],
  openGraph: {
    title: 'Xai — Intelligence Workspace',
    description:
      'From raw data to structured intelligence to actionable insight. AI-powered analysis for decision-makers.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Xai Intelligence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xai — Intelligence Workspace',
    description:
      'From raw data to structured intelligence to actionable insight. AI-powered analysis for decision-makers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-body-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
