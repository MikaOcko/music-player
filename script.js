// ---------- Imports ----------

// ---------- Variables/elements ----------
// Get elements from the DOM
const progressBar =  document.getElementById('duration-slider');
const audio = document.getElementById('audio');
const btnPlay = document.getElementById('btnPlay');
const btnRev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const cover = document.querySelector('.cover img');
const trackTitle = document.querySelector('.track-title');
const artistName = document.querySelector('.artist-name');

const slider = document.querySelector('.slider');
const thumb = document.querySelector('.slider-thumb');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const fullTime = document.querySelector('.fullTime');
const volumeSlider = document.querySelector('.volume-slider .slider');
const volumeProgress = document.querySelector('.volume-slider .progress');
const volumeIcon = document.querySelector('.volume-icon');

// Global variables
let trackPlaying = false; // is the track playing
let volumeMuted = false; // is the volume muted
let trackId = 0; //which track is currently loaded (based on numerical id)

// Data
const tracks = [
    "Japones",
    "You and Me"
];

const artists = [
    "TheRAC29",
    "JEKK"
];

const covers = [
    "cover1",
    "cover2"
];

// ---------- Functions/logic ----------
// Duration range
audio.onloadeddata = function() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
};

if (audio.play()) {
    setInterval(() => {
        progressBar.value = audio.currentTime;
    }, 500);
};

progressBar.onchange = function() {
    audio.play();
    audio.currentTime = progressBar.value;
    btnPlay.classList.add("fa-pause");
    btnPlay.classList.remove("fa-play");
};

// Play / Pause button
function playPause() {
    if(btnPlay.classList.contains("fa-pause")) {
        audio.pause();
        btnPlay.classList.add("fa-play");
        btnPlay.classList.remove("fa-pause");
    } else {
        audio.play();
        btnPlay.classList.add("fa-pause");
        btnPlay.classList.remove("fa-play");
    };
};