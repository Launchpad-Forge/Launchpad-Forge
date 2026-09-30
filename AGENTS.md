<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Launchpad Forge - Comprehensive Agent Instructions

Welcome to the **Launchpad Forge** repository. This is a premium, high-performance web application utilizing modern 3D and animation libraries. When generating code, writing components, or modifying architecture, you must adhere strictly to these detailed guidelines.

---

## 1. Core Architecture & Framework

- **Next.js 16 (App Router)** & **React 19**: 
  - Strictly follow the Next.js App Router directory structure (`src/app/`).
  - **Server Components by Default**: All components must be Server Components unless they require state, hooks (like `useState`, `useEffect`), or browser APIs.
  - **Client Components**: Add the `"use client"` directive at the top of the file *only* when utilizing Three.js, GSAP, Framer Motion, Lenis, or interactive React hooks. Keep the client boundary as low in the component tree as possible.

---

## 2. Global Design System & Styling (Tailwind CSS v4)

Do NOT hardcode hex colors or custom pixel sizes. You must utilize the custom design system defined in `src/app/globals.css`.

### Custom CSS Variables
Use the following CSS variables for colors to support automatic light/dark modes:
- **Core**: `--background`, `--foreground`, `--accent` (`#e8652b`), `--accent-dim`, `--accent-glow`.
- **Surfaces**: `--surface`, `--surface-elevated`, `--surface-glass`, `--surface-glass-elevated`.
- **Text**: `--text-primary`, `--text-secondary`, `--text-muted`.
- **Borders**: `--border-subtle`, `--border-accent`.

### Custom Utility Classes
Always prefer these predefined utility classes over recreating complex styles:
- **Typography**: `.heading-xl`, `.heading-lg`, `.heading-md`, `.heading-sm`, `.body-lg`, `.body-md`, `.label`.
- **Effects**: `.gradient-text`, `.gradient-text-accent`, `.glass`, `.glass-elevated`, `.noise`.
- **Layout**: `.container-forge` (max-width container), `.section-padding` (standardized section spacing).
- **Backgrounds**: `.grid-overlay` (subtle grid background).

### Icons
Always use the `lucide-react` library for all iconography.

---

## 3. Content Management (`constants.ts`)

**NEVER hardcode marketing copy or static data directly into React components.** 
All static application data is centralized in `src/lib/constants.ts`. If you are asked to update text, links, or arrays of items, edit `constants.ts` directly.

The following constants are actively managed:
- `SERVICES`: The primary service offerings and their details.
- `NAV_LINKS`: Website navigation routes.
- `TECH_ECOSYSTEM` & `TECHNOLOGIES`: Tech stack representations.
- `SYSTEM_BUILDER_COMPONENTS`: Interactive builder categories.
- `SCROLL_STAGES` & `IDEA_TO_IMPACT_STAGES`: Sequential text blocks used in scroll-driven animations.

---

## 4. Animation & 3D Ecosystem

Because this is a high-end, premium aesthetic site, animations and 3D play a heavy role. Ensure you are using the correct library for the job.

- **WebGL / 3D Canvas (`three`, `@react-three/fiber`, `@react-three/drei`)**:
  - Used for large-scale immersive environments (e.g., energy cores, tech constellations).
  - All 3D specific components MUST be isolated in `src/components/three/`.
  - Be mindful of performance; dispose of geometries/materials and avoid heavy operations inside `useFrame`.
- **Scroll-Driven Animations (`gsap`, `@gsap/react`)**:
  - Used for pinning, scrubbable timelines, and complex multi-element sequences triggered by scroll position.
- **Micro-Interactions (`framer-motion`)**:
  - Used for UI state changes, modal popups, button hovers, and magnetic cursors.
- **Smooth Scrolling (`lenis`)**:
  - Lenis provides physics-based smooth scrolling on the root HTML. Ensure that GSAP `ScrollTrigger` integrates properly with Lenis (usually via `ScrollTrigger.refresh()`).

---

## 5. Project Directory Structure

When creating new files, strictly adhere to this organizational model:

- `src/app/` - Layouts, pages, and `globals.css`.
- `src/components/layout/` - Global structural items (e.g., Navigation, Footer, SmoothScroll provider).
- `src/components/sections/` - Major thematic blocks of a page (e.g., `Hero.tsx`, `About.tsx`, `Services.tsx`).
- `src/components/three/` - Anything related to the `Canvas` and WebGL.
- `src/components/ui/` - Highly reusable atomic elements (e.g., `MagneticButton.tsx`, `CustomCursor.tsx`, `Marquee.tsx`).
- `src/hooks/` - Custom React hooks (e.g., `useMousePosition`, `useMediaQuery`).
- `src/lib/` - Utilities and the centralized `constants.ts` file.

---

## 6. Performance & Quality Standards

- Maintain a high-end, editorial feel. Respect the whitespace defined by `--section-padding` and `.container-forge`.
- Prevent unnecessary React re-renders, especially when interacting with GSAP or Three.js.
- Ensure the site is perfectly responsive on mobile devices; hide heavy 3D scenes on mobile if performance becomes a severe bottleneck.
