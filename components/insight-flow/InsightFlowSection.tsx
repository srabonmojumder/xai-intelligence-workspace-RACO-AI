'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import InsightStage from './InsightStage';
import { INSIGHT_STAGES } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InsightFlowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="insight-flow" className="bg-bg-secondary relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div ref={sectionRef}>
        <Container size="default">
          <div ref={headingRef} className="text-center mb-20">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-block text-caption text-accent font-mono font-medium mb-4 tracking-wider uppercase"
            >
              How It Works
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-display font-semibold text-text-primary mb-4"
            >
              Data to decisions,{' '}
              <span className="text-text-secondary">automated</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-body-lg text-text-tertiary max-w-lg mx-auto"
            >
              Three stages. One continuous pipeline.
              From raw signal to actionable insight.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-50px' }}
            className="space-y-12 max-w-2xl mx-auto"
          >
            {INSIGHT_STAGES.map((stage, index) => (
              <InsightStage
                key={stage.id}
                number={stage.number}
                title={stage.title}
                description={stage.description}
                metric={stage.metric}
                metricLabel={stage.metricLabel}
                icon={stage.icon}
                index={index}
              />
            ))}
          </motion.div>
        </Container>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    </Section>
  );
}
