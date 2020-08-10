const mongoose = require('mongoose')
const Url = require('../url')
const shortener = require('../../shortener')

mongoose.connect('mongodb://localhost/url', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  const shortPart = shortener()
  Url.create(
    {
      fullUrl: 'https://www.facebook.com/',
      short: `${shortPart}`
    }
  )
  console.log('mongoose connected!')
})