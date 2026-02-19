'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChartCard from './ChartCard';
import TableCard from './TableCard';
import { DASHBOARD_TABS, CHART_DATA, STATS } from '@/lib/constants';

const TAB_TITLES: Record<number, { heading: string; subheading: string }> = {
  0: { heading: 'Overview', subheading: 'Real-time intelligence dashboard' },
  1: { heading: 'Signals', subheading: 'Active signal monitoring' },
  2: { heading: 'Models', subheading: 'Model performance tracking' },
  3: { heading: 'Alerts', subheading: 'System alerts and notifications' },
};

const SIGNALS_DATA = [
  { id: 'SIG-007', source: 'Webhook', type: 'Spike', confidence: 0.91, status: 'active' as const, timestamp: '1 min ago' },
  { id: 'SIG-008', source: 'API Gateway', type: 'Anomaly', confidence: 0.88, status: 'active' as const, timestamp: '4 min ago' },
  { id: 'SIG-009', source: 'Event Stream', type: 'Pattern', confidence: 0.95, status: 'resolved' as const, timestamp: '9 min ago' },
];

const ALERTS_DATA = [
  { severity: 'critical', message: 'Latency spike detected on API Gateway', time: '3 min ago' },
  { severity: 'warning', message: 'Model drift threshold approaching for v2.4', time: '12 min ago' },
  { severity: 'info', message: 'New data source connected: Kafka cluster-03', time: '28 min ago' },
  { severity: 'warning', message: 'Ingestion rate below baseline for 15 minutes', time: '41 min ago' },
];

function OverviewTab() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
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
        <ChartCard title="Throughput" data={CHART_DATA.throughput} suffix="" />
        <ChartCard title="Model Accuracy" data={CHART_DATA.accuracy} suffix="%" color="#22c55e" />
      </div>

      <TableCard />
    </>
  );
}

function SignalsTab() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { label: 'Active Signals', value: '847', change: '+23 today' },
          { label: 'Resolved', value: '437', change: 'Last 24h' },
          { label: 'Avg. Confidence', value: '91.4%', change: '+1.2%' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-bg-primary border border-border rounded-xl p-4"
          >
            <p className="text-caption text-text-muted mb-1">{stat.label}</p>
            <p className="text-heading font-semibold text-text-primary">{stat.value}</p>
            <p className="text-caption font-medium mt-1 text-text-tertiary">{stat.change}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-bg-primary border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h4 className="text-body-sm text-text-primary font-medium">Recent Signal Activity</h4>
        </div>
        <div className="divide-y divide-border">
          {SIGNALS_DATA.map((signal, i) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-center justify-between px-5 py-3 hover:bg-surface/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${signal.status === 'active' ? 'bg-success' : 'bg-text-muted'}`} />
                <span className="text-body-sm text-text-primary font-mono">{signal.id}</span>
                <span className="text-body-sm text-text-secondary">{signal.source}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 text-caption font-medium rounded-md bg-surface text-text-secondary">
                  {signal.type}
                </span>
                <span className="text-caption text-text-muted">{signal.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

function ModelsTab() {
  const models = [
    { name: 'Anomaly Detector v3.2', status: 'active', accuracy: 99.7, requests: '12.4K/hr' },
    { name: 'Pattern Classifier v2.1', status: 'active', accuracy: 98.2, requests: '8.7K/hr' },
    { name: 'Drift Monitor v1.8', status: 'active', accuracy: 97.5, requests: '5.1K/hr' },
    { name: 'Sentiment Analyzer v4.0', status: 'training', accuracy: 96.1, requests: '—' },
  ];

  return (
    <div className="space-y-3">
      {models.map((model, i) => (
        <motion.div
          key={model.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="bg-bg-primary border border-border rounded-xl p-5 hover:border-border-strong transition-colors duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h4 className="text-body-sm font-medium text-text-primary">{model.name}</h4>
              <span className={`px-2 py-0.5 text-caption rounded-md font-medium ${
                model.status === 'active'
                  ? 'bg-success-muted text-success'
                  : 'bg-warning-muted text-warning'
              }`}>
                {model.status}
              </span>
            </div>
            <span className="text-caption text-text-muted font-mono">{model.requests}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${model.accuracy}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <span className="text-caption text-text-secondary font-mono w-14 text-right">{model.accuracy}%</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AlertsTab() {
  const severityStyles = {
    critical: 'bg-red-500/15 text-red-400 border-red-500/20',
    warning: 'bg-warning-muted text-warning border-warning/20',
    info: 'bg-accent-muted text-accent-hover border-accent/20',
  };

  return (
    <div className="space-y-3">
      {ALERTS_DATA.map((alert, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className={`border rounded-xl p-4 ${severityStyles[alert.severity as keyof typeof severityStyles]}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-caption font-mono font-medium uppercase tracking-wider">
                {alert.severity}
              </span>
              <p className="text-body-sm">{alert.message}</p>
            </div>
            <span className="text-caption opacity-70 shrink-0 ml-4">{alert.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const TAB_CONTENT = [OverviewTab, SignalsTab, ModelsTab, AlertsTab];

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState(0);
  const TabComponent = TAB_CONTENT[activeTab];

  return (
    <div className="flex-1 bg-bg-secondary overflow-y-auto">
      <div className="px-6 py-4 border-b border-border bg-bg-primary/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-sm font-semibold text-text-primary">
              {TAB_TITLES[activeTab].heading}
            </h2>
            <p className="text-caption text-text-muted mt-0.5">
              {TAB_TITLES[activeTab].subheading}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success-muted text-success text-caption font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4">
        <div className="flex gap-0.5 bg-bg-primary border border-border rounded-lg p-1 w-fit" role="tablist">
          {DASHBOARD_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              role="tab"
              aria-selected={activeTab === i}
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
          role="tabpanel"
          className="px-6 py-6 space-y-6"
        >
          <TabComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
