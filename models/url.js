const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  origin: {
    type: String,
    require: false,
  },
  short: {
    type: String,
    require: false,
  }

})

module.exports = mongoose.model('ShortLink', urlSchema)