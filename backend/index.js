const express = require('express'),
 cors = require('cors'),
 bodyparser = require('body-parser'),
 app = express()

app.use(cors())
app.use(bodyparser.json())

var games = [{
  location: {
    lat: 26.3501415,
    lng: -80.0906749
  },
  time: new Date(),
  fieldID: "8f42bc0968d24dc88051f74f77d3b773e5663662",
  gameID: 1,
  playersNeeded: 5,
  ref: false
}]

app.listen(5000, () => {
  console.log('Backend Server running on port 5000');
})

app.get('/get/games', (req,res) => {
  res.send(games)
  console.log("App Served to " + (req.connection.remoteAddress||req.headers['x-forwrded-for']))
})

app.post('/get/games', (req,res) => {
  arr.push(req.body)
  res.send('Data posted!')
})
