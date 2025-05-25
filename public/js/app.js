// Constants
const MIN_BET = 50000;
const MAX_BET = 200000;
const HOUSE_EDGE = 0.05; // 5% edge pentru house
const USER_WIN_CHANCE = 0.48; // 48% șansă de câștig pentru utilizator

// Global variables
let tokenBalance = 1000000; // Starting balance for demo purposes

document.addEventListener('DOMContentLoaded', () => {
    // Elemente DOM
    const userBetInput = document.getElementById('userBet');
    const jokerMatchDisplay = document.getElementById('jokerMatch');
    const rollButton = document.getElementById('rollButton');
    const resultPopup = document.getElementById('resultPopup');
    const winVideo = document.getElementById('winVideo');
    const loseVideo = document.getElementById('loseVideo');
    const closePopup = document.querySelector('.close-popup');
    const backgroundVideo = document.getElementById('backgroundVideo');

    // Actualizează miza Jokerului când utilizatorul introduce o sumă
    userBetInput.addEventListener('input', () => {
        const bet = parseInt(userBetInput.value) || 0;
        if (bet >= 50000 && bet <= 200000) {
            jokerMatchDisplay.textContent = bet;
            rollButton.disabled = false;
        } else {
            jokerMatchDisplay.textContent = '0';
            rollButton.disabled = true;
        }
    });

    // Funcție pentru rularea jocului
    rollButton.addEventListener('click', () => {
        const bet = parseInt(userBetInput.value);
        if (bet < 50000 || bet > 200000) return;

        // Activează video-ul de fundal
        backgroundVideo.classList.add('active');
        backgroundVideo.play();

        // Simulează rezultatul (50% șansă de câștig)
        const isWin = Math.random() < 0.5;
        
        // Adaugă un delay de 3 secunde înainte de a afișa rezultatul
        setTimeout(() => {
            showResult(isWin);
        }, 3000);
    });

    // Funcție pentru afișarea rezultatului
    function showResult(isWin) {
        resultPopup.style.display = 'block';
        if (isWin) {
            winVideo.style.display = 'block';
            loseVideo.style.display = 'none';
            // Adaugă un delay de 1.5 secunde înainte de a porni video-ul
            setTimeout(() => {
                winVideo.play();
            }, 1500);
        } else {
            winVideo.style.display = 'none';
            loseVideo.style.display = 'block';
            // Adaugă un delay de 1.5 secunde înainte de a porni video-ul
            setTimeout(() => {
                loseVideo.play();
            }, 1500);
        }
    }

    // Închide popup-ul
    closePopup.addEventListener('click', () => {
        resultPopup.style.display = 'none';
        winVideo.pause();
        loseVideo.pause();
        winVideo.currentTime = 0;
        loseVideo.currentTime = 0;
        backgroundVideo.pause();
        backgroundVideo.currentTime = 0;
        backgroundVideo.classList.remove('active');
    });

    // Închide popup-ul când se face click în afara conținutului
    resultPopup.addEventListener('click', (e) => {
        if (e.target === resultPopup) {
            resultPopup.style.display = 'none';
            winVideo.pause();
            loseVideo.pause();
            winVideo.currentTime = 0;
            loseVideo.currentTime = 0;
            backgroundVideo.pause();
            backgroundVideo.currentTime = 0;
            backgroundVideo.classList.remove('active');
        }
    });

    // Repornește video-ul când se termină
    winVideo.addEventListener('ended', () => {
        winVideo.currentTime = 0;
        winVideo.play();
    });

    loseVideo.addEventListener('ended', () => {
        loseVideo.currentTime = 0;
        loseVideo.play();
    });
}); 