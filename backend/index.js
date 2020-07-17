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
  fieldID: "61f80943a7bb2e70aeefd8b2dda13fae233eec6a",
  gameID: 1,
  playersNeeded: 5,
  ref: false
}]

app.listen(5000, () => {
  console.log('Backend Server running on port 5000');
})

app.get('/get/games/:fieldID', (req,res) => {
  console.log(req.params.fieldID)
  res.send(games.filter((g) => (req.params.fieldID == g.fieldID)))
  console.log("App Served to " + (req.connection.remoteAddress||req.headers['x-forwrded-for']))
})

app.post('/post/games', (req,res) => {
  console.log(req.body)
  arr.push(req.body)
  res.send('Data posted!')
})
