const express = require('express'),
 cors = require('cors'),
 bodyparser = require('body-parser'),
 path = require('path'),
 key = require('./.keys/keys')
 mongoose = require('mongoose'),
 mongodb = key.mongo,
 app = express()

// MongoDB database setup
mongoose.connect(mongodb, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection
const schema = mongoose.Schema
db.on('error', console.error.bind(console, 'MONGO DB ERROR'))
const fieldSchema = new schema({
  fieldID: String,
  location: {lat: { type: Number}, lng: { type: Number }},
  games: []
})
const fieldModel = mongoose.model('FieldModel', fieldSchema)

// Posts game data and creates a new field if previously undefined
const postGameToDB = (gameData) => {
  var doc;
  fieldModel.findOne().where('fieldID').equals(gameData.fieldID).exec((err, dbres) => {
    if(err){
      console.error(err)
    }
    else {
      doc = dbres
      if(doc){
        doc.games.push({
          playersNeeded: gameData.players,
          ref: gameData.ref,
          time: gameData.time
        })
        doc.save()
      }
      else {
        fieldModel.create({
          fieldID: gameData.fieldID,
          location: gameData.location,
          games: [{
            playersNeeded: gameData.players,
            ref: gameData.ref,
            time: gameData.time
          }]
        }, (err) => {
          if(err) {
            console.error(err)
          }
          else {
            console.log(`Field Data created for game at Location: (lat: ${gameData.location.lat}, lng: ${gameData.location.lng}), and Time: ${gameData.fieldID}`)
          }
        })
      }
    }
  })
}

const joinGame = (joinData) => {
  console.log(joinData)
  var doc;
  fieldModel.findOne().where('fieldID').equals(joinData.fieldID).exec((err, dbres) => {
    if(err){
      console.error(err)
    }
    else{
      doc = dbres
      if(doc){
        for(let i = 0; i < doc.games.length; i++) {
          if(Date(Date.parse(doc.games[i].time)) === Date(Date.parse(joinData.time)))
          {
            console.log(Number(doc.games[i].playersNeeded) - 1)
            doc.games[i].playersNeeded = `${Number(doc.games[i].playersNeeded) - 1}`
          }
        }
        doc.markModified('games')
        doc.save()
      }
    }
  })
}

// Web server setup
app.use(cors())
app.use(bodyparser.json())
app.listen(5000, () => {
  console.log('Backend Server running on port 5000');
})

// Web Routing
app.get('/get/games/:id', (req,res) => {
  var fieldData = fieldModel.find().where('fieldID').equals(req.params.id).exec((err, dbres) => {
    //console.log(dbres)
    res.send(dbres)
  })
  console.log("Field Data Served to " + (req.connection.remoteAddress||req.headers['x-forwrded-for']))
})

app.post('/post/game/', (req,res) => {
  postGameToDB(req.body)
  res.send('Data posted!')
})

app.post('/join/game', (req,res) => {
  joinGame(req.body)
  res.send('Game joined')
})
