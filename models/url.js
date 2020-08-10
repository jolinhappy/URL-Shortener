const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  fullUrl: {
    type: String,
    require: true,
  },
  short: {
    type: String,
    require: true,
  }

})

module.exports = mongoose.model('Url', urlSchema)