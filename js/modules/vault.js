// ================================================================
//  CONFIG
// ================================================================
import { getCodes, checkCode } from './obfuscate.js';

const CODES = getCodes(); // Codes are now obfuscated
const LOCK_LETTERS = ['T', 'E', '❤️', 'A', 'M', 'O'];

const GUARDIAN_MESSAGES = [
    "Miau... ¿quién anda despertando mi cofre? 👀",
    "Este cofre guarda algo muy valioso... solo tú puedes abrirlo.",
    "Piensa en todas las conversaciones que alguna vez tuvimos...",
    "Las respuestas siempre han estado en tu corazón. ¿Las escuchas?",
    "Tres letras :3",
    "Fon Fon ",
    "Gatoooooooo",
    "ZzzzzZZzZzzzZ",
    "El dia mas feliz de toda la existencia de mi dueño",
    "Te aprecio ",
    "Que lugar para unos besos",
    "Prr prr... tómate tu tiempo. El cofre puede esperar. 🐾",
    "Cada candado que abres me hace ronronear más fuerte 💕",
    "No te rindas. Las pistas están en mis palabras, escucha bien.",
    "🎶🎵🎶🎵🎶",
    "Miau~ El cofre tiembla de emoción cuando te acercas a la respuesta.",
    "FRESAAAAAAAAAAAAAA.....S 🤤🤤🤤",
    "Ronroneo... cada vez estás más cerca del secreto del cofre. ✨"
];

let unlockedCount = 0;
const usedCodes = new Set();
let typingTimeout = null;

// ================================================================
//  STARFIELD
// ================================================================
(function createStarfield() {
    for (let i = 0; i < 90; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const sz = Math.random() * 2.2 + 0.5;
        s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}vh;left:${Math.random() * 100}vw;animation-duration:${2.5 + Math.random() * 4}s;animation-delay:${Math.random() * 5}s;`;
        document.body.appendChild(s);
    }
})();

// ================================================================
//  PARTICLES
// ================================================================
function spawnBgParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = Math.random() * 3.5 + 1.5;
    const cols = ['#f4c4d8', '#d8b4e8', '#f9d4c0', '#b8e8d8', '#fce4ef', '#e8d4f8'];
    p.style.cssText = `width:${sz}px;height:${sz}px;background:${cols[Math.random() * cols.length | 0]};left:${Math.random() * 100}vw;top:-8px;opacity:${.12 + Math.random() * .3};animation-duration:${10 + Math.random() * 18}s;`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 28000);
}
setInterval(spawnBgParticle, 900);

// ================================================================
//  EYE TRACKING
// ================================================================
const catSvg = document.getElementById('cat-svg');
document.addEventListener('mousemove', e => {
    const r = catSvg.getBoundingClientRect();
    const cx = r.left + r.width * 0.5;
    const cy = r.top + r.height * 0.44;
    const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
    const dst = Math.min(3.6, Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2) / 68);
    const ex = Math.cos(ang) * dst;
    const ey = Math.sin(ang) * dst;
    document.getElementById('lpupil').setAttribute('cx', 83 + ex);
    document.getElementById('lpupil').setAttribute('cy', 98 + ey);
    document.getElementById('rpupil').setAttribute('cx', 117 + ex);
    document.getElementById('rpupil').setAttribute('cy', 98 + ey);
});

// ================================================================
//  LOCKS
// ================================================================
function closedLockSVG() {
    return `<svg class="lock-svg" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="30" width="48" height="38" rx="9" fill="rgba(48,18,58,.92)" stroke="rgba(212,120,154,.42)" stroke-width="1.5"/>
    <path d="M20 30V22C20 14.3 25.4 8 32 8C38.6 8 44 14.3 44 22V30" stroke="rgba(212,120,154,.52)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <circle cx="32" cy="49" r="6.5" fill="rgba(212,120,154,.32)"/>
    <line x1="32" y1="55" x2="32" y2="62" stroke="rgba(212,120,154,.32)" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

function openLockSVG() {
    return `<svg class="lock-svg" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="30" width="48" height="38" rx="9" fill="rgba(100,38,82,.88)" stroke="rgba(252,228,239,.72)" stroke-width="1.5"/>
    <path d="M20 30V22C20 14.3 25.4 8 32 8C38.6 8 44 14.3 44 22V17" stroke="rgba(252,228,239,.82)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <circle cx="32" cy="49" r="6.5" fill="rgba(246,196,220,.72)"/>
    <line x1="32" y1="55" x2="32" y2="62" stroke="rgba(246,196,220,.72)" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

function buildLocks() {
    const c = document.getElementById('locks-container');
    LOCK_LETTERS.forEach((l, i) => {
        const item = document.createElement('div');
        item.className = 'lock-item';
        item.id = `lock-${i}`;
        item.innerHTML = closedLockSVG() + `<span class="lock-letter">${l}</span>`;
        c.appendChild(item);
    });
}

function unlockNext() {
    const item = document.getElementById(`lock-${unlockedCount}`);
    if (!item) return;
    item.innerHTML = openLockSVG() + `<span class="lock-letter">${LOCK_LETTERS[unlockedCount]}</span>`;
    item.classList.add('unlocked');

    const flash = document.createElement('div');
    flash.className = 'unlock-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 800);

    for (let i = 0; i < 10; i++) setTimeout(() => spawnHeart(), i * 65);

    unlockedCount++;
    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.textContent = `${unlockedCount} / 6 descifrados`;
    }

    // When all locks are unlocked, show completion message instead of auto-opening letter
    if (unlockedCount === 6) {
        setTimeout(() => {
            typeMessage("🎉 ¡LO LOGRASTE! Todos los candados están abiertos. Ahora puedes abrir el cofre para ver lo que guarda... 💕");

            // Show the open chest button
            const openBtn = document.getElementById('btn-open-chest');
            if (openBtn) {
                openBtn.style.display = 'block';
            }
        }, 1000);
    }
}

// ================================================================
//  HEARTS
// ================================================================
function spawnHeart(x, y) {
    const h = document.createElement('div');
    h.className = 'heart-particle';
    h.textContent = ['💕', '🌸', '✨', '💖', '🌺'][Math.random() * 5 | 0];
    h.style.left = (x ?? Math.random() * window.innerWidth) + 'px';
    h.style.top = (y ?? Math.random() * window.innerHeight) + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1700);
}

// ================================================================
//  TYPING
// ================================================================
function typeMessage(msg) {
    if (typingTimeout) clearTimeout(typingTimeout);
    const el = document.getElementById('typing-text');
    el.textContent = '';
    let i = 0;
    function next() {
        if (i < msg.length) {
            el.textContent += msg[i++];
            typingTimeout = setTimeout(next, 25 + Math.random() * 18);
        }
    }
    next();
}

function startMessageRotation() {
    const shuffled = [...GUARDIAN_MESSAGES].sort(() => Math.random() - .5);
    let idx = 0;
    typeMessage(shuffled[idx]);
    setInterval(() => { idx = (idx + 1) % shuffled.length; typeMessage(shuffled[idx]); }, 6200);
}

// ================================================================
//  DATE VALIDATION
// ================================================================
function validateDate(input) {
    const nums = input.match(/\d+/g);
    if (!nums || nums.length < 3) return false;
    const n = nums.map(Number);
    return n.includes(18) && n.includes(12) && (n.includes(2022) || n.includes(22));
}

// ================================================================
//  SUBMIT
// ================================================================
function submitCode() {
    const inp = document.getElementById('code-input');
    const val = inp.value.trim().toLowerCase();
    if (!val) return;

    let matchedIdx = null;
    for (let i = 0; i < CODES.length; i++) {
        if (usedCodes.has(i)) continue;

        // Special handling for date code (index 3)
        const isDateCode = i === 3;
        const ok = isDateCode ? validateDate(val) : checkCode(val, i);

        if (ok) { matchedIdx = i; break; }
    }

    const alreadyUsed = [...usedCodes].some(i => {
        const isDateCode = i === 3;
        return isDateCode ? validateDate(val) : checkCode(val, i);
    });

    if (matchedIdx !== null) {
        usedCodes.add(matchedIdx);
        inp.value = '';
        inp.classList.add('correct');
        setTimeout(() => inp.classList.remove('correct'), 1000);
        const remaining = 6 - unlockedCount - 1;
        const okMsgs = [
            "¡Sí! ¡Lo sabía! ¡Eres increíble! 💕",
            "✨ ¡Correcto! El cofre cede ante ti...",
            "Purr~ ¡Eso es! ¡Sigue así, amor! 🐾",
            "¡Maravilloso! Otro candado se rinde ante ti 🌸",
            remaining > 0 ? `¡Impresionante! Aún faltan ${remaining} más ✨` : "¡El último! ¡Lo lograste! 💕",
        ];
        typeMessage(okMsgs[Math.random() * okMsgs.length | 0]);
        unlockNext();
    } else if (alreadyUsed) {
        inp.classList.add('shake');
        setTimeout(() => inp.classList.remove('shake'), 600);
        typeMessage("Ya abriste ese candado~ Busca el siguiente código 😸");
        inp.value = '';
    } else {
        inp.classList.add('shake');
        setTimeout(() => inp.classList.remove('shake'), 600);
        const wrongMsgs = [
            "Hmm... eso no suena bien. Piensa un poco más 🤔",
            "No, no, no... pero sigue intentando 💭",
            "Ese no es el código... hay pistas en mis palabras.",
            "Mmm... el cofre no reacciona. Inténtalo de otra forma.",
            "Nel~ Pero no te rindas, ¡estás cerca! 🐱",
            "Enferma 👻",
        ];
        typeMessage(wrongMsgs[Math.random() * wrongMsgs.length | 0]);
        inp.value = '';
    }
}

document.getElementById('code-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitCode();
});

// ================================================================
//  MODAL
// ================================================================
function toggleModal() {
    document.getElementById('modal-overlay').classList.toggle('visible');
}
function closeModalOutside(e) {
    if (e.target === document.getElementById('modal-overlay')) toggleModal();
}

// ================================================================
//  FIREWORKS
// ================================================================
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');
let fwActive = false, fwParticles = [];
function resizeFW() { fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight; }
resizeFW(); window.addEventListener('resize', resizeFW);

function launchFirework(x, y) {
    const cols = ['#f4c4d8', '#fce4ef', '#d8b4e8', '#ffb3d1', '#f5d9a8', '#e8a0bb', '#b8e8d8', '#ffd4e8'];
    for (let i = 0; i < 68; i++) {
        const a = (i / 68) * Math.PI * 2, sp = 3 + Math.random() * 5.5;
        fwParticles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: .012 + Math.random() * .013, color: cols[Math.random() * cols.length | 0], size: 2 + Math.random() * 3.5 });
    }
}
function animFW() {
    if (!fwActive) return;
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    fwParticles = fwParticles.filter(p => p.life > 0);
    fwParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.07; p.vx *= 0.99; p.life -= p.decay;
        fwCtx.save(); fwCtx.globalAlpha = p.life; fwCtx.fillStyle = p.color;
        fwCtx.shadowBlur = 8; fwCtx.shadowColor = p.color;
        fwCtx.beginPath(); fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2); fwCtx.fill();
        fwCtx.restore();
    });
    requestAnimationFrame(animFW);
}
function startFireworks() {
    fwActive = true; animFW();
    let n = 0;
    const t = setInterval(() => {
        launchFirework(100 + Math.random() * (window.innerWidth - 200), 80 + Math.random() * (window.innerHeight - 280));
        if (++n >= 20) clearInterval(t);
    }, 270);
}

// ================================================================
//  FINAL LETTER
// ================================================================
window.showFinalLetter = function () {
    startFireworks();
    for (let i = 0; i < 35; i++) {
        setTimeout(() => spawnHeart(Math.random() * window.innerWidth, Math.random() * window.innerHeight), i * 85);
    }
    setTimeout(() => {
        document.getElementById('letter-screen').classList.add('visible');
        document.getElementById('letter-body').innerHTML = `
      <p><strong>¡Lo lograste!</strong> Si estás leyendo esto es porque descifraste cada uno de mis acertijos y, como buen "ingeniero" que intenta ser romántico, no encontré mejor forma de esconder mis sentimientos que detrás de este baúl.</p>
      
      <p>Mi amor, hoy es 14 de febrero y no te voy a mentir: <em>me duele</em>. Me duele hasta el alma no poder estar ahí contigo, hoy es de esas fechas en que la distancia se siente mucho más ya que nuestras redes sociales se inundan de gente que sí puede estar junta, mientras que a nosotros solo nos queda imaginar cómo sería si lo estuviéramos. Odio, odio no poder darte un abrazo de esos que nos quitan el frío o simplemente verte reír por alguna tontería que dije. Es feo pasar estas fechas así, sintiendo que el destino se empeñó en llevarse mis ganas de todo al alejarte de mi lado. A veces me quedo pensando en aquel <em>15 de agosto</em>, cuando te me fuiste y sentí que una parte de mí se quedaba vacía en tu habitación.</p>
      
      <p>Pero, aunque la distancia sea una porquería, quiero que sepas algo: <strong>le ganamos</strong>. Le ganamos cada vez que nos quedamos hablando hasta tarde, cada vez que recordamos ese primer "Pero inviten" o en cada recuerdo que vivimos juntos, ya que vivir de los recuerdos me da la fortaleza para poder seguir resistiendo y que algún día espero no muy lejano podamos decir que vencimos a la distancia de nuevo...</p>
      
      <p>Eres mi fresa favorita, la que me acompaña al estadio aunque no entienda nada y la lenta a la que ya no le quiero lavar más los vidrios (mentira, por ti lo hago mil veces). Eres la razón por la que este intento de ingeniero se puso a tirar código como loco para crearte un rinconcito que fuera solo de los dos.</p>
      
      <p>Y antes de cualquier palabra linda hay una disculpa que quiero pedirte, y es que el motivo principal que me orilló a hacer esta web es la falta de dinero. Te quiero pedir disculpas porque como te he mencionado no cuento con mucho dinero y el oso y ese pequeño ramo de flores combinados con esta página es para lo único que me alcanzó. <em>De verdad lo siento</em>, quisiera darte el mundo entero pero ahora mismo no puedo... De verdad mil disculpas y créeme que voy a hacer todo lo posible para que en un futuro me sea posible darte más de lo que te puedo ofrecer ahora, solo sé que te amo y me apena decirte estas palabras, entonces espero que al menos te guste y lo sepas apreciar...</p>
      
      <p>Años atrás le renegaba al cielo y a Dios todo lo que me pasaba hasta que te conocí... Me enseñaste a ver el lado bueno de todo, así eres tú y es lo que más amo de ti... Eres tanto que amarte es lo de menos en verdad, y la verdad no sé por qué hago estas cosas por ti, pero sé que no las haría por nadie más. <strong>Te elijo hoy y te elegiría mil veces</strong>, me va a faltar vida para amarte ya que esta no es ni será suficiente.</p>
      
      <p>No sé qué nos depare el futuro, pero lo que sí sé es que eres mi primer y último "Te amo" de verdad. Gracias por aceptar ser mi novia, voy a amarte hasta que no queden más estrellas en el cielo, hasta que el sol se apague y la luna no vuelva a salir. Te amaré hasta que el mar se seque y el tiempo se detenga, solo tú puedes compararte con la inmensidad del cosmos, porque eres incluso más maravillosa que él.</p>
      
      <p>Pronto estaremos juntos de nuevo mi amor y ya no habrá pantallas de por medio. Mientras tanto, guarda este cofre en tu corazón, así como yo te guardo en el mío cada segundo ¿sí?</p>
      
      <p><strong>Feliz San Valentín, amor de mi vida.</strong> Te amo más de lo que me quiero a mí mismo, nunca lo dudes.</p>
      
      <p style="text-align: right; margin-top: 30px;">
        <em>Con todo mi corazón,</em><br>
        <strong>Tu Andy.</strong> 💕
      </p>
    `;
    }, 900);
};

// ================================================================
//  WELCOME SCREEN INITIALIZATION
// ================================================================
(function initWelcomeScreen() {
    const welcomeBg = document.getElementById('welcome-bg');
    const welcomeHearts = document.getElementById('welcome-hearts');

    // Create floating background particles
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'welcome-particle';
        const size = Math.random() * 6 + 3;
        const colors = ['#f4c4d8', '#d8b4e8', '#fce4ef', '#e8a0bb', '#b8e8d8'];
        p.style.cssText = `
      width:${size}px;
      height:${size}px;
      background:${colors[Math.random() * colors.length | 0]};
      left:${Math.random() * 100}%;
      bottom:0;
      animation-duration:${8 + Math.random() * 12}s;
      animation-delay:${Math.random() * 5}s;
      opacity:${0.3 + Math.random() * 0.4};
    `;
        welcomeBg.appendChild(p);
    }

    // Create floating hearts
    for (let i = 0; i < 15; i++) {
        const h = document.createElement('div');
        h.className = 'welcome-heart';
        h.textContent = ['💕', '🌸', '✨', '💖', '🌺'][Math.random() * 5 | 0];
        h.style.cssText = `
      left:${Math.random() * 100}%;
      bottom:0;
      animation-duration:${10 + Math.random() * 15}s;
      animation-delay:${Math.random() * 8}s;
    `;
        welcomeHearts.appendChild(h);
    }
})();

// Enter vault function with curtain animation
window.enterVault = function () {
    const welcomeScreen = document.getElementById('welcome-screen');
    const curtainLeft = document.getElementById('curtain-left');
    const curtainRight = document.getElementById('curtain-right');
    const btn = document.querySelector('.btn-enter');
    const vaultSection = document.querySelector('.vault-section');

    if (!welcomeScreen || !curtainLeft || !curtainRight || !btn) {
        console.error('Missing vault elements');
        return;
    }

    // Disable button to prevent multiple clicks
    btn.style.pointerEvents = 'none';

    // Get vault section dimensions for sparkle positioning
    const vaultRect = vaultSection ? vaultSection.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 };
    const centerX = vaultRect.width / 2;
    const centerY = vaultRect.height / 2;

    // Create sparkle burst effect
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-burst';
            sparkle.textContent = ['✨', '💫', '⭐'][Math.random() * 3 | 0];
            const angle = (i / 20) * Math.PI * 2;
            const distance = 100;
            sparkle.style.left = (centerX + Math.cos(angle) * distance) + 'px';
            sparkle.style.top = (centerY + Math.sin(angle) * distance) + 'px';

            // Append to vault section instead of body
            if (vaultSection) {
                vaultSection.appendChild(sparkle);
            } else {
                document.body.appendChild(sparkle);
            }
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 30);
    }

    // Play curtain animation
    setTimeout(() => {
        curtainLeft.classList.add('open');
        curtainRight.classList.add('open');
    }, 400);

    // Fade out welcome screen
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
    }, 600);

    // Remove curtains after animation
    setTimeout(() => {
        curtainLeft.remove();
        curtainRight.remove();
        welcomeScreen.remove();
    }, 2200);
};

// ================================================================
//  INIT VAULT - Main initialization function
// ================================================================
export function initVault() {
    buildLocks();
    startMessageRotation();
    setInterval(() => { if (Math.random() < .28) spawnHeart(Math.random() * window.innerWidth, window.innerHeight - 30); }, 3200);

    // Setup modal handlers
    setupModalHandlers();

    // Setup code input handlers
    setupCodeInputHandlers();
}

// Setup modal handlers
function setupModalHandlers() {
    // Modal handlers are already set via onclick in HTML
    // Just ensure the functions are available globally
}

// Setup code input handlers
function setupCodeInputHandlers() {
    const codeInput = document.getElementById('code-input');
    const submitBtn = document.querySelector('.btn-submit');

    if (submitBtn) {
        submitBtn.addEventListener('click', submitCode);
    }

    if (codeInput) {
        codeInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') submitCode();
        });
    }
}

// Modal functions - must be on window for onclick to work
window.toggleModal = function () {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.toggle('visible');
    }
};

window.closeModalOutside = function (e) {
    const modalOverlay = document.getElementById('modal-overlay');
    if (e.target === modalOverlay) {
        window.toggleModal();
    }
};

// Close letter function
window.closeLetter = function () {
    const letterScreen = document.getElementById('letter-screen');
    if (letterScreen) {
        letterScreen.classList.remove('visible');
    }
};

// Scroll letter up
window.scrollLetterUp = function () {
    const letterBody = document.getElementById('letter-body');
    console.log('Scroll Up clicked, letterBody:', letterBody);
    if (letterBody) {
        console.log('Current scrollTop:', letterBody.scrollTop);
        letterBody.scrollBy({
            top: -150, // Increased from -100px for faster scrolling
            behavior: 'smooth'
        });
        setTimeout(() => console.log('New scrollTop:', letterBody.scrollTop), 300);
    }
};

// Scroll letter down
window.scrollLetterDown = function () {
    const letterBody = document.getElementById('letter-body');
    console.log('Scroll Down clicked, letterBody:', letterBody);
    if (letterBody) {
        console.log('Current scrollTop:', letterBody.scrollTop, 'scrollHeight:', letterBody.scrollHeight);
        letterBody.scrollBy({
            top: 150, // Increased from 100px for faster scrolling
            behavior: 'smooth'
        });
        setTimeout(() => console.log('New scrollTop:', letterBody.scrollTop), 300);
    }
};

// ================================================================
//  COPO EASTER EGG - BATTERY LEVEL
// ================================================================

function initCopoEasterEgg() {
    const catSvg = document.getElementById('cat-svg');

    if (!catSvg) {
        console.log('🐱 Sky (cat-svg) not found');
        return;
    }

    console.log('🐱 Copo easter egg initialized - Click on Sky!');

    catSvg.style.cursor = 'pointer';

    catSvg.addEventListener('click', () => {
        checkCopoBattery();
    });
}

function checkCopoBattery() {
    console.log('🐱 Checking battery for Copo...');

    // Check if Battery API is supported
    if (!navigator.getBattery) {
        console.log('⚠️ Battery API not supported');
        showCopoFallbackMessage();
        return;
    }

    navigator.getBattery().then(battery => {
        const batteryPercent = Math.floor(battery.level * 100);
        const isCharging = battery.charging;

        console.log(`🔋 Battery: ${batteryPercent}% | Charging: ${isCharging}`);

        // Perfect range: 35% - 40%
        if (batteryPercent >= 50 && batteryPercent <= 100) {
            console.log('✅ COPO FOUND! Battery in perfect range');

            // Check if this is first time seeing the hint
            const hasSeenCopoHint = localStorage.getItem('copoHintSeen');

            if (!hasSeenCopoHint) {
                // First time - show hint and mark as seen
                localStorage.setItem('copoHintSeen', 'true');
                showCopoSuccess(batteryPercent);
            } else {
                // Already saw hint - remind about album
                showCopoAlreadyFoundMessage();
            }
        } else if (batteryPercent > 40) {
            console.log('❌ Battery too high');
            showCopoBatteryTooHigh(batteryPercent);
        } else {
            console.log('❌ Battery too low');
            showCopoBatteryTooLow(batteryPercent);
        }
    }).catch(error => {
        console.error('Battery API error:', error);
        showCopoFallbackMessage();
    });
}

function showCopoBatteryTooHigh(percent) {
    typeMessage(`🔋 Miau... Tu batería está demasiado llena (${percent}%). Descárgala un poco más...🐱`);
}

function showCopoBatteryTooLow(percent) {
    typeMessage(`🔋 Miau... Tu batería está muy baja (${percent}%).🐱`);
}

function showCopoAlreadyFoundMessage() {
    typeMessage(`🐱 Ya tienes la pista, si no lo descifras ve al album.`);
}

function showCopoFallbackMessage() {
    typeMessage(`🐱 Miau... Parece que no puedo leer tu batería. Intenta desde una laptop con Chrome o Firefox. 💻`);
}

function showCopoSuccess(percent) {
    // Allows multiple activations - no localStorage restriction

    // Create large cat emoji
    const copoEmoji = document.createElement('div');
    copoEmoji.className = 'copo-reveal';
    copoEmoji.innerHTML = '🐱';
    copoEmoji.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 10rem;
        cursor: pointer;
        z-index: 10001;
        filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.9));
        animation: copoAppear 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    `;

    document.body.appendChild(copoEmoji);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes copoAppear {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 0;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(360deg);
                opacity: 1;
            }
        }
        .copo-reveal:hover {
            transform: translate(-50%, -50%) scale(1.1) !important;
            filter: drop-shadow(0 0 40px rgba(255, 215, 0, 1)) !important;
        }
    `;
    document.head.appendChild(style);

    // Click to reveal message
    copoEmoji.addEventListener('click', () => {
        copoEmoji.remove();
        showCopoModal(percent);
    });

    // Auto-remove after 10 seconds if not clicked
    setTimeout(() => {
        if (document.body.contains(copoEmoji)) {
            copoEmoji.remove();
            showCopoModal(percent);
        }
    }, 10000);
}

function showCopoModal(percent) {
    const modal = document.createElement('div');
    modal.className = 'copo-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(15px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        opacity: 0;
        transition: opacity 0.4s ease;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a0a22 0%, #2d1b3d 50%, #1a0a22 100%);
            border: 2px solid rgba(255, 215, 0, 0.6);
            border-radius: 25px;
            padding: 50px 40px;
            max-width: 550px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 60px rgba(255, 215, 0, 0.4);
            position: relative;
        ">
            <h2 style="
                font-family: 'Cinzel Decorative', serif;
                font-size: clamp(1.5rem, 4vw, 2rem);
                color: #f6c4dc;
                margin-bottom: 25px;
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            ">🐱 Vaya otra pista mas...</h2>
            
            <div style="
                width: 120px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ffd700, transparent);
                margin: 25px auto;
            "></div>
            
            <p style="
                font-family: 'Crimson Pro', serif;
                font-size: clamp(1rem, 2.2vw, 1.15rem);
                line-height: 1.9;
                color: #e8a0bb;
                font-style: italic;
                margin: 25px 0;
                padding: 20px;
                background: rgba(255, 215, 0, 0.05);
                border-radius: 15px;
                border: 1px solid rgba(255, 215, 0, 0.2);
            ">
                "Te estaras preguntando cual es la respuesta o quien...<br>
                No hay mucho para decir,<br>
                solo que tienes que recordar a mis gatos."<br><br>
                <strong style="color: #ffd700;">Batería: ${percent}% ⚡</strong>
            </p>
            
            <div style="
                width: 120px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ffd700, transparent);
                margin: 25px auto;
            "></div>
            
            <p style="
                font-size: clamp(1.1rem, 2.5vw, 1.3rem);
                color: #f6c4dc;
                margin-bottom: 20px;
            ">Dudo mucho que la saques la verdad </p>
            
            <p style="
                font-size: clamp(0.9rem, 2vw, 1rem);
                color: #e8a0bb;
                margin-top: 25px;
                opacity: 0.8;
            ">🔐 Código del cofre: <strong style="color: #ffd700; font-size: 1.3em;">gato</strong></p>
            
            <button onclick="this.closest('.copo-modal').remove()" style="
                margin-top: 30px;
                padding: 14px 35px;
                background: linear-gradient(135deg, #d4789a, #e8a0bb);
                color: white;
                border: none;
                border-radius: 50px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 30px rgba(255, 215, 0, 0.5)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(255, 215, 0, 0.3)'">
                Un grande 🐾
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
}

// Initialize Copo easter egg when vault loads
document.addEventListener('DOMContentLoaded', () => {
    initCopoEasterEgg();
});

// Reset function for testing
window.resetCopoEgg = function () {
    localStorage.removeItem('copoHintSeen');
    console.log('🔄 Copo easter egg reset! Next activation will show hint again.');
};