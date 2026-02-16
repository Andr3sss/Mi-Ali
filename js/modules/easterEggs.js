// ================================================================
//  EASTER EGGS MODULE - STRAWBERRY QUEST
// ================================================================

const strawberryQuest = {
    sequence: [],
    correctOrder: [1, 2, 3],
    discovered: new Set(),
    completed: false
};

// Initialize secret strawberries
export function initEasterEggs() {
    const strawberries = document.querySelectorAll('.secret-strawberry');

    console.log('🍓 Easter Eggs initialized:', strawberries.length, 'strawberries found');

    strawberries.forEach(strawberry => {
        strawberry.addEventListener('mouseenter', () => {
            const order = parseInt(strawberry.dataset.order);

            console.log('🍓 Strawberry hovered:', order, 'Current sequence:', strawberryQuest.sequence);

            // Add to sequence
            strawberryQuest.sequence.push(order);
            strawberryQuest.discovered.add(order);

            // Mark as discovered
            strawberry.classList.add('discovered');

            // Only keep last 3 in sequence
            if (strawberryQuest.sequence.length > 3) {
                strawberryQuest.sequence.shift();
            }

            console.log('🍓 Updated sequence:', strawberryQuest.sequence);

            // Show visual feedback
            createSequenceIndicator();

            // Check if sequence is correct
            checkStrawberrySequence();

            // Save progress (only discovered strawberries, not completion)
            saveStrawberryProgress();
        });
    });

    // Load previous progress
    loadStrawberryProgress();

    // Initialize Messi Ball
    initMessiBall();
}

// Check if sequence is correct
function checkStrawberrySequence() {
    const isCorrect = JSON.stringify(strawberryQuest.sequence) ===
        JSON.stringify(strawberryQuest.correctOrder);

    console.log('🍓 Checking sequence:', strawberryQuest.sequence, 'Correct?', isCorrect);

    if (isCorrect && !strawberryQuest.completed) {
        console.log('✅ CORRECT SEQUENCE! Revealing clue...');
        strawberryQuest.completed = true;
        revealMusicClue();
    } else if (isCorrect && strawberryQuest.completed) {
        console.log('🔄 Sequence already completed, showing modal again...');
        // Allow showing modal again if user wants to see it
        showClueModal();
    }
}

// Reveal clue about music.js
function revealMusicClue() {
    // Create confetti effect
    createConfetti();

    // Show modal after brief delay
    setTimeout(() => {
        showClueModal();
    }, 1000);

    // Save completion (but allow re-triggering)
    saveStrawberryProgress();
}

// Create confetti animation
function createConfetti() {
    const colors = ['#ff69b4', '#ffc0cb', '#ff1493', '#db7093', '#ffb6c1'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: ${Math.random() * 0.5 + 0.5};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
            z-index: 10000;
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Show clue modal
function showClueModal() {
    // Remove existing modal if any
    const existingModal = document.querySelector('.clue-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'clue-modal';
    modal.innerHTML = `
        <div class="clue-content">
            <h2 class="clue-title">✨ Patrón Descubierto ✨</h2>
            <p class="clue-hint">Has encontrado el patrón: <strong>1-0-1</strong></p>
            <div class="clue-divider"></div>
            <p class="clue-riddle">
                🎵 <em>"Memoriza muy bien este numero porque presiento que lo vas a necesitar para una inspeccion mas profunda...<br>
                Busca donde las notas se escriben,<br>
                No en lo que suena, sino en lo que se lee."</em> 🎵
            </p>
            <div class="clue-divider"></div>
            <p class="clue-tip">💡 Pista: Los desarrolladores saben dónde mirar, sobre todo para depurar codigo en la consola, busca en los archivos javascript.</p>
            <button class="clue-btn" onclick="this.closest('.clue-modal').remove()">
                Continuar la búsqueda
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => modal.classList.add('visible'), 10);
}

// Create visual sequence indicator
function createSequenceIndicator() {
    // Remove existing indicator
    const existing = document.getElementById('sequence-indicator');
    if (existing) existing.remove();

    const indicator = document.createElement('div');
    indicator.id = 'sequence-indicator';
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(26, 10, 34, 0.95);
        border: 2px solid rgba(212, 120, 154, 0.5);
        border-radius: 15px;
        padding: 15px 20px;
        color: var(--rose-light);
        font-family: 'Outfit', sans-serif;
        font-size: 0.9rem;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(212, 120, 154, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const sequence = strawberryQuest.sequence.map(n => n).join(' → ') || '...';
    indicator.innerHTML = `
        <div style="margin-bottom: 5px; font-weight: 600;">🍓 Secuencia:</div>
        <div style="font-size: 1.1rem; color: var(--rose-glow);">${sequence}</div>
        <div style="margin-top: 5px; font-size: 0.8rem; opacity: 0.7;">Objetivo: 1 → 2 → 3</div>
    `;

    document.body.appendChild(indicator);
    setTimeout(() => indicator.style.opacity = '1', 10);

    // Auto-hide after 3 seconds
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => indicator.remove(), 300);
    }, 3000);
}

// Add reset function for testing (accessible via console)
window.resetStrawberryQuest = function () {
    strawberryQuest.sequence = [];
    strawberryQuest.discovered = new Set();
    strawberryQuest.completed = false;
    localStorage.removeItem('strawberryQuest');

    // Remove discovered class from all strawberries
    document.querySelectorAll('.secret-strawberry').forEach(s => {
        s.classList.remove('discovered');
    });

    console.log('🔄 Strawberry quest reset! Try again.');
};

// Save progress
function saveStrawberryProgress() {
    localStorage.setItem('strawberryQuest', JSON.stringify({
        discovered: Array.from(strawberryQuest.discovered),
        completed: strawberryQuest.completed
    }));
}

// Load progress
function loadStrawberryProgress() {
    const saved = localStorage.getItem('strawberryQuest');
    if (saved) {
        const data = JSON.parse(saved);
        strawberryQuest.discovered = new Set(data.discovered);
        strawberryQuest.completed = data.completed;

        // Mark strawberries as discovered
        data.discovered.forEach(order => {
            const strawberry = document.querySelector(`[data-order="${order}"]`);
            if (strawberry) strawberry.classList.add('discovered');
        });
    }
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            transform: translateY(0) rotate(720deg);
        }
    }
`;
document.head.appendChild(style);

// ================================================================
//  MESSI BALL EASTER EGG - 18/12/2022
// ================================================================

const messiBallQuest = {
    clicks: 0,
    required: 5,
    completed: false
};

function initMessiBall() {
    const messiBall = document.getElementById('messi-ball');

    if (!messiBall) {
        console.log('⚽ Messi ball not found');
        return;
    }

    console.log('⚽ Messi ball initialized');

    messiBall.setAttribute('data-clicks', '0');

    messiBall.addEventListener('click', () => {
        messiBallQuest.clicks++;

        console.log(`⚽ Ball clicked: ${messiBallQuest.clicks}/${messiBallQuest.required}`);

        // Update counter display
        messiBall.setAttribute('data-clicks', messiBallQuest.clicks);
        messiBall.classList.add('show-counter');

        // Add click animation
        messiBall.classList.add('clicked');
        setTimeout(() => messiBall.classList.remove('clicked'), 300);

        // Check if 5 clicks reached
        if (messiBallQuest.clicks >= messiBallQuest.required) {
            checkMessiTime();
            messiBallQuest.clicks = 0; // Reset
            messiBall.setAttribute('data-clicks', '0');
            messiBall.classList.remove('show-counter');
        }
    });

    // Load saved progress
    const saved = localStorage.getItem('messiBallCompleted');
    if (saved === 'true') {
        messiBallQuest.completed = true;
    }
}

function checkMessiTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    console.log(`⚽ Checking time: ${hours}:${minutes}`);

    // Check if between 18:00 and 18:15
    if (hours === 21 && minutes >= 37 && minutes <= 39) {
        console.log('✅ MAGIC HOUR! Revealing Messi clue...');
        showMessiClue();
    } else {
        console.log('❌ Not the magic hour, showing busy message...');
        showMessiBusyMessage();
    }
}

function showMessiClue() {
    // Create Argentina confetti
    createArgentinaConfetti();

    setTimeout(() => {
        const modal = document.createElement('div');
        modal.className = 'clue-modal';
        modal.innerHTML = `
            <div class="clue-content">
                <h2 class="clue-title">🏆 SI ANDO VIVO ES GRACIAS A ESE DIA 🏆</h2>
                <div class="clue-divider"></div>
                <p class="clue-hint"><strong>mesi</strong></p>
                <p class="clue-riddle">
                    El día más feliz de mi vida...<br>
                    (Sí Fonte definitivamente, Messi >>>>>>> TU 🥱🥱🥱)
                </p>
                <div class="clue-divider"></div>
                <p class="clue-tip">🔐 Código del cofre: El dia mas feliz de mi vida</p>
                <button class="clue-btn" onclick="this.closest('.clue-modal').remove()">
                    ¡t amo! 
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('visible'), 10);

        // Save completion
        localStorage.setItem('messiBallCompleted', 'true');
        messiBallQuest.completed = true;
    }, 1000);
}

function showMessiBusyMessage() {
    const modal = document.createElement('div');
    modal.className = 'clue-modal';
    modal.innerHTML = `
        <div class="clue-content">
            <h2 class="clue-title">⚽ El mejor de la historia está ocupao</h2>
            <div class="clue-divider"></div>
            <p class="clue-riddle">
                Vuelve entre las <strong>21:25 a 21:40</strong><br>
                (Mucho ojo, que cada minuto cuenta y si se te pasa vas a tener que esperar hasta mañana por otro intento 🤣🫵)
            </p>
            <div class="clue-divider"></div>
            <p class="clue-tip">💡 Pista: No hay pista, definitivamente no me amas si no la sacas 👍</p>
            <button class="clue-btn" onclick="this.closest('.clue-modal').remove()">
                Adios...
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
}

function createArgentinaConfetti() {
    const colors = ['#74ACDF', '#FFFFFF', '#74ACDF', '#FFFFFF', '#FFD700']; // Argentina colors + gold

    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 12px;
            height: 12px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: ${Math.random() * 0.6 + 0.4};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
            z-index: 10000;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Reset function for testing
window.resetMessiBall = function () {
    messiBallQuest.clicks = 0;
    messiBallQuest.completed = false;
    localStorage.removeItem('messiBallCompleted');

    const ball = document.getElementById('messi-ball');
    if (ball) {
        ball.setAttribute('data-clicks', '0');
        ball.classList.remove('show-counter');
    }

    console.log('⚽ Messi ball reset!');
};
