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

  app.post('/api/persons', (req, res, next) => {
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
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
      
  })

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
    } else {
      response.status(404).json({ error: 'contact not found' })
    }
    })
    .catch(error => next(error))
    })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
  }
  app.use(errorHandler)
  
 const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })