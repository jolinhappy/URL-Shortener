const mongoose = require('mongoose')
const MOGODB_URI = process.env.MOGODB_URI || 'mongodb://localhost/shortLink'
mongoose.connect(MOGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongoose connected!')
})

module.exports = db