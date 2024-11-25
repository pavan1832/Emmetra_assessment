// Variables
const captchaElement = document.getElementById('captcha');
const captchaInput = document.getElementById('captcha-input');
const captchaSubmit = document.getElementById('captcha-submit');
const captchaResult = document.getElementById('captcha-result');
const clockElement = document.getElementById('clock');
const clockTypeSelect = document.getElementById('clock-type');
const step2Button = document.getElementById('step-2-button');

// Function to generate a random math captcha
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 + num2;
    captchaElement.innerHTML = `${num1} + ${num2} = ?`;
    return result;
}

// Track the correct answer to the captcha
let correctAnswer = generateCaptcha();

// Update the clock based on user input (Analog/Digital)
function updateClock(type) {
    const now = new Date();
    let timeString = '';
    
    if (type === 'digital') {
        timeString = now.toLocaleTimeString();
        document.getElementById('digital-clock').innerHTML = timeString;
        document.getElementById('analog-clock').style.display = 'none';
        document.getElementById('digital-clock').style.display = 'block';
    } else if (type === 'analog') {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Analog Clock Logic
        const hourDegree = (hours % 12) * 30 + (minutes / 2);
        const minuteDegree = minutes * 6;
        const secondDegree = seconds * 6;

        document.getElementById('hour-hand').style.transform = `translateX(-50%) rotate(${hourDegree}deg)`;
        document.getElementById('minute-hand').style.transform = `translateX(-50%) rotate(${minuteDegree}deg)`;
        document.getElementById('second-hand').style.transform = `translateX(-50%) rotate(${secondDegree}deg)`;

        document.getElementById('digital-clock').style.display = 'none';
        document.getElementById('analog-clock').style.display = 'block';
    }
}

// Event listener for captcha submission
captchaSubmit.addEventListener('click', () => {
    const userAnswer = parseInt(captchaInput.value);

    if (userAnswer === correctAnswer) {
        captchaResult.innerHTML = 'Captcha solved! Now choose clock type.';
        captchaInput.disabled = true;
        captchaSubmit.disabled = true;
        clockTypeSelect.disabled = false;  // Enable clock type dropdown after solving captcha
    } else {
        captchaResult.innerHTML = 'Incorrect answer. Try again.';
    }
});

// Event listener for clock type selection
clockTypeSelect.addEventListener('change', () => {
    const selectedType = clockTypeSelect.value;
    updateClock(selectedType);

    // Enable "Step 2" button once the user selects a clock type and CAPTCHA is solved
    if (captchaInput.disabled) {
        step2Button.disabled = false; // Enable Step 2 button only if CAPTCHA is solved
    }
});

// Initialize the clock with the default setting
updateClock('analog');  // Default is analog clock

// Disable the clock type selection until captcha is solved
clockTypeSelect.disabled = true;

// Set interval to update clock every second
setInterval(() => {
    const selectedType = clockTypeSelect.value;
    updateClock(selectedType);
}, 1000);

step2Button.addEventListener('click', () => {
    window.location.href = 'step2.html'; // Change 'step2.html' to the name of your target page
});
