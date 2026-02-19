'use client';

import { Suspense, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeObject from './ThreeObject';
import Container from '@/components/layout/Container';
import { fadeInUp } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SignatureInteraction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[150px]" />

      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ThreeObject />
          </Suspense>
        </Canvas>
      </div>

      <Container size="default" className="relative z-10">
        <div ref={textRef} className="max-w-lg">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block text-caption text-accent font-mono font-medium mb-4 tracking-wider uppercase"
          >
            Experience
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-display font-semibold text-text-primary mb-6"
          >
            Intelligence{' '}
            <span className="gradient-text-accent">in motion</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-body-lg text-text-secondary mb-8 max-w-md"
          >
            Every data point finds its place. Watch as chaos becomes structure,
            and structure becomes understanding.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <div>
              <p className="text-heading-lg font-semibold text-accent-hover">2,000</p>
              <p className="text-caption text-text-muted">active particles</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-heading-lg font-semibold text-text-primary">60fps</p>
              <p className="text-caption text-text-muted">render target</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-heading-lg font-semibold text-text-primary">GPU</p>
              <p className="text-caption text-text-muted">accelerated</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
