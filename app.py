from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)

# Portfolio project data to be loaded dynamically
# Portfolio project data to be loaded dynamically
PROJECTS = [
    {
        "id": 1,
        "title": "Portfolio-v2",
        "description": "A premium, responsive portfolio website designed to feature my software development journey, academic milestones, and core technical projects. Built with clean semantic layout principles and fluid visual hierarchies.",
        "category": "web",
        "tags": ["HTML5", "CSS3", "JavaScript", "Responsive-Design"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Portfolio-v2",
        "featured": True
    },
    {
        "id": 2,
        "title": "College-Database-System",
        "description": "A comprehensive data management platform engineered to handle complex student and faculty records. Focuses on relational schema architecture, secure data storage, and smooth CRUD operations for academic environments.",
        "category": "databases",
        "tags": ["Python", "SQL", "Database-Design", "Backend"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/College-Database-System",
        "featured": True
    },
    {
        "id": 3,
        "title": "Task-Management-System",
        "description": "A structured application designed to optimize daily workflows, tracking, and task allocation. Utilizes clean control flow and algorithmic structuring to manage, update, and prioritize user-defined objectives efficiently.",
        "category": "systems",
        "tags": ["C++", "OOP", "Data-Structures", "Logic-Flow"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Task-Management",
        "featured": True
    },
    {
        "id": 4,
        "title": "Medical-Database-System",
        "description": "A backend database application modeled to simulate hospital and patient record tracking. Implements structured data tables, relational mapping, and search queries to handle sensitive informational logic reliably.",
        "category": "databases",
        "tags": ["SQL", "Python", "Relational-Data", "CRUD"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/Medical-Database-System",
        "featured": True
    },
    {
        "id": 5,
        "title": "Database-System-in-Cpp",
        "description": "An object-oriented system built entirely from scratch in C++ to handle data storage without external database engines. Uses file handling streams to read, write, parse, and persist data directly to storage disks.",
        "category": "core-logic",
        "tags": ["C++", "File-Handling", "OOP", "Memory-Management"],
        "demo_url": "#",
        "github_url": "https://github.com/ds27sam-del/database-system-in-cpp",
        "featured": True
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
