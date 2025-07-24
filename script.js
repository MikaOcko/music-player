// ---------- Imports ----------

// ---------- Variables/elements ----------
// Get elements from the DOM
const progressBar =  document.getElementById('duration-slider');
const audio = document.getElementById('audio');
const btnPlay = document.getElementById('btnPlay');
const btnPrev = document.getElementById('btnPrev');
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

// ------> To fix error : 
/* Console error : setTime is not defined (line : 133, 131, 141)

console.log(fullTime, audio.duration);
 - fullTime = null
 - audio.duration = NaN

Ajout de l'attibut "max"
à l'input de type range "duration-slider" = OK = 136.90482 ms +/- 2.28 min
Durée de la chanson "Japones" = 2 minutes 17 secondes
*/
function setTime(currentTime, duration) {
    document.querySelector(".time").textContent = formatTime(currentTime);
    document.querySelector(".fulltime").textContent = formatTime(duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

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

// Switching tracks function
function switchTrack() {
    // if the audio is plyaing
    if (trackPlaying === true) {
        // keep playing the audio
        audio.play();
    };
};

// Get the track source
const trackSrc = 'assets/audio/' + tracks[trackId] + ".mp3"; //dynamiccaly select track from the tracks arrays, using trackId as an array index

//load track information
function loadTrack() {
    // set the audio track source
    audio.src = 'assets/audio/' + tracks[trackId] + ".mp3";
    // Re-load the audio track
    audio.load();
    // Set the track title
    trackTitle.innerHTML = tracks[trackId];
    // Set the artist name
    artistName.innerHTML = artists[trackId];
    // Set the cover image
   cover.src = 'assets/images/' + covers[trackId] + ".jpg";

//    //Set the timeline slider to the beginning
//    progress.style.width = 0;
//    thumb.style.left = 0;

    // Wait for the audio data to load
    audio.addEventListener('loadeddata', () => {
        // Display the duration of the audio file
        setTime(fullTime, audio.duration);
        //Set max value to duration slider
        // progressBar.max = audio.duration;
        progressBar.setAttribute("max", audio.duration);
    });
};

// Initially load the track
loadTrack();

// Set click event to previous button
btnPrev.addEventListener('click', () => {
    // decrement track id
    trackId --;
    // if the track id goes below 0
    if (trackId < 0) {
        // Go to the last track
        trackId = tracks.length - 1;
    };
    // load the track
    loadTrack();
    // Run the switchTrak function
    switchTrack();
});

// Set click event to next button
btnNext.addEventListener('click', nextTrack);

// Next track function
function nextTrack() {
    // Increment track ID
    trackId ++;
    if (trackId > tracks.length - 1) {
        // Go to the first track
        trackId = 0;
    }
    // load the track
    loadTrack();
    // Run the switchTrak function
    switchTrack();
};

// When the audio ends, switch to the next track
audio.addEventListener('ended', nextTrack);