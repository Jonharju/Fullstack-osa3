const express = require('express')
var morgan  = require('morgan')
const cors = require('cors')
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
    response.send('<p> Puhelinluettelossa '+contacts.length+' henkilön tiedot</p><p>'+new Date(Date.now())+'</p>')
})

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)
  
    if ( contact ) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = contacts.find(contact => contact.name === body.name)
  
  if(body.name === undefined){
    return response.status(400).json({error: 'name missing'})
  } else if(body.number === undefined){
    return response.status(400).json({error: 'number missing'})
  } else if(name){
    return response.status(400).json({error: 'name must be unique'})
  }

  const contact = {
    name: body.name,
    number: body.number,
    id: Math.floor((Math.random() * 10000) + 1)
  }

  contacts = contacts.concat(contact)
  response.json(contact)
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)
  if ( contact ) {
    contacts = contacts.filter(contact => contact.id !== id)
    contact.number = request.body.number
    contacts = contacts.concat(contact)
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})