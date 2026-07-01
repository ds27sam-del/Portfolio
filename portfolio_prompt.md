# 🎨 Portfolio Generation Prompt — Saumya Kumar Panwar

## Overview

Build a **premium, modern, dark-themed developer portfolio** for **Saumya Kumar Panwar** (alias "Sam"), a 1st-year BCA Computer Science student from Solan, Himachal Pradesh, India. The portfolio is a **Flask web application** with a `templates/index.html`, `static/css/style.css`, and `static/js/app.js`. Projects are served dynamically from a Python backend via a `/api/projects` JSON endpoint.

---

## 🎯 Design Philosophy

> "Elegant, technical, performance-obsessed — like the code it represents."

- **Aesthetic**: Premium dark glassmorphism with deep navy/violet/emerald tones
- **Vibe**: A senior developer's portfolio, not a student template. Confidence, craft, and depth
- **Inspiration**: Linear.app, Vercel dashboard, Raycast website — ultra-modern, minimal noise, maximum impact
- **Typography**: `Outfit` (headings) + `Inter` (body) from Google Fonts — already linked in HTML
- **Color Palette**:
  - Background: `#050816` (deep space black)
  - Surface/Glass: `rgba(255,255,255,0.04)` with `backdrop-filter: blur(20px)`
  - Primary Accent: `#7c3aed` → `#a855f7` (violet-purple gradient)
  - Secondary Accent: `#06b6d4` (cyan glow)
  - Highlight: `#10b981` (emerald green for tags, dots, success)
  - Text Primary: `#f1f5f9`
  - Text Muted: `#64748b`
  - Border: `rgba(255,255,255,0.08)`

---

## 🧑‍💻 Personal Details

| Field | Value |
|---|---|
| Full Name | Saumya Kumar Panwar |
| Alias | Sam |
| Role | CS Student · Software Developer · Data Systems Architect |
| Education | BCA (1st Year), transitioning to 2nd Year |
| Location | Solan, Himachal Pradesh, India |
| Email | ds27sam@gmail.com |
| GitHub | [github.com/ds27sam-del](https://github.com/ds27sam-del) |
| Tagline | *"Designing Productive Applications — Efficient and Effective"* |

---

## 🏗️ Page Sections (Full Detail)

### 1. 🔝 Navbar
- Fixed top, glass blur background on scroll
- Logo: `Sam.` with accent dot
- Links: About · Journey · Projects · Contact
- Right: **Dark/Light theme toggle** (sun/moon SVG icons already in HTML)
- Mobile hamburger menu → fullscreen overlay with animated links
- Smooth scroll active link highlighting (intersection observer)

---

### 2. 🌌 Hero Section
- Left column (60%):
  - Animated badge: `Software Developer & Data Systems Architect`
  - H1: *"Designing Productive Applications"* + gradient colored span: *"Efficient and Effective"*
  - Subtitle paragraph about Python, Flask, databases, CS fundamentals
  - CTA group: **"View My Work"** (solid violet) + **"Get in Touch"** (ghost/outline)
- Right column (40%):
  - Floating glassmorphic code card (already in HTML: `Sam_core.cpp`)
  - Syntax-highlighted C++ snippet with window chrome (red/yellow/green dots)
  - Card should gently **float up/down** with CSS `@keyframes float`
  - Background: 3 animated glowing blobs (`blob-1`, `blob-2`, `blob-3`) in purple, cyan, indigo

---

### 3. 👤 About Section
- Section title: `About Me` with animated underline divider
- Left: Bio text + **Core Expertise** skill tags:
  - `Systems Programming (C++, OOP, DSA)`
  - `Backend Architecture (Python, Flask, SQL, DBMS)`
  - `Graphics (HTML5, CSS3, Responsive Design)`
  - `Project Workflow (Git, GitHub Version Control)`
- Right: 3 animated glass stat cards:
  - `1st Year` → `BCA Student`
  - `15+` → `Projects Built`
  - `100%` → `Logical-Driven`
- Stat numbers should have a **count-up animation** on scroll reveal

---

### 4. 🗺️ Journey / Timeline Section
- Section title: `My Journey`
- Vertical timeline with a glowing center line
- Timeline dots: animated pulsing ring + inner dot
- 5 cards (glass morphic), alternating or stacked:

| Phase | Title | Period |
|---|---|---|
| Phase 1 & 2 | 🌿 Early Roots | Pre-College |
| Phase 3 | ⚡ The Free Will Period | Self-Study |
| Phase 4 | 💻 The Mother Tongue | BCA Semester 1 (C language) |
| Phase 5 | 🚀 Scaling Up | BCA Semester 2 (C++, OOP, DSA, SQL) |
| Current | 🛰️ June 25th Milestone & BCA Year 2 | Flask, Python, HTML5, CSS3 |

- Each card: date badge, emoji title, description paragraph, focus label + value, tech tags
- Last card (future) should have a **glowing border** / special highlight

---

### 5. 🗂️ Projects Section
- Section title: `Featured Projects`
- **Filter buttons** with project count badges:
  - All Projects 📂 · Systems ⚙️ · Databases 🗄️ · Web Apps 🌐 · Core Logic 🧠
- Active filter: filled accent background, others: glass ghost
- **Projects loaded dynamically** from `/api/projects` via `fetch()`
- Project cards (glass morphic, hover lift + glow):
  - Language/category badge (color coded: HTML=orange, Python=blue, Flask=green, C++=purple, C=red)
  - Title (bold, large)
  - Description (2-3 lines, muted)
  - Tags row (pill chips, small)
  - Footer row: GitHub link button + Demo link button
  - **Special card**: `Calculator` has 3 implementations (Python/C++/C) — show a tabbed interface inside the card
- Filter animation: cards fade-out/in with `transform: scale` + `opacity` transitions
- Count badges on filter buttons update dynamically based on loaded data

---

### 6. 📬 Contact Section
- Section title: `Get in Touch`
- Left info panel:
  - H3: *"Let's Build Something Exceptional"*
  - Paragraph about backend architecture & collaboration
  - Email info item with mail SVG icon: `ds27sam@gmail.com`
  - Location info item with pin SVG icon: `Solan, Himachal Pradesh, India`
  - GitHub link item
- Right: Glass card contact form:
  - Fields: Name · Email · Message (textarea)
  - Animated focus ring on inputs
  - Submit button with loading spinner state
  - Success/error feedback banner (animated slide-in)
  - POST to `/api/contact` endpoint

---

### 7. 🦶 Footer
- Copyright: `© 2026 Saumya Kumar Panwar. All rights reserved.`
- Credits: `Built with Flask & Vanilla CSS`
- Centered, muted, minimal

---

## ✨ Animations & Micro-Interactions

| Element | Animation |
|---|---|
| Hero entry | `fadeInUp` with staggered delay |
| Scroll sections | `IntersectionObserver` → `reveal` class adds `opacity:1, translateY(0)` |
| Navbar on scroll | Adds `.scrolled` → glass blur + border bottom |
| Blobs | Slow `@keyframes blob` rotation/scale loop |
| Hero card | `@keyframes float` — subtle vertical oscillation |
| Timeline dots | `@keyframes pulse` — expanding ring |
| Stat numbers | Count-up JS animation on reveal |
| Filter buttons | `transition: all 0.3s` with active state swap |
| Project cards | Hover: `translateY(-8px)` + box-shadow glow |
| Form inputs | Focus: violet glow `box-shadow` |
| Mobile menu | Slide-down overlay with `transform: translateY` |
| Theme toggle | `transition: background 0.4s` on `:root` variables |

---

## 🌗 Light / Dark Theme

Use CSS custom properties (`--color-bg`, `--color-surface`, `--color-text`, etc.) on `[data-theme="dark"]` and `[data-theme="light"]` on the `<html>` element. The JS toggle should save preference to `localStorage`.

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#050816` | `#f8fafc` |
| `--surface` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.04)` |
| `--text` | `#f1f5f9` | `#0f172a` |
| `--muted` | `#64748b` | `#94a3b8` |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.1)` |
| `--accent` | `#7c3aed` | `#6d28d9` |

---

## 🛠️ Technical Implementation

### Files to create/overwrite:
- `d:\Portfolio\static\css\style.css` — Full design system (CSS variables, reset, components, animations)
- `d:\Portfolio\static\js\app.js` — Theme toggle, scroll observer, project fetch + render, filter logic, contact form, count-up animation

### Flask routes (already exist in `app.py`):
- `GET /` → `templates/index.html`
- `GET /api/projects?category=<cat>` → JSON array of projects
- `POST /api/contact` → `{ name, email, message }` → success/error JSON

### JavaScript Architecture:
```
app.js
├── Theme system (localStorage + data-theme toggle)
├── Mobile nav toggle
├── Navbar scroll behavior
├── IntersectionObserver (reveal animations + count-up trigger)
├── fetchProjects(category) → renderProjectCards()
├── renderProjectCard(project) → HTML string builder
├── Filter button event listeners
├── Contact form submission (fetch POST + feedback UI)
└── Count-up animation utility
```

---

## 📐 Layout & Responsiveness

- Max content width: `1200px`, centered with `auto` margins
- Sections: `padding: 100px 24px`
- Grid: CSS Grid for hero (2-col), about (2-col), projects (3-col → 2-col → 1-col)
- Breakpoints:
  - `< 1024px`: Switch hero to single column, about to single column
  - `< 768px`: Projects go 1-col, timeline stacks, mobile nav shown
  - `< 480px`: Reduce font sizes, padding

---

## 🎨 Language Color Coding for Project Cards

| Language | Badge Color |
|---|---|
| HTML | `#f97316` (orange) |
| Python | `#3b82f6` (blue) |
| Flask | `#10b981` (emerald) |
| C++ | `#a855f7` (purple) |
| C | `#ef4444` (red) |
| SQL | `#eab308` (yellow) |

---

## ⚠️ Special Edge Case: Calculator Project

Project ID 6 (`Calculator`) has **3 language implementations** (Python, C++, C) under an `implementations` object instead of a single `description`. The project card must:
1. Detect the `implementations` key
2. Render **3 language tab buttons** inside the card (Python | C++ | C)
3. Show/hide the correct description and tags on tab click
4. Default to first tab (Python)

---

> Build this portfolio to **wow** — it should feel like a senior developer's showcase that demonstrates both technical depth AND design maturity. Every pixel should feel intentional.
