# 🛠️ Developer Technical Reference Manual

Welcome to the developers' manual for the portfolio project. This document details the system design, file layouts, and code structures of the HTML, CSS, and JavaScript layers of this application.

---

## 1. Workspace & Architecture

This application is built as a lightweight, dynamic **Flask Single-Page Application (SPA)**. 
* **Backend (`app.py`)**: Responsible for serving the main routing paths, parsing static resources, and serving local JSON-based API endpoints:
  - `/api/projects` for project data
  - `/api/contact` for contact form submissions
* **Server Binding**: Configured to run locally on `127.0.0.1:5000` with debugger mode enabled.
* **Dependencies**:
  - `Flask` (Routing engine and template rendering)

> Note: there is no `requirements.txt` file in this repository at the moment.

---

## 2. File Structure

```text
d:\Portfolio\
│
├── app.py                      # Flask Application Entry Point
├── README.md                   # Setup Guide for Users
├── DEVELOPER.md                # Technical Documentation (This file)
│
├── templates/
│   └── index.html              # Main Markup File (uses Jinja2 templating syntax)
│
└── static/
    ├── css/
    │   └── style.css           # Styling Sheet (Variable themes, animations, layout grids)
    └── js/
        └── app.js              # Client logic (API fetches, themes, scroll tracking)
```

---

## 3. HTML Structure & Elements (`index.html`)

The HTML layout is semantic and modular, divided into distinct `<section>` components wrapped under `<main>`.

### Key Sections
1. **Header/Navbar (`.navbar`)**: 
   - Contains navigation links mapping to section IDs: `#about`, `#journey`, `#projects`, `#contact`.
   - Houses the theme toggler button (`#theme-toggle`) with inline SVGs for Moon/Sun indicators.
2. **Glow Background (`.glow-bg`)**:
   - Houses three floating absolute-positioned divs (`.blob-1`, `.blob-2`, `.blob-3`) that generate the glowing backdrop using radial blending.
3. **Hero Section (`#home`)**:
   - Split layout grid containing marketing tags, headings, and an interactive decorative code visualizer box depicting pseudo C++ engine initialization.
4. **About Me (`#about`)**:
   - Displays core skills in a tag container (`.skills-list`) alongside high-contrast stat cards (`.stat-card`).
5. **Journey Timeline (`#journey`)**:
   - Uses a vertical line (`.timeline-line`) as an absolute anchor.
   - Iterates through alternating items (`.timeline-item`) carrying `.reveal` classes. Even items align right, odd items align left.
6. **Featured Projects (`#projects`)**:
   - Houses category filter buttons (`.filter-btn`) mapping data attributes to API arguments.
   - Integrates a projects container (`#projects-container`) where cards are dynamically injected by the client-side JavaScript.
7. **Contact Form (`#contact`)**:
   - Includes validation fields (`input` & `textarea`) and an AJAX form controller that sends JSON payloads.

---

## 4. CSS Design Tokens & Layouts (`style.css`)

The style system is written in **Vanilla CSS** and relies heavily on custom properties (CSS variables) for real-time theme swapping.

### Theme Variables
The theme switches dynamically by updating the `[data-theme]` attribute on the `<html>` element:
```css
/* Core Palette Examples */
--primary-color: #6366f1; /* Cyber Indigo */
--accent-color: #06b6d4;  /* Electric Cyan */
--bg-color: #05050a;      /* Obsidian Dark Background */
--surface-color: rgba(10, 10, 18, 0.7); /* Translucent Glass Color */
--border-color: rgba(255, 255, 255, 0.06);
```

### Core Stylesheets Layouts
* **Glassmorphism (`.glass-card`)**: 
  Utilizes `backdrop-filter: blur(20px)` and semi-transparent border colorings with a subtle box-shadow. Hover triggers border color transitions and shadow extensions.
* **Glow Blob Animations**:
  Background blobs run `@keyframes float-blob` scaling and translating over `20s - 30s` cycles, with `mix-blend-mode: screen` on dark mode and `multiply` on light mode.
* **Vertical Timeline Grid**:
  - The line is centered via `left: 50%` and `transform: translateX(-50%)`.
  - Odd timeline items display right padding (`40px`) and `justify-content: flex-end`.
  - Even timeline items use `margin-left: 50%`, left padding (`40px`), and `justify-content: flex-start`.
  - Responsive media queries drop the center line to `left: 20px` and scale all cards to `width: 100%`.

---

## 5. JavaScript Functionality (`app.js`)

Client logic is compiled into modern, lightweight ES6 JavaScript executing inside a `DOMContentLoaded` event listener:

### Key Scripts Engines

#### A. Persistent Theme Swapper
Detects browser preferences using `window.matchMedia("(prefers-color-scheme: dark)")` or fetches local storage values (`localStorage.getItem("theme")`) to assign the `data-theme` attribute.
```javascript
themeToggleBtn.addEventListener("click", () => {
    const newTheme = htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});
```

#### B. Scroll Animation Reveal
Leverages the high-performance **`IntersectionObserver` API** to observe objects marked with `.reveal`. Once entered in the screen threshold, it applies the `.revealed` class (animating transform and opacity transitions in CSS).

#### C. Asynchronous Project Loader & Category Filter
Fetches data from `/api/projects?category=...` using asynchronous requests (`fetch`). Dynamically creates DOM templates for each project, appends corresponding tech tags, and triggers sequential stagger animations for card entries.

#### D. AJAX Contact Submissions
Submits name, email, and message inputs as a JSON payload to the `/api/contact` Flask route. Handles button state modifications (shows `.btn-spinner`, disables pointer actions) and handles backend callback message displays.
