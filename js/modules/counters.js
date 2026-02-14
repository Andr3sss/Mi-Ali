export function initCounters() {
    // Configuration: Date 1 (First Message)
    const date1 = new Date('2024-05-02T00:00:00'); // First Message
    const date2 = new Date('2025-08-05T00:00:00'); // Official

    function updateTimer(targetDate, elementId) {
        const now = new Date();
        const diff = now - targetDate;

        if (diff < 0) {
            // Future date case?
            // "Faltan..." ?
            // User said it WAS May 2nd 2024 and Aug 5th 2025.
            // If we are currently BEFORE Aug 5th 2025, it should count UP? or DOWN?
            // Usually "Time Together" counts UP since the event.
            // But Aug 2025 is in the FUTURE relative to May 2024?
            // Wait, current date according to metadata is 2026!
            // So both are in the PAST. Correct.
            // Just displaying ensure positive diff.
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const el = document.getElementById(elementId);
        if (el) {
            el.querySelector('.days').innerText = days;
            el.querySelector('.hours').innerText = hours;
            el.querySelector('.minutes').innerText = minutes;
            el.querySelector('.seconds').innerText = seconds;
        }
    }

    function loop() {
        updateTimer(date1, 'timer-first-msg');
        updateTimer(date2, 'timer-official');
        requestAnimationFrame(loop);
    }

    loop();
}
