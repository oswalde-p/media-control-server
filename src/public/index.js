const SERVER_URL = window.location.href
const currentVolume = 10
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
const pauseButton = document.getElementById('button-pause')
playButton.addEventListener('click', play)
pauseButton.addEventListener('click', pause)

const fixStateButton = document.getElementById('button-fix-state')
fixStateButton.addEventListener('click', swapPlayState)

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

// const volumeUpButton = document.getElementById('button-volume-up')
// volumeUpButton.addEventListener('click', () => {
//   sendToServer('volumeup')
//   getVolume()
// })
// const volumeDownButton = document.getElementById('button-volume-down')
// volumeDownButton.addEventListener('click', () => {
//   sendToServer('volumedown')
//   getVolume()
// })

function play() {
  document.querySelector('audio').play()
  sendToServer('space')
  isAudioPlaying = true
  playButton.style.display = 'none'
  pauseButton.style.display = 'block'
}

function pause() {
  document.querySelector('audio').pause()
  sendToServer('space')
  isAudioPlaying = false
  pauseButton.style.display = 'none'
  playButton.style.display = 'block'
}

function swapPlayState() {
  isAudioPlaying = !isAudioPlaying
  if (isAudioPlaying) {
    pauseButton.style.display = 'none'
    playButton.style.display = 'block'
    return
  }
  playButton.style.display = 'none'
  pauseButton.style.display = 'block'
}

// initialise the volume level
getVolume()

function updateVolume(vol){
  setVolume(vol)
}

function getVolume() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", function() {
    const level = JSON.parse(this.responseText).level
    document.getElementById("range-volume").value = level
  })
  req.open('GET', `${SERVER_URL}volume`)
  req.send()
}

function setVolume(level) {
  const req = new XMLHttpRequest()
  req.open('GET', `${SERVER_URL}volume/${level}`)
  req.send()
}

