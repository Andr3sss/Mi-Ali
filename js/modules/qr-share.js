export function initQRShare() {
    console.log('📱 Initializing QR Share...');

    const siteUrl = 'https://teamomiali.netlify.app/';
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(siteUrl)}&color=d4789a`;

    // 1. Create Floating Button
    const btn = document.createElement('div');
    btn.className = 'qr-btn';
    btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 2h2v2h-2v-2zm3 2h3v2h-3v-2zM3 21h3v-3H3v3zm3 0h3v-3H6v3zm0-3h3v-3H6v3zm3 0h3v-3H9v3zm-3-3h3v-3H6v3zm3-3h3v-3H9v3zm3 0h3v-3h-3v3zm-3-3h3v-3h-3v3z"/></svg>
    `;
    btn.title = "Compartir (Código QR)";
    document.body.appendChild(btn);

    // 2. Create Modal Structure
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-content glass-panel">
            <button class="qr-close" title="Cerrar">✕</button>
            <h3 class="qr-title">¡Escanea Nuestro Amor! 📸</h3>
            <div class="qr-image">
                <img src="${qrApiUrl}" alt="QR Code" loading="lazy">
            </div>
            <p class="qr-text">Escanea este código para llevar nuestra historia siempre en tu celular 💕</p>
            <p style="font-size: 0.8rem; opacity: 0.6; margin-top: 10px;">${siteUrl}</p>
        </div>
    `;
    document.body.appendChild(modal);

    // 3. Interactions
    const closeBtn = modal.querySelector('.qr-close');

    // Open Modal
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        gsap.fromTo('.qr-content',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
        );
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    console.log('✅ QR Share initialized');
}

// Auto-run if imported properly, or attach to global
window.initQRShare = initQRShare;
