const typingText = document.querySelector('.typing-text p');
const timeEl = document.querySelector('.time span b');
const mistakesEl = document.querySelector('.mistake span');
const wpmEl = document.querySelector('.wpm span');
const cpmEl = document.querySelector('.cpm span');
const btnTryAgain = document.querySelector('#try-again');
const instructions = document.querySelector('.instructions p');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

// Improved paragraph array with more diverse content
const paragraphs = [
    "Joy and peace filled the morning air, as nature awakened with vibrant color and life everywhere.",
    "The mountains stood tall and silent, cloaked in the mystery of the morning mist.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.",
    "Artificial intelligence is transforming how we interact with technology in our daily lives.",
    "The sun rose gently over the quiet hills, casting golden light on the dew-kissed grass below.",
    "Birds chirped cheerfully in the distance, welcoming the promise of a brand new day ahead.",
    "Learning to type quickly and accurately is an essential skill in today's digital world.",
    "The best way to predict the future is to create it. Take control of your destiny.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

function loadParagraph() {
    // Show loading animation
    typingText.innerHTML = '<div class="loading"></div>';
    instructions.textContent = 'Start typing to begin the test';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        typingText.innerHTML = '';
        
        // Split paragraph into characters and create spans
        paragraphs[randomIndex].split('').forEach(char => {
            typingText.innerHTML += `<span>${char}</span>`;
        });
        
        // Add active class to first character
        typingText.querySelectorAll('span')[0].classList.add('active');
    }, 500);
}

function initTyping(e) {
    const characters = typingText.querySelectorAll('span');
    
    // Check if the pressed key is a printable character or backspace
    if (e.key === 'Backspace' && charIndex > 0) {
        charIndex--;
        // Reduce mistakes count if the character was incorrect
        if (characters[charIndex].classList.contains('incorrect')) {
            mistakes--;
            mistakesEl.innerText = mistakes;
        }
        characters[charIndex].classList.remove('correct', 'incorrect');
    } else if (isPrintableKey(e.key) && charIndex < characters.length) {
        // Start timer on first keypress
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
            instructions.textContent = 'Keep typing...';
        }
        
        // Check if typed character matches the expected character
        if (e.key === characters[charIndex].innerText) {
            characters[charIndex].classList.add('correct');
        } else {
            mistakes++;
            mistakesEl.innerText = mistakes;
            characters[charIndex].classList.add('incorrect');
        }
        charIndex++;
        
        // Calculate WPM and CPM
        const timeElapsed = (maxTime - timeLeft) / 60 || 0.01; // Avoid division by zero
        const wpmValue = Math.round(((charIndex - mistakes) / 5) / timeElapsed);
        const cpmValue = charIndex - mistakes;
        
        wpmEl.innerText = wpmValue;
        cpmEl.innerText = cpmValue;
    }
    
    // Remove active class from all characters
    characters.forEach(span => span.classList.remove('active'));
    
    // Add active class to current character if not at the end
    if (charIndex < characters.length) {
        characters[charIndex].classList.add('active');
    } else {
        // End game if paragraph is completed
        clearInterval(timer);
        showCompletionMessage();
    }
}

// Helper function to check if a key is printable
function isPrintableKey(key) {
    return key.length === 1 && !key.match(/[^\x20-\x7E]/);
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeEl.innerText = timeLeft;
        
        // Change color when time is running low
        if (timeLeft <= 10) {
            timeEl.parentElement.style.color = '#ef4444';
        }
    } else {
        clearInterval(timer);
        // Show game over message
        showTimeUpMessage();
    }
}

function reset() {
    // Reset all variables and UI
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    timeEl.innerText = timeLeft;
    timeEl.parentElement.style.color = '';
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    wpmEl.innerText = 0;
    cpmEl.innerText = 0;
    mistakesEl.innerText = 0;
    
    // Add animation to button
    btnTryAgain.classList.add('clicked');
    setTimeout(() => btnTryAgain.classList.remove('clicked'), 300);
}

function showCompletionMessage() {
    typingText.innerHTML = `
        <div class="completion-message">
            <h3>Great job! 🎉</h3>
            <p>You completed the paragraph with ${mistakes} mistakes.</p>
            <p>Your typing speed: <strong>${wpmEl.innerText} WPM</strong></p>
        </div>
    `;
    instructions.textContent = 'Press "Try Again" to start a new test';
}

function showTimeUpMessage() {
    typingText.innerHTML = `
        <div class="completion-message">
            <h3>Time's up! ⏱️</h3>
            <p>You made ${mistakes} mistakes.</p>
            <p>Your typing speed: <strong>${wpmEl.innerText} WPM</strong></p>
        </div>
    `;
    instructions.textContent = 'Press "Try Again" to start a new test';
}

// Add event listeners
document.addEventListener('keydown', initTyping);
btnTryAgain.addEventListener('click', reset);

// Initialize the game
loadParagraph();