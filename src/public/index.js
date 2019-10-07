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

  navigator.mediaSession.setActionHandler('play', play)
  navigator.mediaSession.setActionHandler('pause', pause)
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

const stopButton = document.getElementById('button-stop')
stopButton.addEventListener('click', stop)

const upButton = document.getElementById('button-up')
upButton.addEventListener('click', () => sendToServer('up'))
const downButton = document.getElementById('button-down')
downButton.addEventListener('click', () => sendToServer('down'))
const leftButton = document.getElementById('button-left')
leftButton.addEventListener('click', () => sendToServer('left'))
const rightButton = document.getElementById('button-right')
rightButton.addEventListener('click', () => sendToServer('right'))

const selectButton = document.getElementById('button-select')
selectButton.addEventListener('click', () => sendToServer('return'))

const volumeUpButton = document.getElementById('button-volume-up')
volumeUpButton.addEventListener('click', () => sendToServer('volumeup'))
const volumeDownButton = document.getElementById('button-volume-down')
volumeDownButton.addEventListener('click', () => sendToServer('volumedown'))

function play() {
  document.querySelector('audio').play()
  sendToServer('space')
  isAudioPlaying = true
  playButton.innerHTML = 'Pause'
  playButton.classList.remove('paused')
}

function pause() {
  document.querySelector('audio').pause()
  sendToServer('space')
  isAudioPlaying = false
  playButton.innerHTML = 'Play'
  playButton.classList.add('paused')
}

function stop() {
  document.querySelector('audio').pause()
  sendToServer('backspace')
  isAudioPlaying = false
  playButton.innerHTML = 'Play'
}

