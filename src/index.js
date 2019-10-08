const express = require('express')
const ip = require('ip')
const path = require('path')
const controlService = require('./control-service')
const volumeService = require('./volume')

const app = express()

const PORT = process.env.PORT || 8675

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('./public/index.html'))
app.get('/favicon.ico', (req, res) => res.render('./public/favicon.ico'))
app.get('/ping', (req, res) => res.sendStatus(200))

app.get('/volume/:level', (req, res) => {
  const { level } = req.params
  try{
    volumeService.setVolume(level)
    res.status(200).send(level)
  } catch(err){
    console.error(err)
    res.status(500).send()
  }
})

app.get('/volume', (req, res) => {
  try{
    const level = volumeService.getVolume()
    res.status(200).send({level})
  } catch(err){
    console.error(err)
    res.status(500).send()
  }
})

app.get('/:command', (req, res) => {
  const { command } = req.params
  try {
    controlService.handle(command)
    return res.status(200).send({command})
  } catch(err) {
    if (err.message.split(':' === 'ARGUMENT ERROR')) {
      return res.sendStatus(400)
    }
    console.log(err)
    return res.sendStatus(500)
  }
})


const server = app.listen(PORT, () => {
  const port = server.address().port
  console.log(`Listening at http://${ip.address()}:${port}`)
})


