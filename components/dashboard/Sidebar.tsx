'use client';

import { motion } from 'framer-motion';
import { DASHBOARD_SIDEBAR_ITEMS } from '@/lib/constants';

const sidebarIcons: Record<string, React.ReactNode> = {
  grid: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="11" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 15H3V3" />
      <path d="M3 12l4-4 3 3 5-5" />
    </svg>
  ),
  signal: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 9h2l2-5 3 10 3-7 2 4h4" />
    </svg>
  ),
  model: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <path d="M9 1v3M9 14v3M1 9h3M14 9h3" />
    </svg>
  ),
  pipeline: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h12M3 9h12M3 13h12" />
      <circle cx="6" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="2.5" />
      <path d="M9 1.5v2M9 14.5v2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M1.5 9h2M14.5 9h2M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" />
    </svg>
  ),
};

export default function Sidebar() {
  return (
    <div className="w-56 bg-bg-primary border-r border-border flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-accent flex items-center justify-center">
            <span className="text-white text-caption font-bold">X</span>
          </div>
          <span className="text-body-sm font-semibold text-text-primary">Xai Workspace</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {DASHBOARD_SIDEBAR_ITEMS.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-body-sm transition-colors duration-150 ${
              item.active
                ? 'bg-accent/10 text-accent-hover font-medium'
                : 'text-text-tertiary hover:text-text-secondary hover:bg-surface/50'
            }`}
          >
            <span className={item.active ? 'text-accent-hover' : 'text-text-muted'}>
              {sidebarIcons[item.icon]}
            </span>
            {item.label}
          </motion.button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3">
          <div className="h-7 w-7 rounded-full bg-surface flex items-center justify-center">
            <span className="text-caption text-text-secondary font-medium">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-caption text-text-primary font-medium truncate">Analyst</p>
            <p className="text-caption text-text-muted truncate">admin@xai.dev</p>
          </div>
        </div>
      </div>
    </div>
  );
}
