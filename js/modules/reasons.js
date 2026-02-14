// ================================================================
//  100 REASONS WHY I LOVE YOU
//  Special birthday message on March 13
// ================================================================

const reasons = [
    "Tu sonrisa ilumina mis días más oscuros",
    "La forma en que me miras me hace sentir especial",
    "Tus abrazos son mi lugar favorito en el mundo",
    "Me haces reír incluso cuando no quiero",
    "Eres mi mejor amiga y mi amor",
    "Tu voz es mi canción favorita",
    "Siempre sabes cómo hacerme sentir mejor",
    "Eres increíblemente inteligente",
    "Tu bondad inspira a todos a tu alrededor",
    "Me apoyas en todo lo que hago",

    "Tus ojos cuentan historias que amo descubrir",
    "Eres fuerte incluso cuando no te sientes así",
    "Tu risa es contagiosa",
    "Me haces querer ser mejor persona",
    "Eres hermosa por dentro y por fuera",
    "Compartes tus sueños conmigo",
    "Me escuchas cuando más lo necesito",
    "Eres paciente conmigo",
    "Tu creatividad me asombra",
    "Haces que cada día sea una aventura",

    "Eres mi persona favorita para hablar",
    "Me haces sentir amado incondicionalmente",
    "Tu determinación es admirable",
    "Eres genuina y auténtica",
    "Me haces sentir en casa",
    "Tus abrazos curan cualquier mal día",
    "Eres mi inspiración",
    "Compartes mi sentido del humor",
    "Eres comprensiva",
    "Me haces sentir seguro",

    "Tu pasión por la vida es contagiosa",
    "Eres mi confidente",
    "Me haces querer soñar más grande",
    "Eres cariñosa",
    "Tu presencia me calma",
    "Eres mi compañera de aventuras",
    "Me haces sentir importante",
    "Eres generosa con tu amor",
    "Tu energía positiva me levanta",
    "Eres mi motivación",

    "Me haces sentir completo",
    "Eres mi mejor decisión",
    "Tu ternura me derrite",
    "Eres mi refugio",
    "Me haces creer en el amor verdadero",
    "Eres mi felicidad",
    "Tu apoyo incondicional",
    "Eres mi sueño hecho realidad",
    "Me haces sentir valioso",
    "Eres mi todo",

    "Tu forma de ver el mundo me fascina",
    "Eres mi paz en medio del caos",
    "Me haces sentir afortunado",
    "Eres mi razón para sonreír",
    "Tu amor me transforma",
    "Eres mi compañera perfecta",
    "Me haces sentir vivo",
    "Eres mi luz en la oscuridad",
    "Tu amor me hace fuerte",
    "Eres mi destino",

    "Me haces sentir único",
    "Eres mi alegría",
    "Tu amor es mi tesoro",
    "Eres mi corazón",
    "Me haces sentir amado cada día",
    "Eres mi razón de ser",
    "Tu amor es mi fuerza",
    "Eres mi alma gemela",
    "Me haces sentir completo",
    "Eres mi para siempre",

    "Tu amor me hace mejor",
    "Eres mi esperanza",
    "Me haces sentir especial cada día",
    "Eres mi sueño",
    "Tu amor es mi refugio",
    "Eres mi vida",
    "Me haces sentir en las nubes",
    "Eres mi ángel",
    "Tu amor es mi guía",
    "Eres mi universo",

    "Me haces sentir invencible",
    "Eres mi estrella",
    "Tu amor es mi hogar",
    "Eres mi tesoro",
    "Me haces sentir mariposas",
    "Eres mi luna",
    "Tu amor es mi ancla",
    "Eres mi sol",
    "Me haces sentir en el paraíso",
    "Eres mi cielo",

    "Tu amor es mi oxígeno",
    "Eres mi razón",
    "Me haces sentir eterno",
    "Eres mi milagro",
    "Tu amor es mi magia",
    "Eres mi bendición",
    "Me haces sentir completo",
    "Eres mi amor verdadero",
    "Tu amor es mi eternidad",
    "Porque simplemente eres TÚ 💕"
];

const icons = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🌹', '✨', '⭐'];

export function initReasons() {
    console.log('💕 Initializing 100 Reasons...');

    // Check if today is March 13 (birthday)
    checkBirthday();

    // Generate cards
    generateReasonCards();
}

function checkBirthday() {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed, so March = 2
    const day = today.getDate();

    if (month === 2 && day === 13) {
        console.log('🎂 IT\'S HER BIRTHDAY!');
        showBirthdayMessage();
    }
}

function showBirthdayMessage() {
    const banner = document.getElementById('birthday-banner');
    if (banner) {
        banner.style.display = 'block';

        // Create birthday modal
        setTimeout(() => {
            createBirthdayModal();
        }, 1000);
    }
}

function createBirthdayModal() {
    const modal = document.createElement('div');
    modal.className = 'birthday-modal';
    modal.innerHTML = `
        <div class="birthday-modal-content">
            <div class="birthday-confetti">🎉🎊🎈🎂🎁</div>
            <h2 class="birthday-modal-title">¡Feliz Cumpleaños Mi Amor! 🎂</h2>
            <p class="birthday-modal-text">
                Hoy celebramos el día en que llegaste a este mundo para hacerlo más hermoso.
                <br><br>
                Cada día a tu lado es un regalo, pero hoy es especial porque es TU día.
                <br><br>
                Gracias por existir, por amarme, por ser mi todo.
                <br><br>
                Que este nuevo año de vida esté lleno de amor, risas, sueños cumplidos
                y momentos inolvidables juntos.
                <br><br>
                Te amo más de lo que las palabras pueden expresar 💕
                <br><br>
                <strong>¡Felices 13 de Marzo!</strong> 🌹✨
            </p>
            <button class="birthday-modal-btn" onclick="this.parentElement.parentElement.remove()">
                💕 Gracias Mi Amor 💕
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
}

function generateReasonCards() {
    const grid = document.getElementById('reasons-grid');
    if (!grid) return;

    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.setAttribute('data-reason', index + 1);

        const randomIcon = icons[Math.floor(Math.random() * icons.length)];

        card.innerHTML = `
            <div class="card-front">
                <div class="card-number">${index + 1}</div>
                <div class="card-icon">${randomIcon}</div>
            </div>
            <div class="card-back">
                <p class="card-reason">${reason}</p>
            </div>
        `;

        // Add click event to flip
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        grid.appendChild(card);
    });

    console.log(`✅ Generated ${reasons.length} reason cards`);
}

// Add birthday modal styles
const style = document.createElement('style');
style.textContent = `
    .birthday-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .birthday-modal-content {
        background: linear-gradient(135deg, #fff 0%, #ffe4e9 100%);
        padding: 50px;
        border-radius: 30px;
        max-width: 600px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(255, 107, 157, 0.5);
        animation: birthdayBounce 0.6s ease-out;
    }
    
    @keyframes birthdayBounce {
        0% { transform: scale(0); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .birthday-confetti {
        font-size: 3rem;
        margin-bottom: 20px;
        animation: confettiShake 0.5s ease infinite;
    }
    
    @keyframes confettiShake {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
    }
    
    .birthday-modal-title {
        font-family: var(--font-title);
        font-size: 2.5rem;
        color: #d4789a;
        margin-bottom: 20px;
    }
    
    .birthday-modal-text {
        font-family: var(--font-body);
        font-size: 1.1rem;
        line-height: 1.8;
        color: #6b4654;
        margin-bottom: 30px;
    }
    
    .birthday-modal-btn {
        background: linear-gradient(135deg, #ff6b9d 0%, #ffa8c5 100%);
        color: white;
        border: none;
        padding: 15px 40px;
        font-size: 1.2rem;
        border-radius: 50px;
        cursor: pointer;
        transition: transform 0.3s ease;
        font-weight: bold;
    }
    
    .birthday-modal-btn:hover {
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        .birthday-modal-content {
            padding: 30px;
            margin: 20px;
        }
        
        .birthday-modal-title {
            font-size: 2rem;
        }
        
        .birthday-modal-text {
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(style);
