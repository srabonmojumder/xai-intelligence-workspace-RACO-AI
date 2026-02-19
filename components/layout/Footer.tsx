'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import { fadeInUp } from '@/lib/animations';

const FOOTER_LINKS = [
  { label: 'Platform', href: '#insight-flow' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Experience', href: '#signature' },
] as const;

export default function Footer() {
  return (
    <footer className="relative py-20 bg-bg-primary border-t border-border" role="contentinfo">
      <Container size="default">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white text-body font-bold" aria-hidden="true">X</span>
            </div>
            <span className="text-heading-sm font-semibold text-text-primary">Xai</span>
          </div>
          <p className="text-body text-text-secondary mb-8 max-w-md mx-auto">
            Intelligence infrastructure for the next generation of decision-makers.
          </p>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body-sm text-text-tertiary hover:text-text-secondary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="h-px bg-border mb-8" />
          <p className="text-caption text-text-muted">
            &copy; {new Date().getFullYear()} Xai Intelligence. All rights reserved.
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}
