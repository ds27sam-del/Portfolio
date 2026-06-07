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
    let allProjects = [];

    // Helper for language classes
    function getLanguageClass(lang) {
        if (!lang) return "";
        return lang.toLowerCase().replace("++", "cpp").replace("#", "sharp");
    }

    async function initProjects() {
        try {
            // Show loading spinner
            projectsContainer.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
            `;

            const response = await fetch("/api/projects");
            if (!response.ok) {
                throw new Error("Failed to fetch project data");
            }

            allProjects = await response.json();
            
            // Render counts on filter buttons
            updateCategoryCounts();
            
            // Initial render
            filterProjects("all");
        } catch (error) {
            console.error("Error loading projects:", error);
            projectsContainer.innerHTML = `
                <div class="loading-spinner">
                    <p style="color: var(--accent-color)">Error loading projects. Please try again later.</p>
                </div>
            `;
        }
    }

    function updateCategoryCounts() {
        const counts = {
            all: allProjects.length,
            systems: allProjects.filter(p => p.category === "systems").length,
            databases: allProjects.filter(p => p.category === "databases").length,
            web: allProjects.filter(p => p.category === "web").length,
            "core-logic": allProjects.filter(p => p.category === "core-logic").length
        };

        for (const [cat, count] of Object.entries(counts)) {
            const countEl = document.getElementById(`count-${cat}`);
            if (countEl) {
                countEl.textContent = count;
            }
        }
    }

    function filterProjects(category = "all") {
        const filtered = category === "all" 
            ? allProjects 
            : allProjects.filter(p => p.category === category);
        renderProjects(filtered);
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

        projectsContainer.innerHTML = projects.map(project => {
            const hasImpl = !!project.implementations;
            const primaryLang = project.language || (hasImpl ? project.languages[0] : "");
            const desc = hasImpl ? project.implementations[project.languages[0]].description : project.description;
            const tags = hasImpl ? project.implementations[project.languages[0]].tags : project.tags;
            const githubUrl = hasImpl ? project.implementations[project.languages[0]].github_url : project.github_url;

            return `
                <div class="glass-card project-card reveal-card" data-id="${project.id}">
                    <div class="card-meta">
                        <span class="category-badge">${project.category.toUpperCase().replace("-", " ")}</span>
                        ${primaryLang ? `
                        <span class="lang-indicator">
                            <span class="lang-dot ${getLanguageClass(primaryLang)}"></span>
                            <span class="lang-text">${primaryLang}</span>
                        </span>
                        ` : ''}
                    </div>
                    <div class="project-body">
                        <h3>${project.title}</h3>
                        
                        ${hasImpl ? `
                        <div class="project-lang-tabs">
                            ${project.languages.map((lang, idx) => `
                                <button class="lang-tab ${idx === 0 ? 'active' : ''}" data-project-id="${project.id}" data-lang="${lang}">
                                    ${lang}
                                </button>
                            `).join("")}
                        </div>
                        ` : ''}

                        <p class="project-desc" id="desc-${project.id}">${desc}</p>
                        <div class="project-tags" id="tags-${project.id}">
                            ${tags.map(tag => `<span class="proj-tag">${tag}</span>`).join("")}
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${project.demo_url}" class="proj-link demo-link">
                            <span>Live Demo</span>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                        <a href="${githubUrl}" class="proj-link github-link" target="_blank">
                            <span>Source Code</span>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    </div>
                </div>
            `;
        }).join("");

        // Add event listeners and animations to project cards
        const cards = projectsContainer.querySelectorAll(".project-card");
        cards.forEach((card, index) => {
            // Spotlight glow effect
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });

            // Entry reveal animation
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            card.style.transitionDelay = `${index * 0.05}s`;
            
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 50);
        });
    }

    // Interactive Language Selection Switcher
    projectsContainer.addEventListener("click", (e) => {
        const tab = e.target.closest(".lang-tab");
        if (!tab) return;

        const projectId = parseInt(tab.getAttribute("data-project-id"), 10);
        const selectedLang = tab.getAttribute("data-lang");
        
        // Find project data
        const project = allProjects.find(p => p.id === projectId);
        if (!project || !project.implementations) return;

        // Toggle active button style
        const card = tab.closest(".project-card");
        card.querySelectorAll(".lang-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Update indicator text and dot class
        const langText = card.querySelector(".lang-indicator .lang-text");
        const langDot = card.querySelector(".lang-indicator .lang-dot");
        langText.textContent = selectedLang;
        langDot.className = `lang-dot ${getLanguageClass(selectedLang)}`;

        // Retrieve specific implementation
        const impl = project.implementations[selectedLang];

        const descEl = card.querySelector(`#desc-${projectId}`);
        const tagsEl = card.querySelector(`#tags-${projectId}`);
        const githubEl = card.querySelector(".github-link");

        descEl.style.opacity = "0";
        tagsEl.style.opacity = "0";

        setTimeout(() => {
            descEl.textContent = impl.description;
            tagsEl.innerHTML = impl.tags.map(tag => `<span class="proj-tag">${tag}</span>`).join("");
            githubEl.setAttribute("href", impl.github_url);

            descEl.style.opacity = "1";
            tagsEl.style.opacity = "1";
        }, 150);
    });

    // Filter Buttons click handler
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            const filterValue = e.currentTarget.getAttribute("data-filter");
            filterProjects(filterValue);
        });
    });

    // Initial Fetch
    initProjects();

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
