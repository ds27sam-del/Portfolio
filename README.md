# Premium Developer Portfolio

A dynamic, premium personal portfolio for **Saumya Kumar Panwar** built with a Flask backend and an interactive vanilla HTML/CSS/JS frontend.

## 🌟 Features

- **Modern UI/UX**: Dark-themed glassmorphism aesthetic with subtle animations and micro-interactions.
- **Dynamic Projects System**: Projects are served via a JSON REST API (`/api/projects`) from the Flask backend, complete with real-time category filtering.
- **Theme Toggle**: Fully functional Dark/Light mode switch that persists via `localStorage`.
- **Responsive Design**: Fluid layout that adapts seamlessly to desktop, tablet, and mobile devices.
- **Interactive Timeline**: A scroll-revealed timeline detailing the journey from raw C and procedural logic up to modern web architectures.
- **Smart Project Cards**: Custom-colored badges based on language (Python, C++, SQL, HTML) and tabbed interfaces for multi-implementation projects (like the C/C++/Python Calculator).

## 🛠️ Technology Stack

- **Backend**: Python 3, Flask
- **Frontend**: HTML5, CSS3 (Vanilla, Variables), JavaScript (ES6+, Fetch API)
- **Design System**: Custom CSS with CSS Grid/Flexbox, Intersection Observers for scroll animations.

## 🚀 Getting Started

### Prerequisites
- Python 3.x installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ds27sam-del/Portfolio.git
   cd Portfolio
   ```

2. **Set up a virtual environment (optional but recommended)**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Flask**:
   ```bash
   pip install flask
   ```

4. **Run the application**:
   ```bash
   python app.py
   ```

5. **View the portfolio**:
   Open your web browser and navigate to [http://127.0.0.1:5000](http://127.0.0.1:5000).

## 📂 Project Structure

```text
Portfolio/
├── app.py                 # Main Flask application and API routes
├── static/
│   ├── css/
│   │   └── style.css      # Core design system and animations
│   └── js/
│       └── app.js         # Frontend logic (Observer, Fetch, DOM manipulations)
└── templates/
    └── index.html         # Main HTML layout and structural components
```

## 📬 Contact Form API
The contact form uses a modern asynchronous `fetch` POST request to the `/api/contact` endpoint, providing real-time UI feedback (success/error banners and loading spinners) without needing page reloads.

## 👨‍💻 About the Author

**Saumya Kumar Panwar (Sam)**
- Location: Solan, Himachal Pradesh, India
- Role: CS Student · Software Developer · Data Systems Architect
- GitHub: [@ds27sam-del](https://github.com/ds27sam-del)

---
*Designing Productive Applications — Efficient and Effective.*
