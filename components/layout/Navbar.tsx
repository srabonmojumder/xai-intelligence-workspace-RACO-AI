'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import Container from './Container';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
      role="banner"
    >
      <Container size="wide">
        <nav
          className="flex items-center justify-between glass rounded-xl px-6 py-3"
          role="navigation"
          aria-label="Main navigation"
        >
          <a href="#" className="flex items-center gap-2" aria-label={`${SITE.name} — home`}>
            <div className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white text-body-sm font-semibold" aria-hidden="true">X</span>
            </div>
            <span className="text-text-primary font-semibold text-body">
              {SITE.name}
            </span>
          </a>

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

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex px-4 py-2 text-body-sm font-medium text-text-primary bg-surface hover:bg-surface-hover rounded-lg transition-colors duration-200 border border-border">
              Get Started
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-lg hover:bg-surface/50 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block w-4 h-px bg-text-primary mb-1.5"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-4 h-px bg-text-primary mb-1.5"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="block w-4 h-px bg-text-primary"
              />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden mt-2 glass rounded-xl overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-text-secondary hover:text-text-primary hover:bg-surface/50 text-body-sm px-4 py-3 rounded-lg transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="h-px bg-border my-2" />
                <button className="sm:hidden px-4 py-3 text-body-sm font-medium text-text-primary bg-surface hover:bg-surface-hover rounded-lg transition-colors duration-200 border border-border">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}
