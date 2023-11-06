import { useState } from 'react'

const Persons = ({ personsToShow, filter }) => {

    return (
      personsToShow.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )
    )
  }

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName))
    {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }}
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleFilterChange} /></div>
      <form onSubmit={addName}>
        <div>
          name:  <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} filter={filter} />
    </div>
  )
}

export default App