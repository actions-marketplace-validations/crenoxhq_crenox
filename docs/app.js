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

});
