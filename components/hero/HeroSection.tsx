'use client';

import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import HeroScene from './HeroScene';
import Container from '@/components/layout/Container';
import CanvasLoader from '@/components/ui/CanvasLoader';
import WebGLErrorBoundary from '@/components/ui/WebGLErrorBoundary';
import { fadeInUp, staggerContainer } from '@/lib/animations';

function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <WebGLErrorBoundary>
        <Suspense fallback={<CanvasLoader />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <HeroScene />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.04] rounded-full blur-[120px]" />

      <HeroCanvas />

      <motion.div style={{ y, opacity }} className="relative z-10">
        <Container size="narrow">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-caption text-text-secondary font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-slow" aria-hidden="true" />
                Intelligence Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-heading-lg sm:text-display md:text-display-lg font-semibold text-text-primary mb-6 text-balance"
            >
              Raw data.{' '}
              <span className="gradient-text-accent">
                Real intelligence.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-text-secondary max-w-xl mx-auto mb-10 text-balance"
            >
              Transform unstructured signals into structured insight.
              AI-powered analysis that surfaces what matters, when it matters.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-4"
            >
              <a
                href="#insight-flow"
                className="inline-flex px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium text-body-sm rounded-xl transition-all duration-200 glow-accent hover:glow-accent-strong"
              >
                Start Building
              </a>
              <a
                href="#dashboard"
                className="inline-flex px-6 py-3 glass hover:bg-surface-hover text-text-secondary hover:text-text-primary font-medium text-body-sm rounded-xl transition-all duration-200"
              >
                View Demo
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-caption text-text-muted">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-border-strong flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-text-tertiary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
