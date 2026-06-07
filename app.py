from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)

# Portfolio project data to be loaded dynamically
# Portfolio project data to be loaded dynamically
PROJECTS = [
    {
        "id": 1,
        "title": "Portfolio-v2",
        "description": "An older version of my personal portfolio website. Built using static HTML/CSS templates, flexible layout grids, and responsive viewport sizing.",
        "category": "web",
        "tags": ["HTML5", "CSS3", "JavaScript", "Responsive-Design"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Portfolio-v2",
        "featured": True,
        "language": "HTML"
    },
    {
        "id": 2,
        "title": "College-Database-System",
        "description": "A database management system to register, update, and manage student, course, and faculty records. Focuses on entity relationships and schema integrity.",
        "category": "databases",
        "tags": ["Python", "SQL", "Database-Design", "CRUD"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/College-Database-System",
        "featured": True,
        "language": "Python"
    },
    {
        "id": 3,
        "title": "Medical-Database-System",
        "description": "A patient record and hospital tracking web application. Engineered with Python, Flask, and relational SQL to handle secure medical logs.",
        "category": "web",
        "tags": ["Python", "Flask", "SQL", "Relational-Database"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Medical-Database-System",
        "featured": True,
        "language": "Flask"
    },
    {
        "id": 4,
        "title": "Sales-Database-System",
        "description": "An inventory management and sales logging web application built during my self-study 'Free Will' period. Implements interactive charts, product lists, and sales tracking.",
        "category": "web",
        "tags": ["Python", "Flask", "SQL", "Free-Will"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Sales-Database-System",
        "featured": True,
        "language": "Flask"
    },
    {
        "id": 5,
        "title": "Database-System-in-Cpp",
        "description": "An object-oriented file-based database system built entirely from scratch in C++. Persists records directly to disk using binary file handling.",
        "category": "databases",
        "tags": ["C++", "File-Handling", "OOP", "Disk-Persistence"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/database-system-in-cpp",
        "featured": True,
        "language": "C++"
    },
    {
        "id": 6,
        "title": "Calculator",
        "category": "core-logic",
        "featured": True,
        "languages": ["Python", "C++", "C"],
        "implementations": {
            "Python": {
                "description": "A terminal-based arithmetic expression solver. Handles basic operations, user inputs, and float formatting with clean control flow.",
                "tags": ["Python", "CLI", "Math-Library"],
                "github_url": "https://github.com/ds27sam-del/Calculator"
            },
            "C++": {
                "description": "An object-oriented implementation of a desk calculator. Uses classes, function overloading, and input verification routines.",
                "tags": ["C++", "OOP", "Header-Files"],
                "github_url": "https://github.com/ds27sam-del/Calculator"
            },
            "C": {
                "description": "Procedural-style command line calculator. Employs switches, functions, and manual input buffers for high-efficiency calculations.",
                "tags": ["C", "Procedural", "Console-App"],
                "github_url": "https://github.com/ds27sam-del/Calculator"
            }
        },
        "demo_url": "#"
    },
    {
        "id": 7,
        "title": "Factorial-of-n",
        "description": "High-performance factorial calculation routines in C++. Optimizes recursive stack size and tests integer limit limits for large inputs.",
        "category": "core-logic",
        "tags": ["C++", "Algorithms", "Recursion", "Iterative-Logic"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Factorial-of-n",
        "featured": True,
        "language": "C++"
    },
    {
        "id": 8,
        "title": "Gass-the-number-game",
        "description": "A terminal-based guessing game built in C. Explores seed-based random generators, linear loops, and error-handling on keyboard inputs.",
        "category": "core-logic",
        "tags": ["C", "Randomization", "Loop-Control", "CLI-Game"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Gass-the-number-game",
        "featured": True,
        "language": "C"
    },
    {
        "id": 9,
        "title": "Practical-Question-Python",
        "description": "A repository of practical assignments, algorithm test benches, and utility functions solving basic computer science requirements in Python.",
        "category": "core-logic",
        "tags": ["Python", "Algorithms", "Scripting", "Academic-Checks"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Practical-Question-Python",
        "featured": True,
        "language": "Python"
    },
    {
        "id": 10,
        "title": "struct-in-c",
        "description": "In-depth testing of composite data types using C structure models. Explores pointer conversions, byte sizing, and memory offset layouts.",
        "category": "systems",
        "tags": ["C", "Structs", "Memory-Alignment", "Pointers"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/struct-in-c",
        "featured": True,
        "language": "C"
    },
    {
        "id": 11,
        "title": "Swap-values-a-b",
        "description": "An educational C++ codebase contrasting call-by-value, call-by-reference, and call-by-pointer addressing to swap program variables.",
        "category": "systems",
        "tags": ["C++", "References", "Memory-Addresses", "Pointers"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Swap-values-a-b",
        "featured": True,
        "language": "C++"
    },
    {
        "id": 12,
        "title": "Task-Management",
        "description": "A dynamic schedule manager dashboard. Utilizes local browser storage, DOM event list dynamics, and CSS transitions to track tasks.",
        "category": "web",
        "tags": ["HTML5", "CSS3", "JavaScript", "Local-Persistence"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Task-Management",
        "featured": True,
        "language": "HTML"
    },
    {
        "id": 13,
        "title": "Vector-in-cpp",
        "description": "Demonstration of C++ Standard Template Library dynamic vectors. Showcases element pushing, popping, sorting, and linear search bounds.",
        "category": "systems",
        "tags": ["C++", "STL", "Dynamic-Arrays", "Vectors"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Vector-in-cpp",
        "featured": True,
        "language": "C++"
    }
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/projects")
def get_projects():
    # Filter by category if requested
    category = request.args.get("category")
    if category and category != "all":
        filtered = [p for p in PROJECTS if p["category"] == category]
        return jsonify(filtered)
    return jsonify(PROJECTS)

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "No data received"}), 400
    
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    
    if not name or not email or not message:
        return jsonify({"success": False, "message": "All fields are required"}), 400
        
    # In a real app, you might save this to a database, send an email, etc.
    # We will simulate success and print to console
    print(f"[CONTACT FORM SUBMISSION] Name: {name} | Email: {email} | Message: {message}")
    
    return jsonify({
        "success": True,
        "message": f"Thank you, {name}! Your message has been received."
    })

if __name__ == "__main__":
    # Ensure templates/static folders are recognized correctly
    app.run(debug=True, host="127.0.0.1", port=5000)
