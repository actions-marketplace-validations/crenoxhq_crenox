/* ==========================================================================
   Sentinel Landing Page Logic
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

});
