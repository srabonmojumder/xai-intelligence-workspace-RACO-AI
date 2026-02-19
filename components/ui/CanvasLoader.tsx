'use client';

import { motion } from 'framer-motion';

export default function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-10 h-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-accent/30 border-t-accent"
          />
        </div>
        <span className="text-caption text-text-muted font-mono">Loading scene</span>
      </motion.div>
    </div>
  );
}
