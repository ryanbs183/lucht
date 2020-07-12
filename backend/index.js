const express = require('express'),
 cors = require('cors'),
 bodyparser = require('body-parser'),
 app = express()

app.use(cors())
app.use(bodyparser.json())

var fields = ["First","Second","Third"]

app.listen(5000, () => {
  console.log('Backend Server running on port 5000');
})

app.get('/get/games', (req,res) => {
  res.send({game: fields});
  console.log("App Served to " + (req.connection.remoteAddress||req.headers['x-forwrded-for']))
})

app.post('/get/games', (req,res) => {
  arr.push(req.body)
  res.send('Data posted!')
})
