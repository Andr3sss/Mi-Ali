export function initMusic() {
    const audio = new Audio('Álvaro Díaz - YOKO (Instrumental).mp3'); // Ensure path is correct relative to index.html
    audio.loop = true;
    audio.volume = 0.5;

    const musicBtn = document.createElement('button');
    musicBtn.className = 'music-btn';
    musicBtn.innerHTML = '🎵 Play';
    document.body.appendChild(musicBtn);

    let isPlaying = false;

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '🎵 Play';
            musicBtn.classList.remove('playing');
        } else {
            audio.play().then(() => {
                musicBtn.innerHTML = '⏸️ Pause';
                musicBtn.classList.add('playing');
            }).catch(e => console.error("Audio play failed:", e));
        }
        isPlaying = !isPlaying;
    }

    musicBtn.addEventListener('click', togglePlay);

    // Optional: Try to auto-play on first user interaction with the page
    function oneTimePlay() {
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '⏸️ Pause';
            musicBtn.classList.add('playing');
            document.removeEventListener('click', oneTimePlay);
        }).catch(() => {
            // Autoplay failed (expected), waiting for explicit click on button
        });
    }

    // We can try this, but it might be annoying if they click something else. 
    // Let's stick to the button or the "Explore" button.
    const exploreBtn = document.querySelector('.btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            if (!isPlaying) {
                togglePlay();
            }
        });
    }
}
















































/*
 * ═══════════════════════════════════════════════════════════════
 *  🎵 EASTER EGG - Para los curiosos que encontraron el patrón 🎵
 * ═══════════════════════════════════════════════════════════════
 * 
 * Si llegaste aquí, significa que descubriste las fresas secretas.
 * Ahora necesitas descifrar el código...
 * 
 * 🎼 Notas Musicales en Código ASCII:
 * 
 *    Primera nota:  121
 *    Segunda nota:  111
 *    Tercera nota:  107
 *    Cuarta nota:   111
 * 
 * 💡 Pista: Estos números no son notas musicales...
 *           Son caracteres en el lenguaje de las computadoras.
 *           Busca "ASCII table" o usa String.fromCharCode() en la consola.
 * 
 * 🔐 Una vez que descifres la palabra, úsala en el cofre.
 * 
 * ═══════════════════════════════════════════════════════════════
 */





