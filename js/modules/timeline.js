export function initTimeline() {
    // 1. Scroll Reveal Animation using Intersection Observer
    const items = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you don't want it to fade out again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    items.forEach(item => {
        observer.observe(item);
    });

    // 2. Click Interaction (Easter Egg)
    const contents = document.querySelectorAll('.timeline-content');

    contents.forEach(content => {
        content.addEventListener('click', function () {
            // Toggle active class for expanded view/secret reveal
            // If we want only one open at a time:
            // contents.forEach(c => { if(c !== this) c.classList.remove('active'); });

            this.classList.toggle('active');

            // Add a little haptic-like animation or effect here if desired
        });
    });
}
