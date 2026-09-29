# Launchpad Forge

Build. Automate. Grow. We build the digital infrastructure behind ambitious businesses — from software and AI to automation and cloud systems.

![Launchpad Forge Preview](public/logo.png) <!-- Update this path if you add a full banner image later -->

This is a premium, high-performance website built for **Launchpad Forge**. It heavily utilizes WebGL (Three.js), scroll-driven GSAP animations, and Next.js 16 to create a deeply interactive, editorial-style experience that runs beautifully across all devices.

---

## 🚀 Quick Start (Local Setup)

Follow these instructions to get the project running on your local machine.

### 1. Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.17.0 or newer)
- **npm** (v9 or newer), **yarn**, **pnpm**, or **bun**
- **Git**

### 2. Installation

Clone the repository and install the dependencies:

```bash
# Clone the repository (if you haven't already)
git clone <your-github-repo-url>
cd Launchpad-forge

# Install dependencies using npm (recommended for this project)
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory. If you are adding backend integrations (like email sending for the contact form), this is where your API keys will go. 

```bash
# .env.local example
# Add your API keys here if needed in the future
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site in action. The page will auto-update as you edit the files.

---

## 🛠️ Technology Stack

This project is built using bleeding-edge web technologies:

### Core Framework
- **[Next.js 16 (App Router)](https://nextjs.org/)** - React framework for SSR, routing, and optimizations.
- **[React 19](https://react.dev/)** - UI library.

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework (configured with CSS variables for dynamic light/dark modes).
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent iconography.

### Animation & 3D
- **[Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)** - For all 3D WebGL scenes (Energy Core, Tech Constellation, Contact rings).
- **[GSAP (GreenSock)](https://gsap.com/)** - For complex, scrubbable scroll animations.
- **[Framer Motion](https://www.framer.com/motion/)** - For UI micro-interactions, modal popups, and magnetic buttons.
- **[Lenis](https://lenis.studiofreight.com/)** - For smooth, physics-based scrolling.

---

## 📂 Project Structure

Understanding where everything lives is key to modifying the site:

```
Launchpad-forge/
├── public/                 # Static assets (images, fonts, favicons)
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # Global styles and Tailwind design system variables
│   │   ├── layout.tsx      # Root layout, fonts, and metadata
│   │   └── page.tsx        # Main landing page assembling all sections
│   │
│   ├── components/         
│   │   ├── layout/         # Structural components (Navigation, Footer, SmoothScroll)
│   │   ├── sections/       # Page sections (Hero, About, WhatWeBuild, FAQ, etc.)
│   │   ├── three/          # WebGL & 3D React Three Fiber scenes
│   │   └── ui/             # Reusable UI parts (MagneticButton, CustomCursor, Marquee)
│   │
│   ├── hooks/              # Custom React hooks (useMediaQuery, useMousePosition, etc.)
│   │
│   └── lib/                # Utilities and static data
│       └── constants.ts    # Centralized data for Nav, Services, Case Studies, etc.
```

---

## 🎨 Customization Guide

### Changing Colors and Theme
All core colors are managed via CSS variables in `src/app/globals.css`. 
To change the primary brand color, update the `--accent` variables:

```css
:root {
  --accent: #e8652b;        /* Your primary brand color */
  --accent-dim: rgba(232, 101, 43, 0.15);
  --accent-glow: rgba(232, 101, 43, 0.4);
}
```

### Updating Content
Most of the text data (like Services, FAQ, Nav Links, Case Studies) is stored centrally to make updates easy. 
Edit `src/lib/constants.ts` to update the content without digging through component code.

---

## 🏗️ Building for Production

When you are ready to deploy, run the production build command to optimize the application:

```bash
npm run build
```

This will compile the application into a `.next` folder. You can test the production build locally with:

```bash
npm run start
```

---

## 🚢 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import the project into Vercel.
3. Vercel will automatically detect Next.js and configure the build settings.
4. Click Deploy!

For more detailed deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
