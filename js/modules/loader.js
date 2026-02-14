export function initLoader(onComplete) {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress-bar');
    const loadDuration = 2500; // 2.5 seconds total

    let startTime = null;

    function animateProgress(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min((elapsed / loadDuration) * 100, 100);

        progressBar.style.width = `${progress}%`;

        if (progress < 100) {
            requestAnimationFrame(animateProgress);
        } else {
            // Finished
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    if (onComplete) onComplete();
                }, 800); // Wait for opacity transition
            }, 200); // Small pause at 100%
        }
    }

    requestAnimationFrame(animateProgress);
}
