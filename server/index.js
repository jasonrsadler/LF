const express = require('express')
const bodyParser = require('body-parser')
const { runCipher } = require('./cipher')

const app = express()
const port = 23456

app.use(bodyParser.json())

app.post('/api/encode', (req, res) => {
  if (!req.body.Shift || isNaN(req.body.Shift) || Number(req.body.Shift) < 1) {
    return res.status(500).json({ EncodedMessage: '' })
  }
  if (!req.body.Message) {
    return res.status(500).json({ EncodedMessage: '' })
  }
  res.status(200).json({ EncodedMessage: runCipher(Number(req.body.Shift), req.body.Message) })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
