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
const fullTime = document.querySelector('.fulltime');
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
    // Reset display time
    setTime(time, 0);
    //Set the timeline slider to the beginning
    progressBar.value = 0;
    // Re-load the audio track
    audio.load();
    // Set the track title
    trackTitle.innerHTML = tracks[trackId];
    // Set the artist name
    artistName.innerHTML = artists[trackId];
    // Set the cover image
    cover.src = 'assets/images/' + covers[trackId] + ".jpg";

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

// Format the time in mm:ss format (the most audio and video players use)
function setTime(output, input) {
    // Calculate minutes from input
    const minutes = Math.floor(input / 60);
    // Calculate seconds from input
    const seconds = Math.floor(input % 60);

    // If the seconds are < 10
    if(seconds < 10) {
        //add a zero before the first number
        output.innerHTML = minutes + ":0" + seconds;
    } else {
        // Output th time without a zero
        output.innerHTML = minutes + ":" + seconds;
    };
};

// Output the audio track duration
setTime(fullTime, audio.duration);

// When the time changes on the audio tracks
audio.addEventListener('timeupdate', () => {
    // Get the current audio time
    const currentTime = audio.currentTime;
    // Get the audio duration
    const duration = audio.duration;

    // Met à jour le curseur de la barre de progression
    progressBar.value = currentTime;

    // Met à jour l'affichage du temps actuel
    setTime(time, currentTime);

    // Met à jour la durée totale (au cas où elle n'était pas encore dispo)
    if (!isNaN(duration)) {
        setTime(fullTime, duration);
        progressBar.max = duration;
    }
});

// Interactive progress bar time track
function seekingTime() {
    // Output the audio current time
    setTime(time, progressBar.value);
    // Set audio current time to progress bar value
    audio.currentTime = progressBar.value;
};
// Call function initially
seekingTime();
// Repeat th function when the slider is selected
progressBar.addEventListener('input', seekingTime);

// Volume slider current value
let value = volumeSlider.value;
// Interactive progress bar volume
function seekingVolume() {
    // Set the audio volume to the current value
    audio.volume = volumeSlider.value / 100;
    // Change icons
    // If the volume is high
    if (audio.volume > 0.5) {
        volumeIcon.innerHTML = 
            `<i class="fa-solid fa-volume-high"></i>`
        ;
    // If the volume is null
    } else if (audio.volume === 0) {
        volumeIcon.innerHTML = 
            `<i class="fa-solid fa-volume-off"></i>`
        ;
        volumeMuted = true;
    // If the volume is low
    } else {
        volumeIcon.innerHTML = 
            `<i class="fa-solid fa-volume-low"></i>`
        ;
    }
};
// Call function initially
seekingVolume();
// Repeat th function when the slider is selected
volumeSlider.addEventListener('input', seekingVolume);

// Add click event to the volume button
volumeIcon.addEventListener('click', () => {
    // if the volume is not muted
    if (volumeMuted === false) {
        volumeIcon.innerHTML = 
            `<i class="fa-solid fa-volume-off"></i>`
        ;
        // Mute the audio
        audio.volume = 0;
        // Set the volume slider to zero
        volumeSlider.value = audio.volume;
        // Set the volumeMuted to true because the volume is now muted
        volumeMuted = true;
    } else {
        volumeIcon.innerHTML = 
            `<i class="fa-solid fa-volume-low"></i>`
        ;
        audio.volume = 0.4;
        volumeSlider.value = audio.volume * 100;
        volumeMuted = false;
    };
});