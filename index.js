const express = require('express')
var morgan  = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const app = express()
const bodyParser = require('body-parser')

morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(bodyParser.json())
app.use(morgan(':method :url :type :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.static('build'))

let contacts = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
]

app.get('/info', (request, response) => {
  Contact
    .find({})
    .then(contacts => {
      response.send('<p> Puhelinluettelossa '+contacts.length+' henkilön tiedot</p><p>'+new Date(Date.now())+'</p>')
    })
})

app.get('/api/persons', (request, response) => {
    //response.json(contacts)
    Contact
    .find({})
    .then(contacts => {
      response.json(contacts.map(Contact.format))
    })
})

app.get('/api/persons/:id', (request, response) => {
    //const id = Number(request.params.id)
    //const contact = contacts.find(contact => contact.id === id)
    //if ( contact ) {
    //  response.json(contact)
    //} else {
    //  response.status(404).end()
    //}
    Contact
      .findById(request.params.id)
      .then(contact => {
        if (contact) {
          response.json(Contact.format(contact))
        } else {
          response.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        response.status(404).end()
      })
})

app.delete('/api/persons/:id', (request, response) => {
    //const id = Number(request.params.id)
    //contacts = contacts.filter(contact => contact.id !== id)
    Contact
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  //const name = contacts.find(contact => contact.name === body.name)
  
  if(body.name === undefined){
    return response.status(400).json({error: 'name missing'})
  } else if(body.number === undefined){
    return response.status(400).json({error: 'number missing'})
  }// else if(name){
    //return response.status(400).json({error: 'name must be unique'})
  //}
    
  const contact = new Contact({
    name: body.name,
    number: body.number
  })
  Contact
    .find({name: body.name})
    .then(c => {
      if(c.length >0){
        response.status(400).json({error: 'name must be unique'})
      } else {
        contact
          .save()
          .then(savedContact => {
            response.json(Contact.format(savedContact))
          })
      }
    })
  
  //contacts = contacts.concat(contact)
  //response.json(contact)
})

app.put('/api/persons/:id', (request, response) => {
  //const id = Number(request.params.id)
  //const contact = contacts.find(contact => contact.id === id)
  //if ( contact ) {
  //  contacts = contacts.filter(contact => contact.id !== id)
  //  contact.number = request.body.number
  //  contacts = contacts.concat(contact)
  //  response.json(contact)
  //} else {
  //  response.status(404).end()
  //}
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }
  Contact
    .findByIdAndUpdate(request.params.id, contact, { new: true } )
    .then(updatedContact => {
      response.json(Contact.format(updatedContact))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})