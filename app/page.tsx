'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), {
  ssr: false,
});
const InsightFlowSection = dynamic(
  () => import('@/components/insight-flow/InsightFlowSection'),
  { ssr: false }
);
const DashboardPreview = dynamic(
  () => import('@/components/dashboard/DashboardPreview'),
  { ssr: false }
);
const SignatureInteraction = dynamic(
  () => import('@/components/signature/SignatureInteraction'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <InsightFlowSection />
      <DashboardPreview />
      <SignatureInteraction />
      <Footer />
    </main>
  );
}
