// Configuration
const NAME_PARTS = {
    first: ["Zakajen", "Oblačen", "Zadimljen", "Travnati", "Vutra", "Oljasti", "Zeleni", "Chill", "Maglen", "Pohit"],
    second: ["Blaž", "Zadetex", "Šitlist", "Kefir", "Džointman", "Kif", "Bobnar", "Jointovski", "Ošpice", "420"],
    adjectives: ["Extreme", "Mega", "Ultra", "Super", "Hyper"]
};

const EMOJI_REACTIONS = {
    good: ["🔥", "🌟", "🎉", "💚", "✨"],
    bad: ["🤮", "💩", "👎", "😵", "🚫"]
};

const MAX_HISTORY = 10;
let history = JSON.parse(localStorage.getItem('420history')) || [];
const tracks = [
    'travator/src/TistaTrava.mp3',
    'travator/src/HoplaKonopla.mp3'
];

// DOM Elements
const elements = {
    goBtn: document.getElementById('go'),
    loading: document.getElementById('loading'),
    res1: document.getElementById('res1'),
    res2: document.getElementById('res2'),
    nameInput: document.getElementById('inputName'),
    experienceSelect: document.getElementById('experienceLevel'),
    reactions: document.getElementById('reactions'),
    historyList: document.getElementById('historyList'),
    music: document.getElementById('backgroundMusic'),
    musicToggle: document.getElementById('musicToggle'),
    mascot: document.querySelector('.mascot')
};

// Event Listeners
elements.goBtn.addEventListener('click', generateName);
elements.nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateName();
});
elements.mascot.addEventListener('click', doABarrelRoll);

// Music Controls
let isMusicPlaying = false;
elements.musicToggle.addEventListener('click', toggleMusic);
document.body.addEventListener('click', enableAudio, { once: true });

// Initialize
createFloatingLeaves();
document.addEventListener('mousemove', handleParallax);
document.addEventListener('DOMContentLoaded', initHistory);
elements.music.addEventListener('ended', playRandomTrack);

// Main Functions
function generateName() {
    const name = elements.nameInput.value.trim();
    const experience = elements.experienceSelect.value;
    
    toggleUIState(true);
    createConfetti();

    setTimeout(() => {
        handleNameCheck(name, experience);
        toggleUIState(false);
        playSound(experience === 'infinite' ? 'bad' : 'good');
    }, 2000);
}

function handleNameCheck(name, experience) {
    const forbiddenNames = /niki|niko|niku/i;
    
    if (forbiddenNames.test(name)) {
        showResult("Propad, Niki is beltincef, propat. Neč imena zate.", "");
        addEmojiReactions('bad');
    } else if (!name) {
        showResult("Propad, tok zadet da niti imena več ne more vpisat. beeeet", "");
        addEmojiReactions('bad');
    } else {
        const generatedName = generateRandomName(experience);
        showResult(`Yo, vutra brat ${name}! Tvoje 420 ime je:`, generatedName);
        updateHistory(generatedName);
        addEmojiReactions(experience === 'infinite' ? 'bad' : 'good');
        createConfetti();
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Returns a random element from the given array.
 * @param {Array} arr - the array to select from
 * @returns {any} a random element from the array
 */
/******  f532f9a2-1bd1-4451-9398-2ec3292db46f  *******/    }
}

// Helper Functions
function toggleUIState(loading) {
    elements.goBtn.style.display = loading ? 'none' : 'block';
    elements.loading.style.display = loading ? 'block' : 'none';
}

function generateRandomName(experience) {
    let first = getRandomItem(NAME_PARTS.first);
    let second = getRandomItem(NAME_PARTS.second);
    
    if (experience === '420' || experience === 'infinite') {
        const adjective = getRandomItem(NAME_PARTS.adjectives);
        return `${adjective} ${first} ${second}`;
    }
    return `${first} ${second}`;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function showResult(text1, text2) {
    elements.res1.textContent = text1;
    elements.res2.textContent = text2;
}

// History Functions
function initHistory() {
    history.forEach(name => updateHistory(name, false));
}

function updateHistory(name, saveToStorage = true) {
    const entry = document.createElement('div');
    entry.className = 'history-item';
    entry.textContent = name;
    
    entry.onclick = () => {
        elements.res2.textContent = name;
        elements.res1.textContent = "Prejšnja izbira:";
        elements.res2.style.animation = 'pulse 1s';
        setTimeout(() => elements.res2.style.animation = '', 1000);
    };

    elements.historyList.insertBefore(entry, elements.historyList.firstChild);
    if (elements.historyList.children.length > MAX_HISTORY) {
        elements.historyList.removeChild(elements.historyList.lastChild);
    }

    if (saveToStorage) {
        history = [name, ...history].slice(0, MAX_HISTORY);
        localStorage.setItem('420history', JSON.stringify(history));
    }
}

// Music Functions
function toggleMusic() {
    if (isMusicPlaying) {
        elements.music.pause();
        elements.musicToggle.textContent = '🎵';
    } else {
        playRandomTrack();
        elements.musicToggle.textContent = '🎶';
    }
    isMusicPlaying = !isMusicPlaying;
}

function playRandomTrack() {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    elements.music.src = randomTrack;
    elements.music.play().catch(() => {
        alert('Za predvajanje glasbe najprej klikni kjer koli na strani');
    });
}

function enableAudio() {
    if (elements.music.paused) {
        elements.music.play().then(() => {
            elements.music.pause();
            elements.music.currentTime = 0;
        });
    }
}

// Visual Effects
function createFloatingLeaves() {
    const leaves = ["🌿", "🍃", "🍀", "🌱", "🎍"];
    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.className = 'floating-leaf';
        leaf.textContent = getRandomItem(leaves);
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.animationDuration = Math.random() * 3 + 5 + 's';
        document.body.appendChild(leaf);
        setTimeout(() => leaf.remove(), 8000);
    }, 1000);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 1 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function addEmojiReactions(type = 'good') {
    elements.reactions.innerHTML = EMOJI_REACTIONS[type]
        .map(emoji => `<span class="emoji-bubble">${emoji}</span>`)
        .join('');
}

function doABarrelRoll() {
    document.body.style.transition = 'transform 1s';
    document.body.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        document.body.style.transform = 'rotate(0deg)';
    }, 1000);
}

function handleParallax(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    document.body.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
}

// Sound Effects
function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    gainNode.gain.value = 0.1;
    
    if (type === 'good') {
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
    } else {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    }

    oscillator.start();
    setTimeout(() => oscillator.stop(), 500);
}