const express = require('express')
const controlService = require('./control-service')
const localtunnel = require('localtunnel')

const app = express()

const PORT = process.env.PORT || 8675
const SUBDOMAIN = process.env.SUBDOMAIN || 'shabado620062'

app.get('/', (req, res) => res.send(200))

app.get('/:command', (req, res) => {
  const { command } = req.params
  try {
    controlService.handle(command)
    return res.status(200).send(command)
  } catch(err) {
    if (err.message.split(':' === 'ARGUMENT ERROR')) {
      return res.sendStatus(400)
    }
    console.log(err)
    return res.sendStatus(500)
  }
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))

const tunnel = localtunnel(PORT, { subdomain: SUBDOMAIN }, function(err, tunnel) {
  if (err) console.log(err)
  console.log('Public url: ' + tunnel.url)
})

tunnel.on('error', (err) => {
  console.log(err)
})

tunnel.on('close', function() {
  // tunnels are closed
});

;
