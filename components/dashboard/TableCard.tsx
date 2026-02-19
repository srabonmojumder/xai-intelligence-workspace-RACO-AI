'use client';

import { motion } from 'framer-motion';
import { TABLE_DATA } from '@/lib/constants';

export default function TableCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-bg-primary border border-border rounded-xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h4 className="text-body-sm text-text-primary font-medium">Recent Signals</h4>
        <span className="text-caption text-text-muted">
          {TABLE_DATA.filter((d) => d.status === 'active').length} active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-caption text-text-muted font-medium px-5 py-3">ID</th>
              <th className="text-left text-caption text-text-muted font-medium px-5 py-3">Source</th>
              <th className="text-left text-caption text-text-muted font-medium px-5 py-3">Type</th>
              <th className="text-left text-caption text-text-muted font-medium px-5 py-3">Confidence</th>
              <th className="text-left text-caption text-text-muted font-medium px-5 py-3">Status</th>
              <th className="text-left text-caption text-text-muted font-medium px-5 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-border-subtle hover:bg-surface/30 transition-colors duration-150"
              >
                <td className="px-5 py-3 text-body-sm text-text-primary font-mono">{row.id}</td>
                <td className="px-5 py-3 text-body-sm text-text-secondary">{row.source}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex px-2 py-0.5 text-caption font-medium rounded-md bg-surface text-text-secondary">
                    {row.type}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${row.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-caption text-text-tertiary font-mono">
                      {(row.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-caption font-medium ${
                      row.status === 'active' ? 'text-success' : 'text-text-muted'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        row.status === 'active' ? 'bg-success' : 'bg-text-muted'
                      }`}
                    />
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-caption text-text-muted">{row.timestamp}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
