const video     = document.getElementById('video');
const play      = document.getElementById('play');
const stop      = document.getElementById('stop');
const progress  = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


//play and pause video
function toggleUpdateStatus() {
  //if video is running then pause it otherwise play it
   video.paused === true ? video.play() : video.pause();
}

//stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//update play and pause icon
function updatePlayIcon() {
  video.paused === true ? play.innerHTML = '<i class="fa fa-play fa-2x"></i>'  :
     play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
}

//update progess and time
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
}

//set video time 
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}



video.addEventListener('click', toggleUpdateStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', toggleUpdateStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);