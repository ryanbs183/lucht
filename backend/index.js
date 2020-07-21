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
const postGameToDB = async (gameData) => {
  var doc;
  await fieldModel.find().where('fieldID').equals(gameData.fieldID).exec((err, dbres) => {
    if(err){
      console.error(err)
    }
    else {
      console.log(dbres)
    doc = dbres
    }
  })
  if(doc)
  {
    fieldModel.update(
      {fieldID: gameData.fieldID},
        {$push : { games : {
            playersNeeded: gameData.players,
            ref: gameData.ref,
            time: gameData.time
            }
          }
        }
      )
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
        console.log(`Game Data saved for game at Location: (lat: ${gameData.location.lat}, lng: ${gameData.location.lng}), and Time: ${gameData.time.toLocaleString()}`)
      }
    })
    }
}

// Web server setup
app.use(cors())
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, '../client/build')))
app.listen(5000, () => {
  console.log('Backend Server running on port 5000');
})

// Web Routing
app.get('/', (req,res) => {
  res.send(express.static(path.join(__dirname, '../client/build/index.html')))
})

app.get('/get/games/:id', (req,res) => {
  var fieldData = fieldModel.find().where('fieldID').equals(req.params.id).exec((err, dbres) => {
    console.log(dbres)
    res.send(dbres)
  })
  console.log("Field Data Served to " + (req.connection.remoteAddress||req.headers['x-forwrded-for']))
})

app.post('/post/game/', (req,res) => {
  console.log(req.body)
  postGameToDB(req.body)
  res.send('Data posted!')
})
