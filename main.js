// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "Last Christmas",
	artist: "WHAM!",
	image: "https://audiophileparadise.files.wordpress.com/2013/11/tumblr_lcz1xeqdbv1qbgvpz.jpg",
	path: "https://archive.org/details/wham-last-christmas_202101/WHAM+(Last+Christmas)+(1080p).mp4"
},
{
	name: "Jingle Bell Rock",
	artist: "Glee",
	image: "https://img.discogs.com/dkhkjjxZzlFd6447NcHlIl57rwU=/fit-in/500x471/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6425366-1418910353-2812.jpeg.jpg",
	path: "https://jesusful.com/glee-jingle-bell-rock-mp3-lyrics/"
},
{
	name: "Rockin' Around the Christmas Tree",
	artist: "Brenda Lee",
	image: "https://i.scdn.co/image/ab67616d0000b2735b4254ac6d85739eec7f989a",
	path: "https://archive.org/details/RockingAroundTheChristmasTree-BrendaLee",
},
{
	name: "It's Beginning to Look a Lot like Christmas",
	artist: "Michael Buble",
	image: "https://1.bp.blogspot.com/-XbX5BxSaQ58/U-t3t-d0a3I/AAAAAAAAKBo/NccMHy3pTZM/s1600/It's%2Bbeginning%2Bto%2Blook%2Ba%2Blot%2Blike%2BChristmas_printable.jpg",
	path: "https://it-s-beginning-to-look-a-lot-like-christmas.mp3juices.bet/",
},
{
	name: "All I Want for Christmas is You",
	artist: "Mariah Carey",
	image: "https://images.genius.com/3dc2cc21e3417d54425129a3c4793fd9.615x615x1.jpg",
	path: "https://archive.org/details/mariahcareyalliwantforchristmasisyou_201912",
},
];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }

    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
// Load the first track in the tracklist
loadTrack(track_index);
                    