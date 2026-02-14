export function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60; // Not too many to keep it subtle
    const colors = ['#FFB7B2', '#E2F0CB', '#FF9AA2', '#FFDAC1']; // Pastel palette

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Very slow movement
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.1;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.fadingOut = Math.random() > 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges (or wrap around, wrapping is smoother for background)
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Twinkle effect
            if (this.fadingOut) {
                this.alpha -= this.fadeSpeed;
                if (this.alpha <= 0.1) this.fadingOut = false;
            } else {
                this.alpha += this.fadeSpeed;
                if (this.alpha >= 0.6) this.fadingOut = true;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    function init() {
        resize();
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    init();
}
