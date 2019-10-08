const exec = require('child_process').exec
let vol = 20

function getVolume() {
  return vol++
}

function setVolume(level) {
  console.log('setting volume to ' + level + '%')
  exec(`amixer sset Master ${level}%`)
}

module.exports = { getVolume, setVolume }
