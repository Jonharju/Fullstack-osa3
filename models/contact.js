const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds113738.mlab.com:13738/fullstack-contacts'
mongoose.connect(url)
mongoose.Promise = global.Promise

const Contact = mongoose.model('Contact', {
  name: String,
  number: String
})

module.exports = Contact