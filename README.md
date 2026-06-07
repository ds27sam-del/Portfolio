# 🌌 Saumya's Premium Tech Portfolio (v2)

An aesthetic, responsive, and performance-optimized developer portfolio showcasing software engineering journey, academic milestones, and core projects. Built using a backend dynamic rendering model with **Flask** and styled with a custom **Vanilla CSS Glassmorphic design**.

---

## ⚡ Features
* **Obsidian-Cyber Theme**: Deep obsidian background with cyber-indigo and electric cyan highlights.
* **Interactive Journey Timeline**: Chronological interactive visual timeline mapping growth phases (Pre-College, Self-Study, BCA Semesters, and Web-Scale targets).
* **Dynamic Projects Section**: Dynamically fetches projects from Flask backend API with responsive filter selectors.
* **Smooth-Scroll & Intersection Reveals**: Micro-animations and slide-in animations triggered on scroll using modern `IntersectionObserver` JS.
* **Seamless Dark/Light Mode**: Local-storage persisted theme switcher with matching CSS tokens.
* **Asynchronous Contact Form**: Modern AJAX contact form with spinner loading indicators and custom input validation.

---

## 🛠️ Technology Stack
* **Backend**: Python, Flask, Jinja2 Templates
* **Frontend**: HTML5, Vanilla CSS3 (Custom Glassmorphism), Modern ES6 JavaScript
* **Database Models**: Dynamic JSON objects parsed in Flask (ready for SQLite/PostgreSQL migration)

---

## 🚀 Setup & Execution

### Prerequisites
* Python 3.8 or higher installed on your system.

### 1. Installation
Clone the repository and install the backend dependency:
```bash
pip install Flask
```

> Note: this repository does not currently include a `requirements.txt` file.

### 2. Running the Development Server
Execute the Flask server:
```bash
python app.py
```
By default, the server will spin up on:
👉 **http://127.0.0.1:5000**

---

## 📂 Project Structure
```text
Portfolio/
├── app.py                # Flask main router, route handlers, and API endpoints
├── static/
│   ├── css/
│   │   └── style.css     # CSS rules, themes, glassmorphism, and responsive timeline styles
│   └── js/
│       └── app.js        # Form handling, theme toggling, scroll reveals, and project API loading
└── templates/
    └── index.html        # Main dynamic rendering HTML view (with Jinja templates)
```
