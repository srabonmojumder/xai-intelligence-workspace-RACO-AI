import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Xai — Intelligence Workspace',
  description: 'Transform raw data into structured intelligence and actionable insight. AI-powered analysis that surfaces what matters.',
  keywords: ['intelligence', 'AI', 'data analysis', 'workspace', 'automation'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
