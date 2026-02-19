# Xai — Intelligence Workspace

A production-quality interactive product experience demonstrating how raw data transforms into structured intelligence, actionable insight, and AI-driven automations. Built with Next.js 14, React Three Fiber, Framer Motion, and GSAP.

> **Core Narrative:** Raw Data → Structured Intelligence → Actionable Insight → AI Automations

---

## Project Overview

This is not a landing page — it is a **product-quality interactive UI** with intentional motion, designed for decision-makers. The experience visually walks the user through how Xai turns raw data into intelligence using animation, geometry, and motion.

### Key Features

- **3D particle visualization** — 800 instanced particles morph from scattered chaos into a structured grid, responding to cursor movement
- **Four-stage insight pipeline** — Scroll-animated flow showing Ingest → Analyze → Insight → Automate with progress bars and micro-interactions
- **Interactive dashboard preview** — A realistic product UI with tabbed navigation (Overview, Signals, Models, Alerts), animated charts, data tables, and state transitions
- **Signature 3D interaction** — 2,000-particle Fibonacci sphere with mouse-reactive displacement and scroll-based morphing to a cube grid
- **Mobile-responsive design** — Hamburger navigation, responsive dashboard, fluid typography

---

## Technical Approach

### Architecture

The project follows a clean component architecture with separation of concerns:

```
/app                    → Next.js App Router (layout, page, globals)
/components
  /hero                 → Hero section + Three.js particle grid scene
  /insight-flow         → Scroll-animated 4-stage pipeline
  /dashboard            → Product UI: sidebar, tabs, charts, table
  /signature            → 3D morphing sphere interaction
  /layout               → Shared: Navbar, Footer, Container, Section
  /ui                   → Shared: CanvasLoader, WebGLErrorBoundary
/lib
  animations.ts         → Framer Motion variants + GSAP defaults
  constants.ts          → All mock data and configuration
  utils.ts              → Utility functions (cn, lerp, mapRange, etc.)
```

### Animation Strategy

Three animation layers, each chosen for its strengths:

| Layer | Tool | Responsibility |
|-------|------|----------------|
| **UI transitions** | Framer Motion | Entrance/exit, hover, layout animations, parallax |
| **Scroll orchestration** | GSAP + ScrollTrigger | Section reveals, timeline control, scrub animations |
| **3D rendering** | React Three Fiber | Instanced mesh particles, mouse interactivity, morphing |

**Key decisions:**
- `InstancedMesh` used for all particle systems (800 + 2000 + 200 particles) — single draw call per system for 60fps rendering
- `next/dynamic` with `ssr: false` prevents hydration mismatches for WebGL components
- `next/font` (Inter + JetBrains Mono) replaces CSS `@import` for zero render-blocking font loads
- WebGL error boundaries gracefully handle unsupported browsers
- Suspense loading indicators appear while 3D scenes initialize

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4 |
| UI Animation | Framer Motion | 11.x |
| Scroll Animation | GSAP + ScrollTrigger | 3.12 |
| 3D Graphics | Three.js via @react-three/fiber | 0.170 / 8.17 |
| 3D Utilities | @react-three/drei | 9.117 |
| Utilities | clsx | 2.1 |

---

## Sections Breakdown

### 1. Hero — Data → Intelligence
- Full-screen with parallax scroll fade-out
- Centerpiece: **800 particles** lerping from random scatter → structured grid
- **200 connection lines** with wave motion between grid neighbors
- Mouse influence displaces particles in real-time
- Responsive headline scales from `heading-lg` → `display-lg`

### 2. Interactive Insight Flow
- Four stages matching the core narrative:
  1. **Ingest Data** — 2.4M events/sec
  2. **Analyze with AI** — <50ms inference latency
  3. **Generate Insight** — 99.7% accuracy
  4. **AI Automations** — 340+ automated actions/day
- Each card: animated progress bar, view-triggered glow, hover lift
- Vertical timeline with connection lines between stages
- GSAP ScrollTrigger for heading entrance

### 3. Intelligence Dashboard Preview
- Browser-frame chrome (red/yellow/green dots, URL bar)
- **Sidebar** with 6 navigation items and active state
- **Tabbed content** with 4 distinct views:
  - Overview: Stats grid + bar charts + signal table
  - Signals: Active signal feed with status indicators
  - Models: Model performance cards with accuracy bars
  - Alerts: Severity-coded alert cards (critical/warning/info)
- `layoutId` animated tab indicator
- `AnimatePresence` for smooth tab content transitions

### 4. Signature Interaction (WOW Moment)
- **2,000 Fibonacci-distributed particles** forming a sphere
- Mouse cursor creates a **repulsion force field** (distance-based)
- **Scroll-based morphing**: sphere → cube grid as user scrolls
- **200 ambient particles** floating with wrap-around movement
- Dual-point lighting for depth perception
- Stats: 2,000 particles / 60fps / GPU accelerated

---

## Design System

| Token | Value |
|-------|-------|
| **Background** | `#09090b` (primary), `#111113` (secondary), `#18181b` (tertiary) |
| **Accent** | `#6366f1` (indigo) with hover, muted, and glow variants |
| **Typography** | Inter (UI), JetBrains Mono (data/code) |
| **Type Scale** | 9 steps: `caption` (12px) → `display-lg` (72px) |
| **Spacing** | 4px base grid, extended 4.5rem–8.5rem utilities |
| **Effects** | Glass morphism (blur 20–40px), radial glows, dot grids, noise overlays |
| **Motion** | Custom cubic-bezier easing, spring physics, staggered reveals |

---

## Running Locally

### Prerequisites
- Node.js 18+ and npm

### Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Deployment

Configured for Vercel deployment:

```bash
npx vercel
```

Or connect the GitHub repository to Vercel for automatic deployments on push.

---

## Performance and Accessibility

- **Font optimization**: `next/font` with `display: swap` — no render-blocking requests
- **3D performance**: `InstancedMesh` for single-draw-call particle systems
- **Code splitting**: Dynamic imports with `ssr: false` for Three.js components
- **Error handling**: WebGL error boundary with graceful fallback
- **Loading states**: Animated spinner while 3D scenes initialize
- **Accessibility**: Skip-to-content link, ARIA labels, semantic landmarks, keyboard navigation
- **Responsive**: Mobile hamburger menu, fluid typography, adaptive dashboard layout
- **Scroll behavior**: Smooth scrolling with `scroll-padding-top` offset for fixed navbar
