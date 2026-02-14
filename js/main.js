import { initLoader } from './modules/loader.js';
import { initParticles } from './modules/particles.js';
import { initTimeline } from './modules/timeline.js';
import { initAlbum } from './modules/album.js';
import { initCounters } from './modules/counters.js';
import { initMusic } from './modules/music.js';
import { initVault } from './modules/vault.js';
import { initEasterEggs } from './modules/easterEggs.js';
import { initReasons } from './modules/reasons.js';
import { initQRShare } from './modules/qr-share.js';

document.addEventListener('DOMContentLoaded', () => {
    // Lock content initially
    document.body.classList.add('content-locked');

    // 1. Iniciar Animación de Carga
    initLoader(() => {
        // Callback cuando termina la carga:
        // Iniciar animaciones del Hero
        const heroContent = document.querySelector('.hero-content');
        heroContent.classList.remove('hidden');
        heroContent.classList.add('fade-in');

        // Iniciar componentes
        initTimeline();
        initAlbum();
        initCounters();
        initMusic();
        initVault();
        initEasterEggs(); // Initialize secret strawberries
        initReasons(); // Initialize 100 reasons + birthday check
        initQRShare(); // Initialize QR Share Button

        // Setup explore button
        setupExploreButton();
    });

    // 2. Iniciar Fondo de Partículas
    initParticles('particles-canvas');
});

// Setup explore button to unlock content
function setupExploreButton() {
    const exploreBtn = document.getElementById('btn-explore');
    const contentBlocker = document.getElementById('content-blocker');

    if (exploreBtn && contentBlocker) {
        exploreBtn.addEventListener('click', () => {
            // Unlock content
            document.body.classList.remove('content-locked');
            document.body.classList.add('content-unlocked');
            contentBlocker.classList.add('hidden');

            // Scroll to timeline
            setTimeout(() => {
                document.querySelector('.timeline-section').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        });
    }
}

