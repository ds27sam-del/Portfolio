document.addEventListener("DOMContentLoaded", () => {
    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
    } else {
        htmlElement.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
    }

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // Mobile Navigation Overlay Menu
    const mobileToggle = document.querySelector(".mobile-nav-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        mobileToggle.classList.toggle("open");
        
        // Toggle bar rotation for Hamburger icon
        const bars = mobileToggle.querySelectorAll(".bar");
        if (mobileMenu.classList.contains("active")) {
            bars[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            const bars = mobileToggle.querySelectorAll(".bar");
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        });
    });

    // Scroll Reveal Elements
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Dynamic Projects Loading and Filtering
    const projectsContainer = document.getElementById("projects-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    async function fetchProjects(category = "all") {
        try {
            // Show loading spinner
            projectsContainer.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
            `;

            const response = await fetch(`/api/projects?category=${category}`);
            if (!response.ok) {
                throw new Error("Failed to fetch project data");
            }

            const projects = await response.json();
            renderProjects(projects);
        } catch (error) {
            console.error("Error loading projects:", error);
            projectsContainer.innerHTML = `
                <div class="loading-spinner">
                    <p style="color: var(--accent-color)">Error loading projects. Please try again later.</p>
                </div>
            `;
        }
    }

    function renderProjects(projects) {
        if (projects.length === 0) {
            projectsContainer.innerHTML = `
                <div class="loading-spinner">
                    <p style="color: var(--text-muted)">No projects found in this category.</p>
                </div>
            `;
            return;
        }

        projectsContainer.innerHTML = projects.map(project => `
            <div class="glass-card project-card reveal-card">
                <div class="project-body">
                    <span class="badge" style="margin-bottom: 1rem; font-size: 0.75rem;">${project.category.toUpperCase()}</span>
                    <h3>${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="proj-tag">${tag}</span>`).join("")}
                    </div>
                </div>
                <div class="project-links">
                    <a href="${project.demo_url}" class="proj-link">
                        <span>Live Demo</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <a href="${project.github_url}" class="proj-link">
                        <span>Source Code</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                </div>
            </div>
        `).join("");

        // Make project cards reveal nicely after rendering
        const cards = projectsContainer.querySelectorAll(".project-card");
        cards.forEach((card, index) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            card.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 50);
        });
    }

    // Filter Buttons click handler
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            const filterValue = e.currentTarget.getAttribute("data-filter");
            fetchProjects(filterValue);
        });
    });

    // Initial Fetch
    fetchProjects();

    // Contact Form AJAX Submission
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const btnText = submitBtn.querySelector("span");
    const btnSpinner = submitBtn.querySelector(".btn-spinner");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get Form Data
        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        // Reset Feedback
        formFeedback.className = "form-feedback hidden";
        formFeedback.textContent = "";

        // UI Loading State
        submitBtn.disabled = true;
        btnText.style.opacity = "0.5";
        btnSpinner.classList.remove("hidden");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Success
                formFeedback.className = "form-feedback success";
                formFeedback.textContent = result.message;
                contactForm.reset();
            } else {
                // Backend validation failure
                formFeedback.className = "form-feedback error";
                formFeedback.textContent = result.message || "Something went wrong. Please check inputs.";
            }
        } catch (error) {
            console.error("Submission Error:", error);
            formFeedback.className = "form-feedback error";
            formFeedback.textContent = "Unable to connect to the server. Please verify your connection and try again.";
        } finally {
            // Restore Button State
            submitBtn.disabled = false;
            btnText.style.opacity = "1";
            btnSpinner.classList.add("hidden");
        }
    });
});
