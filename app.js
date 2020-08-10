const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const shortener = require('./shortener')

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const input = req.body.fullUrl
  const checkHttp = input.indexOf('https://')
  const head = req.headers.origin
  let long = ''
  //確保是網址
  if (checkHttp < 0) {
    long = `https://${input}`
  } else { long = `${input}` }
  let shortUrl = ''
  let shortId = ''
  Url.find()
    .lean()
    .then(urls => {
      const checkOne = urls.find(url => { return url.fullUrl === long })
      if (checkOne) {
        shortUrl = `${head}/${checkOne.short}`
      } else {
        shortId = shortener()
        const check = urls.find(url => url.short === shortId)
        if (check) {
          shortId = shortener()
        } else {
          Url.create({
            fullUrl: `${long}`,
            short: `${shortId}`
          })
          shortUrl = `${head}/${shortId}`
        }
      }
    })
    .then(() => res.render('index', { shortUrl }))
    .catch(error => console.log(error))
})

//short URL redirect
app.get('/:short', (req, res) => {
  const short = req.params.short
  Url.findOne({ short: `${short}` })
    .then((url) => {
      res.redirect(`${url.fullUrl}`)
    })
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
