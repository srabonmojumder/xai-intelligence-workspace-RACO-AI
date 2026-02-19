'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChartCard from './ChartCard';
import TableCard from './TableCard';
import { DASHBOARD_TABS, CHART_DATA, STATS } from '@/lib/constants';

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex-1 bg-bg-secondary overflow-y-auto">
      <div className="px-6 py-4 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-sm font-semibold text-text-primary">Overview</h2>
            <p className="text-caption text-text-muted mt-0.5">Real-time intelligence dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success-muted text-success text-caption font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4">
        <div className="flex gap-0.5 bg-bg-primary border border-border rounded-lg p-1 w-fit">
          {DASHBOARD_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 py-1.5 text-body-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === i
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {activeTab === i && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-surface rounded-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="px-6 py-6 space-y-6"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-bg-primary border border-border rounded-xl p-4 hover:border-border-strong transition-colors duration-200"
              >
                <p className="text-caption text-text-muted mb-1">{stat.label}</p>
                <p className="text-heading font-semibold text-text-primary">{stat.value}</p>
                <p className={`text-caption font-medium mt-1 ${stat.positive ? 'text-success' : 'text-warning'}`}>
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <ChartCard
              title="Throughput"
              data={CHART_DATA.throughput}
              suffix=""
            />
            <ChartCard
              title="Model Accuracy"
              data={CHART_DATA.accuracy}
              suffix="%"
              color="#22c55e"
            />
          </div>

          <TableCard />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
