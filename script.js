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
// // Duration range
// audio.onloadeddata = function() {
//     progressBar.max = audio.duration;
//     progressBar.value = audio.currentTime;
// };

// if (audio.play()) {
//     setInterval(() => {
//         progressBar.value = audio.currentTime;
//     }, 500);
// };

// progressBar.onchange = function() {
//     audio.play();
//     audio.currentTime = progressBar.value;
//     btnPlay.classList.add("fa-pause");
//     btnPlay.classList.remove("fa-play");
// };

// // Play / Pause button
// function playPause() {
//     if(btnPlay.classList.contains("fa-pause")) {
//         audio.pause();
//         btnPlay.classList.add("fa-play");
//         btnPlay.classList.remove("fa-pause");
//     } else {
//         audio.play();
//         btnPlay.classList.add("fa-pause");
//         btnPlay.classList.remove("fa-play");
//     };
// };

// Add a click event ont the play button
btnPlay.addEventListener('click', playTrack);

// Play track function
function playTrack() {
    if(trackPlaying === false) {
        // Play the audio
        audio.play();
        // Add a pause icon inside the button (& remove the play icon)
        btnPlay.classList.add("fa-pause");
        btnPlay.classList.remove("fa-play");
        //Set the trackPlaying to true, because the track is now playing
        trackPlaying = true;
    } else {
        // Pause the audio
        audio.pause();
        // Add a play icon inside the button (& remove the pause icon)
        btnPlay.classList.add("fa-play");
        btnPlay.classList.remove("fa-pause");
        //Set the trackPlaying to false, because the track is now pause again
        trackPlaying = false;
    };
};