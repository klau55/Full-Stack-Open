const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
morgan.token('res-body', (request) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'))

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1)
  }
  
  app.get('/info', (req, res) => {
  res.send(`<a>Phonebook has info for ${persons.length} people</a><br/>${new Date()}`)
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

  app.get('/api/persons/:id',(req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person)
      res.json(person)
    else  
      res.status(404).end()
  })
  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
    response.json(person)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })