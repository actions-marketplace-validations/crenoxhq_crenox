/* ==========================================================================
   Crenox Landing Page Logic
   Features: Minimal scroll fade-in reveals.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Scroll Entry Animations (IntersectionObserver) ───────────────────
    const fadeElements = document.querySelectorAll('.scroll-fade');

    const observerOptions = {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ─── Hamburger Menu Toggle ───────────────────────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const navBar = document.querySelector('.nav-bar');

    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
        });

        // Close menu when clicking any nav link
        const navLinks = document.querySelectorAll('.nav-link, .lang-switch-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navBar.classList.remove('active');
            });
        });
    }

    // ─── Dynamic GitHub Release Version Fetcher ──────────────────────────
    fetch('https://api.github.com/repos/crenoxhq/crenox/releases/latest')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response not ok');
        })
        .then(data => {
            const version = data.tag_name; // e.g. "v2.1.0"
            document.querySelectorAll('.latest-version').forEach(el => {
                el.textContent = version;
            });
        })
        .catch(err => {
            console.warn('Crenox: Could not dynamically resolve latest version from GitHub API, using fallback.', err);
        });

});
