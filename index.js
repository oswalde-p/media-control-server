const express = require('express')
const controlService = require('./control-service')

const app = express()

const PORT = process.env.PORT || 8675

app.get('/', (req, res) => res.send(200))

app.get('/ping', (req, res) => res.sendStatus(200))

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

app.listen(PORT, () => console.log('Listening on port ' + PORT))



