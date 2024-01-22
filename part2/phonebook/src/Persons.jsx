const Persons = ({ personsToShow, handleDelete }) => {
    return (
      personsToShow.map(person =>
        <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></p>
      )
    )
  }
  export default Persons