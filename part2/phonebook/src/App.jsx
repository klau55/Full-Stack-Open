import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '0'}
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onSubmit={addName} value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button onClick={addName}type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
      <p key={person.id}>{person.name}</p>
      )}
    </div>
  )
}

export default App