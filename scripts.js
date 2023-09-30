const musicCon = document.querySelector('.musicCon');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const progress = document.querySelector('.progress');
const audio = document.querySelector('#audio');
const progressCon = document.querySelector('.progressCon');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const audioCtx = new AudioContext();
const loader = document.querySelector('.load-wrapper');
const themeToggle = document.querySelector('#toggle');
const songList = document.querySelector('.list');
const canvas = document.querySelector("#canvas");
const body = document.querySelector("#bd");
const mainTitle = document.querySelector(".title");
const searchInput = document.querySelector(".searchInput");

// Song titles
const songs = [
    "Blue Bird Lofi", "A cuel angels theisis lofi",
    "Zankyou Sanka", "Gurenge Lofi", "Golden Wind Lofi",
    "Netsujou no Spectrum", "Zenitsu Theme", "Tanjiro No Uta Lofi",
    "Next To You", "We Go!",
    "Hard Knock Days", "Blue Bird (English)",
    "Bad Apple", "Bad Apple (English)", "Dark Seeks Light", "Rise", "We Are!",
    "Unravel", "GIGACHAD ONE PIECE", "Departure!", "Kaikai Kitan"
];

// keep track of songs
let songIndex = 0;

// update song details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `audio/${song}.mp3`;
    cover.src = `img/${song}.png`;
}

// Load the song
loadSong(songs[songIndex]);


playBtn.addEventListener('click', () => {
    const isPlaying = musicCon.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});

// functions
function playSong() {
    musicCon.classList.add('play');
    mainTitle.classList.add('invisible');
    audio.play();
}

function pauseSong() {
    musicCon.classList.remove('play');
    mainTitle.classList.remove('invisible');
    audio.pause();
}

function prevSong() {
    const isPlaying = musicCon.classList.contains("play")
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    if (songIndex > songs.length - 1) {
        songIndex = 60;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) {
        playSong();
    }
    else {
        return
    }
}

function nextSong() {
    const isPlaying = musicCon.classList.contains("play")
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if (isPlaying != true) {
        return
    }
    else {
        playSong();
    }
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function theme() {
    musicCon.classList.toggle('dark');
    songList.classList.toggle('dark');
    // canvas.classList.toggle('dark');
    body.classList.toggle('dark');
    playBtn.classList.toggle('dark');
    prevBtn.classList.toggle('dark');
    nextBtn.classList.toggle('dark');
    mainTitle.classList.toggle('dark');
    searchInput.classList.toggle('dark');
}

// next and prev buttons
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressCon.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
themeToggle.addEventListener('change', theme);

// Search Function
searchInput.addEventListener('keyup', function (e) {
    const searchString = e.target.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.toLowerCase().includes(searchString));
    songList.innerHTML = '';
    filteredSongs.forEach(song => {

        const songElement = document.createElement('div');
        songElement.classList.add('item');
        songElement.innerHTML = `
            <img src="img/${song}.png" alt="">
            <center class="songName">${song}</center>
        `;
        songElement.onclick = function () {
            loadSong(song);
            playSong();
            songIndex = songs.indexOf(song);
        };
        songList.appendChild(songElement);
    });
});
