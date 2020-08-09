const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const shortener = require('./shortener')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/shortLink', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongoose connected!')
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const long = req.body.long
  let shortUrl = ''
  let shortId = ''
  Url.find()
    .lean()
    .then(urls => {
      const findOne = urls.find(url => { return url.long === long })
      // console.log(ans)
      if (findOne) {
        shortUrl = `http://localhost:3000/${findOne.short}`
      } else {
        shortId = shortener()
        const check = urls.find(url => url.short === shortId)
        if (check) {
          shortId = shortener()
        } else {
          Url.create({
            long: long,
            short: shortId
          })
          shortUrl = `http://localhost:3000/${shortId}`
        }
      }
    })
    .then(() => res.render('index', { shortUrl }))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})