// Get references to elements
const captchaElement = document.getElementById('captcha');
const captchaInput = document.getElementById('captcha-input');
const captchaSubmit = document.getElementById('captcha-submit');
const captchaResult = document.getElementById('captcha-result');
const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');
const clockElement = document.getElementById('analog-clock');

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

// When the user clicks the captcha submit button
captchaSubmit.addEventListener('click', () => {
    const userAnswer = parseInt(captchaInput.value);

    if (userAnswer === correctAnswer) {
        captchaResult.innerHTML = 'Captcha solved! Now you can upload an image.';
        captchaInput.disabled = true;
        captchaSubmit.disabled = true;
        imageUpload.disabled = false; // Enable image upload after captcha
    } else {
        captchaResult.innerHTML = 'Incorrect answer. Try again.';
    }
});

// Handle image upload
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Display the uploaded image as the background of the clock
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block'; // Show the uploaded image
            clockElement.style.backgroundImage = `url(${e.target.result})`;
            clockElement.style.backgroundSize = 'cover'; // Make sure the image covers the entire clock
        };
        reader.readAsDataURL(file);
    }
});

// Update the clock hands every second
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12; // 12-hour format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate the rotation of each hand
    const hourDeg = (360 / 12) * hours + (360 / 12) * (minutes / 60);
    const minuteDeg = (360 / 60) * minutes;
    const secondDeg = (360 / 60) * seconds;

    // Update the hands with the calculated rotation
    document.getElementById('hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('second-hand').style.transform = `rotate(${secondDeg}deg)`;

    // Call the function every second
    setTimeout(updateClock, 1000);
}

// Update clock hands when the page loads
updateClock();
