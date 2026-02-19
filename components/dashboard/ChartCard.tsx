'use client';

import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  data: readonly DataPoint[];
  suffix?: string;
  color?: string;
}

export default function ChartCard({ title, data, suffix = '', color = '#6366f1' }: ChartCardProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const latestValue = data[data.length - 1].value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -1 }}
      className="bg-bg-primary border border-border rounded-xl p-5 hover:border-border-strong transition-colors duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-body-sm text-text-secondary font-medium">{title}</h4>
        <span className="text-body-sm font-semibold text-text-primary">
          {latestValue.toLocaleString()}{suffix}
        </span>
      </div>

      <div className="flex items-end gap-1 h-24">
        {data.map((point, i) => {
          const height = (point.value / maxValue) * 100;
          return (
            <motion.div
              key={point.label}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="w-full rounded-sm"
                style={{
                  backgroundColor: i === data.length - 1 ? color : `${color}33`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-1 mt-2">
        {data.map((point) => (
          <span key={point.label} className="flex-1 text-center text-caption text-text-muted">
            {point.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
