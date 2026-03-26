# Sharad Mishra Immersive Portfolio

An immersive, scroll-driven 3D portfolio built from the attached resume as the primary data source. The site combines React, Vite, React Three Fiber, Drei, GSAP ScrollTrigger, Framer Motion, Lenis, and Tailwind CSS to create a story-first product experience instead of a traditional static portfolio.

## What is included

- Typed resume-driven data model in `src/data/portfolio-data.ts`
- Fixed full-screen 3D scene with scroll-linked camera travel
- Story sections for hero, about, experience, skills, projects, and contact
- Responsive mobile fallback with lighter motion treatment
- Theme toggle for dark/light presentation

## Stack

- React + Vite + TypeScript
- Three.js + React Three Fiber + Drei
- GSAP ScrollTrigger
- Framer Motion
- Lenis
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
  data/
  hooks/
  styles/
  types/
```

## Resume mapping notes

The portfolio content is derived from `/Users/sharadmishra/Downloads/Sharad_Mishra_GenAI_Resume_Styled.pdf`. Information included:

- Name and title
- Summary
- Skills grouped by category
- Experience with achievements
- Featured project details
- Education
- Contact information

Where the resume did not include external profile URLs or project links, the portfolio keeps those actions minimal instead of inventing data.
