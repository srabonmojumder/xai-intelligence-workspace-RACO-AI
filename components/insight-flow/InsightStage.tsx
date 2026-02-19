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

function StageGeometry({ icon, isInView }: { icon: string; isInView: boolean }) {
  const common = 'transition-all duration-1000';

  if (icon === 'ingest') {
    return (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={common}>
        {/* Scattered data points converging into streams */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const outerX = 60 + Math.cos(angle) * 48;
          const outerY = 60 + Math.sin(angle) * 48;
          return (
            <motion.line
              key={i}
              x1={outerX}
              y1={outerY}
              x2={60}
              y2={60}
              stroke="#6366f1"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
            />
          );
        })}
        {/* Converging dots */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const startX = 60 + Math.cos(angle) * 48;
          const startY = 60 + Math.sin(angle) * 48;
          const endX = 60 + Math.cos(angle) * 12;
          const endY = 60 + Math.sin(angle) * 12;
          return (
            <motion.circle
              key={`dot-${i}`}
              r="2.5"
              fill="#818cf8"
              initial={{ cx: startX, cy: startY, opacity: 0 }}
              animate={isInView
                ? { cx: endX, cy: endY, opacity: 1 }
                : { cx: startX, cy: startY, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          );
        })}
        {/* Center pulse */}
        <motion.circle
          cx="60" cy="60" r="6"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.circle
          cx="60" cy="60" r="3"
          fill="#6366f1"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 1 }}
        />
      </svg>
    );
  }

  if (icon === 'analyze') {
    return (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={common}>
        {/* Neural network nodes */}
        {[
          { x: 20, y: 40 }, { x: 20, y: 80 },
          { x: 60, y: 25 }, { x: 60, y: 60 }, { x: 60, y: 95 },
          { x: 100, y: 40 }, { x: 100, y: 80 },
        ].map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.x} cy={node.y} r="4"
            fill="#818cf8"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          />
        ))}
        {/* Connections between layers */}
        {[
          [20, 40, 60, 25], [20, 40, 60, 60], [20, 40, 60, 95],
          [20, 80, 60, 25], [20, 80, 60, 60], [20, 80, 60, 95],
          [60, 25, 100, 40], [60, 25, 100, 80],
          [60, 60, 100, 40], [60, 60, 100, 80],
          [60, 95, 100, 40], [60, 95, 100, 80],
        ].map((line, i) => (
          <motion.line
            key={`conn-${i}`}
            x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
            stroke="#6366f1"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.04 }}
          />
        ))}
        {/* Scanning line */}
        <motion.line
          x1="10" y1="60" x2="110" y2="60"
          stroke="#818cf8"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 0.4, 0] } : { opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </svg>
    );
  }

  // insight
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={common}>
      {/* Diamond / crystal structure */}
      <motion.polygon
        points="60,15 95,60 60,105 25,60"
        stroke="#6366f1"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      {/* Inner diamond */}
      <motion.polygon
        points="60,35 78,60 60,85 42,60"
        stroke="#818cf8"
        strokeWidth="1"
        fill="rgba(99, 102, 241, 0.08)"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ transformOrigin: '60px 60px' }}
      />
      {/* Cross lines */}
      <motion.line
        x1="60" y1="15" x2="60" y2="105"
        stroke="#6366f1" strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.line
        x1="25" y1="60" x2="95" y2="60"
        stroke="#6366f1" strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      {/* Corner accent dots */}
      {[
        { x: 60, y: 15 }, { x: 95, y: 60 }, { x: 60, y: 105 }, { x: 25, y: 60 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r="3"
          fill="#818cf8"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.7 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
        />
      ))}
      {/* Center glow */}
      <motion.circle
        cx="60" cy="60" r="5"
        fill="#6366f1"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: [0, 1.5, 1], opacity: [0, 0.8, 0.6] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
    </svg>
  );
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
        {/* Timeline connector */}
        <div className="hidden md:flex flex-col items-center gap-3 pt-2">
          <div className={`h-3 w-3 rounded-full transition-all duration-700 ${isInView ? 'bg-accent glow-accent scale-125' : 'bg-surface'}`} />
          {index < 2 && (
            <div className="relative w-px h-32">
              <div className={`absolute inset-0 transition-all duration-1000 ${isInView ? 'bg-gradient-to-b from-accent/40 to-transparent' : 'bg-border'}`} />
              {/* Animated pulse traveling down the line */}
              {isInView && (
                <motion.div
                  className="absolute w-1 h-4 -left-px rounded-full bg-accent/60"
                  initial={{ top: 0, opacity: 0 }}
                  animate={{ top: '100%', opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                />
              )}
            </div>
          )}
        </div>

        {/* Card with geometry visual */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className={`flex-1 glass rounded-2xl p-8 transition-all duration-500 overflow-hidden relative ${isInView ? 'border-accent/20' : ''}`}
        >
          {/* Geometric mask reveal overlay */}
          <motion.div
            className="absolute inset-0 bg-accent/[0.02] pointer-events-none"
            initial={{ clipPath: 'circle(0% at 0% 0%)' }}
            animate={isInView
              ? { clipPath: 'circle(150% at 0% 0%)' }
              : { clipPath: 'circle(0% at 0% 0%)' }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <div className="flex items-start justify-between gap-6 relative">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <StageIcon icon={icon} isInView={isInView} />
                <div>
                  <span className="text-caption text-accent font-mono font-medium">{number}</span>
                  <h3 className="text-heading-sm font-semibold text-text-primary">{title}</h3>
                </div>
              </div>

              <p className="text-body text-text-secondary mb-8 max-w-md">{description}</p>

              <div className="flex items-baseline gap-3">
                <motion.span
                  className={`text-heading-lg font-semibold transition-colors duration-700 ${isInView ? 'text-accent-hover' : 'text-text-tertiary'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {metric}
                </motion.span>
                <span className="text-body-sm text-text-tertiary">{metricLabel}</span>
              </div>

              {/* Animated geometric line */}
              <div className="mt-6 h-1 rounded-full bg-surface overflow-hidden relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
                />
              </div>
            </div>

            {/* Geometry visual */}
            <div className="hidden lg:flex items-center justify-center shrink-0 opacity-80">
              <StageGeometry icon={icon} isInView={isInView} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
