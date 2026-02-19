# Xai — Intelligence Workspace

A production-quality interactive product experience demonstrating how raw data transforms into intelligence and actionable insights. Built with Next.js, React Three Fiber, Framer Motion, and GSAP.

## Overview

This is not a landing page — it's a product-quality interactive interface featuring:

- **3D particle visualization** that transforms from scattered data points into structured grids
- **Scroll-driven animation pipeline** showing data ingestion, AI analysis, and insight generation
- **Realistic dashboard UI** with charts, tables, tabs, and live-feel interactions
- **Signature 3D interaction** — a morphing particle sphere responding to cursor and scroll

## Technical Architecture

```
/app                    → Next.js App Router entry points
  layout.tsx            → Root layout with metadata and global styles
  page.tsx              → Main page composing all sections (client-side)
  globals.css           → Design tokens, utility classes, glass effects

/components
  /hero                 → Hero section with R3F particle grid
    HeroSection.tsx     → Layout, parallax, content overlay
    HeroScene.tsx       → Three.js instanced mesh particles + connection lines

  /insight-flow         → Scroll-animated pipeline section
    InsightFlowSection.tsx → GSAP ScrollTrigger orchestration
    InsightStage.tsx    → Individual stage card with progress animation

  /dashboard            → Product UI preview
    DashboardPreview.tsx → Framed window with GSAP entrance
    Sidebar.tsx         → Navigation sidebar with active states
    DashboardContent.tsx → Tabs, stats grid, content switching
    ChartCard.tsx       → Animated bar chart component
    TableCard.tsx       → Data table with row animations

  /signature            → Premium 3D interaction
    SignatureInteraction.tsx → Section layout with stats
    ThreeObject.tsx     → Fibonacci sphere, ambient particles, morph logic

  /layout               → Shared layout primitives
    Container.tsx       → Width-constrained wrapper
    Section.tsx         → Consistent section spacing
    Navbar.tsx          → Fixed glass navigation
    Footer.tsx          → Site footer

/lib
  animations.ts         → Framer Motion variants and GSAP defaults
  constants.ts          → All mock data, nav items, dashboard config
  utils.ts              → cn(), lerp(), mapRange(), formatNumber()
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Animation | Framer Motion |
| Scroll Animation | GSAP + ScrollTrigger |
| 3D Graphics | Three.js via @react-three/fiber |
| 3D Utilities | @react-three/drei |
| Utilities | clsx |

## Animation Approach

**Framer Motion** handles all UI-level animations:
- Component entrance/exit transitions
- Hover and tap micro-interactions
- Layout animations (tab switching with `layoutId`)
- Scroll-linked parallax via `useScroll` + `useTransform`

**GSAP ScrollTrigger** handles scroll-driven orchestration:
- Section heading reveals
- Dashboard frame entrance with scale + opacity
- Signature section text reveal

**React Three Fiber** handles all 3D rendering:
- Hero: 800 instanced particles lerping from scattered → grid positions with mouse influence
- Hero: 200 connection lines with wave motion
- Signature: 2,000 Fibonacci-distributed particles forming a sphere
- Signature: Mouse-reactive displacement and scroll-based morphing
- Signature: 200 ambient floating particles

All animation logic is separated into `/lib/animations.ts` for reuse. Heavy 3D components use `next/dynamic` with `ssr: false` to avoid hydration issues.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploy

This project is configured for deployment on Vercel:

```bash
npx vercel
```

Or connect the repository to Vercel for automatic deployments.

## Design System

- **Colors**: Dark theme with zinc-based neutrals and indigo accent (#6366f1)
- **Typography**: Inter (UI) + JetBrains Mono (data/code), 9-step type scale
- **Spacing**: 4px base grid, extended with 4.5rem–8.5rem utilities
- **Effects**: Glass morphism, radial glows, dot grids, noise overlays
- **Motion**: Custom easing curves, spring physics, staggered reveals
