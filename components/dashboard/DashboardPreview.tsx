'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import { fadeInUp } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DashboardPreview() {
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dashboardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dashboardRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section id="dashboard" className="bg-bg-primary relative overflow-hidden">
      <Container size="wide">
        <div className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block text-caption text-accent font-mono font-medium mb-4 tracking-wider uppercase"
          >
            Product
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-display font-semibold text-text-primary mb-4"
          >
            Built for{' '}
            <span className="text-text-secondary">operators</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-body-lg text-text-tertiary max-w-lg mx-auto"
          >
            A workspace designed for clarity. Monitor, analyze, and act on intelligence in real time.
          </motion.p>
        </div>

        <div ref={dashboardRef}>
          <div className="relative rounded-2xl overflow-hidden border border-border glass-strong shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-tertiary/60">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-bg-primary/50 text-caption text-text-muted">
                  workspace.xai.dev
                </div>
              </div>
            </div>

            <div className="flex h-[560px]">
              <Sidebar />
              <DashboardContent />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
