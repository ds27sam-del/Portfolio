// app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    // Check local storage for theme, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
    
    // Navbar Scroll Behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll Reveal & Active Links
    const reveals = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // Trigger count-up if it's the about section stats
                if (entry.target.classList.contains('about-stats')) {
                    runCountUp();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
    
    // Active link highlighting based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Count-up animation
    let counted = false;
    function runCountUp() {
        if (counted) return;
        counted = true;
        
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.innerText;
            if (text.includes('15+')) {
                animateValue(stat, 0, 15, 2000, '+');
            }
            if (text.includes('100%')) {
                animateValue(stat, 0, 100, 2000, '%');
            }
        });
    }
    
    function animateValue(obj, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Projects Fetching and Filtering
    const projectsContainer = document.getElementById('projects-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let allProjectsData = [];
    
    async function fetchProjects(category = 'all') {
        try {
            projectsContainer.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
            
            const response = await fetch(`/api/projects?category=${category}`);
            const data = await response.json();
            
            if (category === 'all') {
                allProjectsData = data;
                updateCounts();
            }
            
            renderProjects(data);
            
        } catch (error) {
            projectsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
            console.error('Error fetching projects:', error);
        }
    }
    
    function updateCounts() {
        const counts = {
            'all': allProjectsData.length,
            'systems': allProjectsData.filter(p => p.category === 'systems').length,
            'databases': allProjectsData.filter(p => p.category === 'databases').length,
            'web': allProjectsData.filter(p => p.category === 'web').length,
            'core-logic': allProjectsData.filter(p => p.category === 'core-logic').length
        };
        
        for (const [key, value] of Object.entries(counts)) {
            const countEl = document.getElementById(`count-${key}`);
            if (countEl) countEl.innerText = value;
        }
    }
    
    function getLangColorClass(lang) {
        if(!lang) return 'lang-default';
        const lowerLang = lang.toLowerCase();
        if (lowerLang.includes('html')) return 'lang-html';
        if (lowerLang.includes('python')) return 'lang-python';
        if (lowerLang.includes('flask')) return 'lang-flask';
        if (lowerLang.includes('c++') || lowerLang.includes('cpp')) return 'lang-cpp';
        if (lowerLang === 'c') return 'lang-c';
        if (lowerLang.includes('sql')) return 'lang-sql';
        return 'lang-default';
    }
    
    function renderProjects(projects) {
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted);">No projects found for this category.</p>';
            return;
        }
        
        let html = '';
        
        projects.forEach(project => {
            // Check for special calculator card (has implementations tab)
            if (project.implementations) {
                html += renderTabbedProject(project);
            } else {
                html += renderStandardProject(project);
            }
        });
        
        projectsContainer.innerHTML = html;
        
        // Setup tabs for tabbed projects
        setupTabs();
    }
    
    function renderStandardProject(project) {
        const tagsHtml = project.tags ? project.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '';
        const langClass = getLangColorClass(project.language);
        
        return `
            <div class="glass-card project-card">
                <div class="project-header">
                    <span class="lang-badge ${langClass}">${project.language || project.category}</span>
                    <h3>${project.title}</h3>
                </div>
                <p class="project-desc">${project.description || ''}</p>
                <div class="project-tags">${tagsHtml}</div>
                <div class="project-footer">
                    ${project.github_url && project.github_url !== '#' ? `<a href="${project.github_url}" target="_blank" class="project-link">GitHub ↗</a>` : ''}
                    ${project.demo_url && project.demo_url !== '#' ? `<a href="${project.demo_url}" target="_blank" class="project-link">Demo ↗</a>` : ''}
                </div>
            </div>
        `;
    }
    
    function renderTabbedProject(project) {
        const langs = Object.keys(project.implementations);
        let tabsHtml = '<div class="tabs-header">';
        let contentsHtml = '';
        
        langs.forEach((lang, index) => {
            const isActive = index === 0 ? 'active' : '';
            tabsHtml += `<button class="tab-btn ${isActive}" data-target="tab-${project.id}-${lang}">${lang}</button>`;
            
            const impl = project.implementations[lang];
            const tagsHtml = impl.tags ? impl.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '';
            const langClass = getLangColorClass(lang);
            
            contentsHtml += `
                <div class="tab-content ${isActive}" id="tab-${project.id}-${lang}">
                    <span class="lang-badge ${langClass}" style="margin-bottom:8px; display:inline-block;">${lang}</span>
                    <p class="project-desc" style="min-height:60px;">${impl.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    <div class="project-footer" style="margin-top:10px;">
                        ${impl.github_url && impl.github_url !== '#' ? `<a href="${impl.github_url}" target="_blank" class="project-link">GitHub ↗</a>` : ''}
                    </div>
                </div>
            `;
        });
        
        tabsHtml += '</div>';
        
        return `
            <div class="glass-card project-card" style="border-color: var(--accent);">
                <div class="project-header" style="margin-bottom: 8px;">
                    <h3>${project.title} ✨</h3>
                </div>
                ${tabsHtml}
                ${contentsHtml}
            </div>
        `;
    }
    
    function setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Find parent card
                const card = e.target.closest('.project-card');
                
                // Remove active from all tabs and contents in this card
                card.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                card.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active to clicked tab
                e.target.classList.add('active');
                
                // Add active to corresponding content
                const targetId = e.target.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    
    // Filter Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Note: e.currentTarget ensures we get the button even if clicked on a child span/icon
            const button = e.currentTarget; 
            button.classList.add('active');
            
            const category = button.getAttribute('data-filter');
            fetchProjects(category);
        });
    });
    
    // Initial fetch to load all projects on page load
    fetchProjects('all');
    
    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('span');
    const btnSpinner = submitBtn.querySelector('.spinner');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        formFeedback.classList.add('hidden');
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            formFeedback.classList.remove('hidden');
            if (data.success) {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerText = data.message;
                contactForm.reset();
            } else {
                formFeedback.className = 'form-feedback error';
                formFeedback.innerText = data.message || 'Something went wrong.';
            }
            
        } catch (error) {
            formFeedback.classList.remove('hidden');
            formFeedback.className = 'form-feedback error';
            formFeedback.innerText = 'Network error. Please try again later.';
            console.error('Contact error:', error);
        } finally {
            // Restore UI state
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
        }
    });

});
