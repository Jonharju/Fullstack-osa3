const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds113738.mlab.com:13738/fullstack-contacts'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Contact = mongoose.model('Contact', {
  name: String,
  number: String
})

if(process.argv[2] && process.argv[3]){
  const contact = new Contact({
    name: process.argv[2],
    number: process.argv[3]
  })

  contact
    .save()
    .then(response => {
      console.log('Lisätään henkilö '+contact.name+' numero '+contact.number+' luetteloon')
      mongoose.connection.close()
    })
} else {
  Contact
    .find({})
    .then(result => {
      console.log('Puhelinluettelo:')
      result.forEach(contact => {
        console.log(contact.name+' '+contact.number)
      })
      mongoose.connection.close()
    })
}
