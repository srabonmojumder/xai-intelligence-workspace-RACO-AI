'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/80 z-0">
            <div className="text-center px-6">
              <div className="h-12 w-12 rounded-xl bg-surface flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-text-tertiary"
                >
                  <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <p className="text-body-sm text-text-secondary mb-1">
                3D rendering unavailable
              </p>
              <p className="text-caption text-text-muted">
                Your browser may not support WebGL
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
