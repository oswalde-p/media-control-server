const SERVER_URL = window.location.href

// Add notification info if it's supported
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'R*moat',
    artist: 'Connected',
    album: '',
    artwork: [
      { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
      { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
      { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
      { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
      { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
      { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
    ]
  });

  navigator.mediaSession.setActionHandler('play', play);
  navigator.mediaSession.setActionHandler('pause', pause);
  navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
  navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
  navigator.mediaSession.setActionHandler('previoustrack', function() { /* Code excerpted. */ });
  navigator.mediaSession.setActionHandler('nexttrack', function() { /* Code excerpted. */ });
}

let isAudioPlaying = false

function sendToServer(command){
  const req = new XMLHttpRequest()
  req.open('GET', `${SERVER_URL}${command}`)
  req.send()
}

// add event listeners for dom elements
const playButton = document.getElementById('button-play')
playButton.addEventListener('click', () => isAudioPlaying ? pause() : play())


function play() {
  document.querySelector('audio').play()
  sendToServer('play')
  isAudioPlaying = true
  playButton.value = 'Pause'
}

function pause() {
  document.querySelector('audio').pause()
  sendToServer('pause')
  isAudioPlaying = false
  playButton.value = 'Play'
}

