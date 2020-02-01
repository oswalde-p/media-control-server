
const exec = require('child_process').exec

const keyMap = {
  space: '49',
  up: '126',
  down: '125',
  left: '123',
  right: '124',
  return: '36'
}

function handle(query) {
  const code = keyMap[query]
  const template = `tell application \\"System Events\\"\n  key code ${code}\nend tell`
try {
  exec(`osascript -e "${template}"`)
  } catch(err) {
    console.log(err)
  }
  return
}

module.exports = { handle }
