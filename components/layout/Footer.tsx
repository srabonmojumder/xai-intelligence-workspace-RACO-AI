'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import { fadeInUp } from '@/lib/animations';

export default function Footer() {
  return (
    <footer className="relative py-20 bg-bg-primary border-t border-border">
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
              <span className="text-white text-body font-bold">X</span>
            </div>
            <span className="text-heading-sm font-semibold text-text-primary">Xai</span>
          </div>
          <p className="text-body text-text-secondary mb-8 max-w-md mx-auto">
            Intelligence infrastructure for the next generation of decision-makers.
          </p>
          <div className="flex items-center justify-center gap-8 mb-10">
            {['Platform', 'Documentation', 'Pricing', 'Company'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-body-sm text-text-tertiary hover:text-text-secondary transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="h-px bg-border mb-8" />
          <p className="text-caption text-text-muted">
            &copy; 2026 Xai Intelligence. All rights reserved.
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}
