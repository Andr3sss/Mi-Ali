export function initAlbum() {
    const cards = document.querySelectorAll('.photo-card');
    const container = document.querySelector('.album-container');
    const resetButton = document.querySelector('.btn-reset-album');

    // Config: Initial random rotation limits
    const maxRot = 8;
    const minRot = -8;

    // 1. Initialize Stack (Random Rotations)
    function stackCards() {
        cards.forEach((card, index) => {
            // Remove swiped class
            card.classList.remove('swiped');

            // Random rotation
            const rot = Math.floor(Math.random() * (maxRot - minRot + 1)) + minRot;

            // Z-index: Last in HTML is top (or reverse depending on logic).
            // Let's assume standard DOM order: last one is on top visibly if positioned absolutely? 
            // Actually, usually later DOM elements are on top.
            // We want the TOP card to be interactable.

            // Let's modify z-index so the LAST element in the list is the TOP one.
            card.style.zIndex = index;
            card.style.transform = `rotate(${rot}deg)`;

            // Reset opacity just in case
            card.style.opacity = '1';
        });
    }

    stackCards(); // Immediate run

    // 2. Click/Swipe Logic
    // Simplified: Just keep a list of active cards. The last one is the top.

    // Convert NodeList to Array
    const allCards = Array.from(cards);

    // We assume the order in DOM is Bottom -> Top visually (due to default stacking contexts or z-indexes we set)
    // We set z-indexes to 0, 1, 2, 3...
    // So the last element in array is the top one.

    allCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling just in case

            // Check if this card is currently the one visually on top
            // i.e., is it the last one that hasn't been swiped yet?

            const remainingCards = allCards.filter(c => !c.classList.contains('swiped'));

            if (remainingCards.length === 0) return;

            // The card with the highest original z-index (which matches our index logic) is the top one.
            // Since we never change z-index, we can just check if this card is the last one in the remaining list.
            const topCard = remainingCards[remainingCards.length - 1];

            if (card === topCard) {
                console.log("Swiping top card");
                swipeCard(card);
            } else {
                console.log("Not top card");
            }
        });
    });

    function swipeCard(card) {
        // Random direction
        const direction = Math.random() > 0.5 ? 1 : -1;
        const rotate = Math.random() * 20 + 10;

        // We need to apply !important via class or style to override the hover/init styles
        card.style.transform = `translateX(${direction * 150}%) rotate(${direction * rotate}deg)`;
        card.style.opacity = '0';
        card.classList.add('swiped');
    }

    // 3. Reset
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            console.log("Resetting album");
            stackCards();
        });
    }
}

// ================================================================
//  PHOTO 8 DOWNLOAD FUNCTION (COPO EASTER EGG)
// ================================================================

window.downloadPhoto8 = function () {
    console.log('📥 Downloading Photo 8 and instructions...');

    // 1. Download the image
    const imageLink = document.createElement('a');
    imageLink.href = 'fotos/gatooosss.jpg';
    imageLink.download = 'gatooooosss.jpg';
    document.body.appendChild(imageLink);
    imageLink.click();
    document.body.removeChild(imageLink);

    // 2. Create and download instructions text file
    const instructions = `🐱 INSTRUCCIONES PARA ENCONTRAR EL CODIGO SECRETO 🐱

Esta imagen contiene un mensaje oculto en su metadata EXIF.

CÓMO VER EL MENSAJE:

Sepa, buena suerte 👍
`;

    const blob = new Blob([instructions], { type: 'text/plain' });
    const textLink = document.createElement('a');
    textLink.href = URL.createObjectURL(blob);
    textLink.download = 'SAPA.txt';
    document.body.appendChild(textLink);

    // Delay second download slightly
    setTimeout(() => {
        textLink.click();
        document.body.removeChild(textLink);
        URL.revokeObjectURL(textLink.href);
    }, 500);

    console.log('✅ Downloads initiated!');
};
