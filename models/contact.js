const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds113738.mlab.com:13738/fullstack-contacts'
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