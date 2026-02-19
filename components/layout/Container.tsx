'use client';

import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export default function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6',
        {
          'max-w-5xl': size === 'narrow',
          'max-w-6xl': size === 'default',
          'max-w-7xl': size === 'wide',
          'max-w-full': size === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
