const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let TWITTS = [
    {id: v4(), 
   idx :0,
   text : '' }
]

app.use(express.json())

// GET
app.get('/api/twitts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(TWITTS)
  }, 100)
})

// POST
app.post('/api/twitts', (req, res) => {
  const twitts = {...req.body, id: v4()}
  TWITTS.push(twitts)
  res.status(201).json(TWITTS)
  })

// DELETE
app.delete('/api/twitts/:id', (req, res) => {
  TWITTS = TWITTS.filter(c => c.id !== req.params.id)
  this.TWITTS=['']
  
  res.status(200).json({message: 'Твит был удален'})
})

// PUT
app.put('/api/twitts/:id', (req, res) => {
  const idx = TWITTS.findIndex(c => c.id === req.params.id)
  TWITTS[idx] = req.body
  res.json(TWITTS[idx])
  
})

app.use(express.static(path.resolve(__dirname, 'frontEnd')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontEnd', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))
