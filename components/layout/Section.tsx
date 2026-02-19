'use client';

import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative py-24 md:py-32 lg:py-40', className)}
    >
      {children}
    </section>
  );
}
