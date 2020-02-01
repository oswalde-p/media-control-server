const exec = require('child_process').exec

function getVolume() {
  // TODO make getVolume work properly
  const current = exec('osascript -e "output volume of (get volume settings)"',(err, stdout) => {
    console.log(stdout)
    return Number(stdout)
  })
}


function setVolume(levelPc) {
  let normalized = levelPc / 10
  exec(`osascript -e "set Volume ${normalized}"`)
}

module.exports = { getVolume, setVolume }
