const express = require('express')
const path = require('path')

var client_num = 1
var args = process.argv.slice(2)

const app = express()

app.use(express.static(path.join(__dirname, "/client/build")))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
  console.log(`App served to user number: ${client_num}`)
  client_num++
})

app.listen(5000||args[0], () => {
  console.log(`App running on port ${args[0]||5000}`)
})
