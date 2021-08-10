const exec = require('child_process').exec
let vol = 20

async function getVolume() {
  return new Promise((resolve, reject) => {
    exec('amixer get Master', (err, stdout) => {
      if (err) {
        console.error(err)
        reject()
        return
      }
      const value = stdout.match(/[0-9][0-9]\%/g)
      resolve(Number(value[0].slice(0,2)))
    })
  })
}

function setVolume(level) {
  exec(`amixer sset Master ${level}%`)
}

module.exports = { getVolume, setVolume }
