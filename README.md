# Launchpad Forge

Build. Automate. Grow. We build the digital infrastructure behind ambitious businesses — from software and AI to automation and cloud systems.

<img src="public/logo.png" alt="Launchpad Forge Preview" style="background-color: white; padding: 20px; border-radius: 10px;" /> <!-- Update this path if you add a full banner image later -->

This is a premium, high-performance website built for **Launchpad Forge**. It heavily utilizes WebGL (Three.js), scroll-driven GSAP animations, and Next.js 16 to create a deeply interactive, editorial-style experience that runs beautifully across all devices.

---

## 📖 About Launchpad Forge

**Launchpad Forge** is a modern development studio and technology partner for ambitious businesses. We specialize in building scalable digital infrastructure from the ground up. 

Our core areas of expertise include:
- **Build & Design**: Custom Web & Mobile Applications, E-Commerce, SaaS Platforms, and UI/UX Design.
- **AI & Intelligence**: Custom AI Agents, RAG pipelines, Document AI, and custom LLM integrations.
- **Automation & APIs**: Workflow automation (n8n, Zapier), CRM integrations, and custom API development.
- **Data & Cloud**: Cloud architecture (AWS/Azure/GCP), CI/CD, and DevOps.
- **Strategy & Growth**: Cybersecurity audits, SEO, and dedicated technology retainers.

This repository houses the premium front-end application that showcases our services, portfolio, and technological capabilities to prospective clients.

---

## 🚀 Quick Start (Local Setup)

Follow these instructions to get the project running on your local machine.

### 1. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.17.0 or newer)
- **npm** (v9 or newer), **yarn**, **pnpm**, or **bun**
- **Git**

### 2. Installation

Clone the repository and install the required dependencies:

```bash
# Clone the repository
git clone <your-github-repo-url>
cd Launchpad-forge

# Install dependencies using npm (recommended for this project)
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory. If you are adding backend integrations (like email sending, analytics, or database connections), this is where your environment variables and API keys will reside. 

```bash
# .env.local example
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Add external integrations here as the project grows
# SENDGRID_API_KEY=your_api_key
# NEXT_PUBLIC_ANALYTICS_ID=your_id
```

### 4. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site in action. The page will auto-update as you edit the files thanks to Fast Refresh.

---

## 🛠️ Technology Stack & Architecture

This project is built using bleeding-edge web technologies, architected for performance, scale, and high-end aesthetics.

### 1. Core Framework: Next.js 16 & React 19
- **App Router Paradigm**: Utilizes `src/app/` for file-system based routing.
- **Server-First Approach**: All components default to Server Components for maximum performance, minimal bundle size, and superior SEO.
- **Strategic Client Boundaries**: The `"use client"` directive is pushed as far down the component tree as possible, used strictly for interactive elements (hooks, animations, WebGL).

### 2. Styling & UI: Tailwind CSS v4
- **Utility-First Design System**: Tailwind handles layout, typography, and spacing.
- **Dynamic CSS Variables**: Core theme colors are strictly managed via standard CSS variables in `globals.css`, allowing for instant, performant theming and dark/light mode toggling without React state overhead.
- **Custom Utilities**: Extends Tailwind with custom classes (`.glass`, `.gradient-text`, `.noise`) for complex aesthetic combinations.

### 3. Animation Ecosystem
- **GSAP (GreenSock)**: Drives complex, scroll-linked animations and scrubbable timelines. Paired with `@gsap/react` for seamless lifecycle management.
- **Framer Motion**: Handles micro-interactions, layout transitions, modal popups, and localized UI state changes (like magnetic buttons or hover effects).
- **Lenis**: Provides physics-based smooth scrolling at the root HTML level, ensuring animations trigger fluidly across all devices.

### 4. WebGL & 3D
- **Three.js & React Three Fiber (R3F)**: Powers all 3D scenes (Energy Core, Tech Constellation, Interactive Rings).
- **React Three Drei**: Provides essential helpers and abstractions for cameras, text, and environment rendering.

---

## 📂 Comprehensive Project Structure

Understanding the repository architecture is vital for maintaining and extending the site:

```
Launchpad-forge/
├── public/                 # Static assets (images, fonts, 3D models, favicons)
│
├── src/
│   ├── app/                # Next.js App Router (Routes & Layouts)
│   │   ├── globals.css     # Global styles and Tailwind design system variables
│   │   ├── layout.tsx      # Root HTML layout, Lenis provider, fonts, and metadata
│   │   └── page.tsx        # Main landing page (assembles section components)
│   │
│   ├── components/         # React Components
│   │   ├── layout/         # Structural components (Navigation, Footer, Mobile Menu)
│   │   ├── sections/       # Major thematic page sections (Hero, About, Services, FAQ)
│   │   ├── three/          # WebGL & 3D scenes (must contain "use client")
│   │   └── ui/             # Reusable UI primitives (Buttons, Cursors, Cards, Marquees)
│   │
│   ├── hooks/              # Custom React hooks (e.g., useMousePosition, useScroll)
│   │
│   └── lib/                # Utilities and Static Data
│       ├── constants.ts    # Centralized data (Nav, Services, Case Studies)
│       └── utils.ts        # Helper functions (e.g., cn for tailwind class merging)
```

---

## 🎨 Customization Guide

### Changing Colors and the Core Theme
All core colors are managed via CSS variables in `src/app/globals.css`. Do **not** hardcode hex values into Tailwind classes in your components.

To change the primary brand color, update the `--accent` variables:

```css
:root {
  --background: #f8f9fa;
  --foreground: #101116;
  
  /* Update these values to change your brand color */
  --accent: #e8652b;
  --accent-dim: rgba(232, 101, 43, 0.15);
  --accent-glow: rgba(232, 101, 43, 0.4);
}
```

### Managing Copy & Content
To maintain a clean component tree, **no marketing copy or static data is hardcoded into React components**. 

All text data is stored centrally in `src/lib/constants.ts`. If you need to update a service description, add a new tech stack item, or modify a navigation link, you edit this file:

```typescript
// Example from src/lib/constants.ts
export const SERVICES = [
  {
    id: "build",
    title: "BUILD & DESIGN",
    description: "Websites, web apps, e-commerce...",
  },
  // Add new services here
];
```

### Adding New Sections
1. Create a new component file in `src/components/sections/NewSection.tsx`.
2. Keep it a Server Component if it's just layout and text. Add `"use client"` only if it requires GSAP animations or interactivity.
3. Import and place the section inside `src/app/page.tsx`.

---

## ⚡ Performance Optimization Guidelines

Given the heavy use of WebGL and scroll animations, performance is a priority:
- **Client Boundaries**: Keep `"use client"` as low in the component tree as possible.
- **Dispose 3D Assets**: Ensure all Three.js geometries and materials are properly disposed of when unmounted.
- **ScrollTriggers**: Always refresh GSAP ScrollTriggers when layout shifts occur, and ensure Lenis is synced with GSAP ticker.
- **Image Optimization**: Use Next.js `next/image` for all standard 2D imagery to ensure automatic WebP conversion and lazy loading.

---

## 🏗️ Building for Production

When you are ready to deploy, run the production build command to optimize the application. This process compiles the application, runs static generation, and bundles the assets.

```bash
npm run build
```

This will compile the application into a `.next` folder. You can test the production build locally to ensure everything works exactly as it will on the server:

```bash
npm run start
```

---

## 🚢 Deployment & Hosting

The easiest and most optimized way to deploy this Next.js app is via the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import the project into Vercel.
3. Vercel will automatically detect Next.js, configure the build commands, and set up Edge caching.
4. Add any environment variables from your `.env.local` to the Vercel dashboard.
5. Click **Deploy**!

For more detailed deployment options (such as AWS Amplify, Docker, or traditional Node servers), check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
