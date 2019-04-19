const exec = require('child_process').exec

// http://wiki.linuxquestions.org/wiki/XF86_keyboard_symbols
const keyMap = {
  play: 'XF86AudioPlay',
  pause: 'XF86AudioPause',
  volumeup: 'XF86AudioRaiseVolume',
  volumedown: 'XF86AudioLowerVolume',
  mute: 'XF86AudioMute',
  // skipfwd: 'SKIP_FWD',
  skipbwd: 'XF86AudioRewind',
  next: 'XF86AudioNext',
  previous: 'XF86AudioPrev',
  space: 'space'
}

function xDo(key){
  const command = `xdotool key ${key}`
  exec(command)
}

function handle(command) {
  const key = keyMap[command]
  if (!key) throw new Error(`ARGUMENT ERROR: '${command}'`)
  xDo(key)
}

module.exports = { handle }
