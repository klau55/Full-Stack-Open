import { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import dataService from './services/persons'
import Notification from './Notification'
import Error from './Error'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    dataService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) => 
    setNewName(event.target.value)
  const handleNumberChange = (event) => 
    setNewNumber(event.target.value)
  const handleFilterChange = (event) => 
    setFilter(event.target.value)
  
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName))
    {
      const person = persons.find(person => person.name === newName)
      const changedPerson = {...person, number: newNumber}
      handleUpdate(changedPerson)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      dataService
        .create(nameObject)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
        })
    }
    setNotificationMessage(
      `Added ${newName} to phonebook`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }
  const handleUpdate = (nameObject) => {
    if (window.confirm(`${nameObject.name} is already added to
     phonebook, replace the old number with a new one?`)) 
    {  dataService
        .update(nameObject.id, nameObject)
        .then((returnedData) => {
          setPersons(persons.map(person => person.id !== nameObject.id ? person : returnedData))
        })
  
    }
  }


  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) 
    {  dataService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id ))
        setNotificationMessage(
          `Deleted ${person.name} from phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
/*      .catch(() => {
        console.log('BBBBBB')
        setErrorMessage(
          `'${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      setPersons(persons.filter(p => p.id !== person.id ))
      })*/
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App