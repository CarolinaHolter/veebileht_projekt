//Javascripti kood on kopeeritud järgmiselt lehelt: https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
//HTML-lehe elementide määramine muutujatele
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

// Globaalsete kasutatavate väärtuste määramine
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Audio element playeri jaoks
let curr_track = document.createElement('audio');

// Esitatavate lugude loend
let track_list = [
{
	name: "Last Christmas",
	artist: "WHAM!",
	image: "https://audiophileparadise.files.wordpress.com/2013/11/tumblr_lcz1xeqdbv1qbgvpz.jpg",
	path: "file:///C:/Users/holterca/Downloads/Wham!%20-%20Last%20Christmas%20(Official%20Video).mp3"
},
{
	name: "Jingle Bell Rock",
	artist: "Glee",
	image: "https://img.discogs.com/dkhkjjxZzlFd6447NcHlIl57rwU=/fit-in/500x471/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6425366-1418910353-2812.jpeg.jpg",
	path: "file:///C:/Users/holterca/Downloads/Glee%20Cast%20-%20Jingle%20Bell%20Rock%20(Lyrics).mp3"
},
{
	name: "Rockin' Around the Christmas Tree",
	artist: "Brenda Lee",
	image: "https://i.scdn.co/image/ab67616d0000b2735b4254ac6d85739eec7f989a",
	path: "file:///C:/Users/holterca/Downloads/Brenda%20Lee%20-%20Rockin'%20Around%20The%20Christmas%20Tree%20(Official%20Lyric%20Video).mp3",
},
{
	name: "It's Beginning to Look a Lot like Christmas",
	artist: "Michael Buble",
	image: "https://1.bp.blogspot.com/-XbX5BxSaQ58/U-t3t-d0a3I/AAAAAAAAKBo/NccMHy3pTZM/s1600/It's%2Bbeginning%2Bto%2Blook%2Ba%2Blot%2Blike%2BChristmas_printable.jpg",
	path: "file:///C:/Users/holterca/Downloads/Michael%20Bubl%C3%A9%20-%20It's%20Beginning%20To%20Look%20A%20Lot%20Like%20Christmas%20[Official%20HD%20Audio].mp3",
},
{
	name: "All I Want for Christmas is You",
	artist: "Mariah Carey",
	image: "https://images.genius.com/3dc2cc21e3417d54425129a3c4793fd9.615x615x1.jpg",
	path: "file:///C:/Users/holterca/Downloads/Mariah%20Carey%20-%20All%20I%20Want%20For%20Christmas%20Is%20You%20(Official%20Audio).mp3",
},
];

function loadTrack(track_index) {
    // Eelmise timeri tühjendamine
    clearInterval(updateTimer);
    resetValues();
    
    // Uue tracki laadimine
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Tracki detailide värskendamine
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // 1000-millisekundiline intervall slideri värskendamiseks
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Järgmise tracki juurde liikumine, kui praegune lõpetab mängimise 
    // kasutades 'ended' eventi
    curr_track.addEventListener("ended", nextTrack);
    
    // Soovipärase taustavärvi valimine
    random_bg_color();
    }
    
    function random_bg_color() {
    // Arv vahemikus 64-256 annab heledama värvi
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Antud väärtustega värvi kontrueerimine
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Uue värvi seadmine taustale
    document.body.style.background = bgColor;
    }
    
    // Funktsioon kõigi väärtuste vaikeväärtusele lähtestamiseks
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }

    function playpauseTrack() {
        // Play ja pause vaheldumisi aktiveerimine sõltuvalt praegusest olekust
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Loaded tracki mängimine 
        curr_track.play();
        isPlaying = true;
        
        // Asendamine pausiikooniga 
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Loaded tracki peatamine
        curr_track.pause();
        isPlaying = false;
        
        // Asendamine play-ikooniga
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        // Esimese loo juurde naasmine (praegune on loendis viimane)
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Uue loo laadimine ja esitamine
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Viimase loo juurde naasmine (praegune on loendis esimene)
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        // Uue loo laadimine ja esitamine
        loadTrack(track_index);
        playTrack();
        }
        function seekTo() {
            //Seek positioni arvutamine slideri protsendi ja tracki kestvuse järgi
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            //  Praeguse tarcki asukoha seadmine arvutatud seek positionile
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Helitugevuse seadmine vastavalt helitugevuse slideri protsendile
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Kontroll, kas praegune tracki kestus on loetav number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Järelejäänud aja ja kogukestuse arvutamine
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Ühekohalistele ajaväärtustele nulli lisamine
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Värskendatud kestuse kuvamine
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
// Esimese loo laadimine tracklisti
loadTrack(track_index);
                    
