'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface InsightStageProps {
  number: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: string;
  index: number;
}

function StageIcon({ icon, isInView }: { icon: string; isInView: boolean }) {
  const baseClass = 'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700';

  const iconSvg = {
    ingest: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12M8 11l4 4 4-4" />
        <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
      </svg>
    ),
    analyze: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    insight: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4" />
        <path d="M12 2a7 7 0 015 11.9V17H7v-3.1A7 7 0 0112 2z" />
      </svg>
    ),
    automate: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 10v2l1.5 1.5" />
      </svg>
    ),
  };

  return (
    <div className={`${baseClass} ${isInView ? 'bg-accent/20 text-accent-hover' : 'bg-surface text-text-tertiary'}`}>
      {iconSvg[icon as keyof typeof iconSvg]}
    </div>
  );
}

export default function InsightStage({
  number,
  title,
  description,
  metric,
  metricLabel,
  icon,
  index,
}: InsightStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-80px' }}
      className="group relative"
    >
      <div className="flex items-start gap-8">
        <div className="hidden md:flex flex-col items-center gap-3 pt-2">
          <div className={`h-3 w-3 rounded-full transition-all duration-700 ${isInView ? 'bg-accent glow-accent scale-125' : 'bg-surface'}`} />
          {index < 3 && (
            <div className={`w-px h-32 transition-all duration-1000 ${isInView ? 'bg-gradient-to-b from-accent/40 to-transparent' : 'bg-border'}`} />
          )}
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className={`flex-1 glass rounded-2xl p-8 transition-all duration-500 ${isInView ? 'border-accent/20' : ''}`}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <StageIcon icon={icon} isInView={isInView} />
              <div>
                <span className="text-caption text-accent font-mono font-medium">{number}</span>
                <h3 className="text-heading-sm font-semibold text-text-primary">{title}</h3>
              </div>
            </div>
          </div>

          <p className="text-body text-text-secondary mb-8 max-w-md">{description}</p>

          <div className="flex items-baseline gap-3">
            <span className={`text-heading-lg font-semibold transition-colors duration-700 ${isInView ? 'text-accent-hover' : 'text-text-tertiary'}`}>
              {metric}
            </span>
            <span className="text-body-sm text-text-tertiary">{metricLabel}</span>
          </div>

          <div className="mt-6 h-1 rounded-full bg-surface overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={isInView ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
