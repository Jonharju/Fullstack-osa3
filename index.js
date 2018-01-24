const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})