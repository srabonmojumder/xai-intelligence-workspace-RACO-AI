'use client';

import { motion } from 'framer-motion';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import Container from './Container';

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <Container size="wide">
        <nav className="flex items-center justify-between glass rounded-xl px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white text-body-sm font-semibold">X</span>
            </div>
            <span className="text-text-primary font-semibold text-body">
              {SITE.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-text-secondary hover:text-text-primary text-body-sm transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button className="px-4 py-2 text-body-sm font-medium text-text-primary bg-surface hover:bg-surface-hover rounded-lg transition-colors duration-200 border border-border">
            Get Started
          </button>
        </nav>
      </Container>
    </motion.header>
  );
}
