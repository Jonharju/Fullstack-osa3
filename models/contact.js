const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.Promise = global.Promise
var Schema = mongoose.Schema
var contactSchema = new Schema ({
  name: String,
  number: String
})

contactSchema.statics.format = function (info){
  return {
    name: info.name,
    number: info.number,
    id: info._id
  }
}

var Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact