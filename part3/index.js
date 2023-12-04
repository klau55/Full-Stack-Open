const express = require('express')
require('dotenv').config()
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('res-body', (request) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'))


const generateId = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1)
  }
  
  app.get('/info', (req, res) => {
  res.send(`<a>Phonebook has info for ${Person.length} people</a><br/>${new Date()}`)
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
  
      response.json(persons)
    })
  })


  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
  })

  app.get('/api/persons/:id',(req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person)
      res.json(person)
    else  
      res.status(404).end()
  })
  app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ 
        error: 'content missing' 
      })
    }
    const newPerson = new Person ({
      id: generateId(),      
      name: body.name,
      number: body.number
    })
  
    newPerson.save().then(savedPerson => {
    res.json(savedPerson)
    })
  })

  app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
      res.json(person)
    })
  })
  
 const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })