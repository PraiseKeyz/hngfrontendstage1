// Convert RGB to Hex
function rgbToHex(rgb) {
    let rgbArray = rgb.match(/\d+/g);  // Extract the RGB values from the string
    let r = parseInt(rgbArray[0]);
    let g = parseInt(rgbArray[1]);
    let b = parseInt(rgbArray[2]);
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

const colors = [ 
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#008000" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Purple", hex: "#800080" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Gray", hex: "#808080" },
    { name: "Lime", hex: "#00FF00" }
];

let targetColor;
const colorBox = document.querySelector('[data-testid="colorBox"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
// const scoreDisplay = document.querySelector('[data-testid="score"]');
const scoreDisplay = document.getElementById('score');
const cancel = document.getElementById('cancel-popup');
const popupMessage = document.getElementById('popup-message');
let score = 0;

// Function to shuffle colors and ensure the target color is in the options
function getNewGameState() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];  // Get a random target color
    colorBox.style.backgroundColor = targetColor.hex;  // Set the target color in the color box

    let shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 6);

    // Ensure target color is included in the options
    if (!shuffledColors.some(color => color.hex === targetColor.hex)) {
        shuffledColors[0] = targetColor;
    }

    // Update the color options buttons
    const buttons = document.querySelectorAll('[data-testid="colorOption"]');
    buttons.forEach((button, index) => {
        button.style.backgroundColor = shuffledColors[index].hex;
    });
}
function handlePopupMessage() {
    popupMessage.style.display = 'block';
}
// Function to handle color click events
function handleColorClick(e) {
    const clickedButtonColor = rgbToHex(e.target.style.backgroundColor);  // Convert RGB to hex

    if (clickedButtonColor === targetColor.hex) {
        score += 1;
        gameStatus.textContent = 'Correct!';
    } else {
        gameStatus.textContent = '';
        handlePopupMessage();
    }

    scoreDisplay.textContent = `${score}`;

    // Reset the game after a guess
    setTimeout(() => {
        getNewGameState();  // Generate a new game state
    }, 100);
}

// Initialize the game state
getNewGameState();  // Start the game with a new target color and options

// Add event listeners to the color option buttons
document.querySelectorAll('[data-testid="colorOption"]').forEach(button => {
    button.addEventListener('click', handleColorClick);
});

document.querySelector('[data-testid="newGameButton"]').addEventListener('click', () => {
    gameStatus.textContent = '';
    score = 0;
    getNewGameState();
    scoreDisplay.textContent = `${score}`;  
})
 cancel.addEventListener('click', () => {
    popupMessage.style.display = 'none';
    score = 0;
    getNewGameState();
    scoreDisplay.textContent = `${score}`;  
 });