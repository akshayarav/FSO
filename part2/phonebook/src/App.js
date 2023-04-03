import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const[showAll, setShowAll] = useState(true) 

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (!persons.filter(e => e.name === newName).length > 0){
      setPersons(persons.concat(nameObject))
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(false)
    setNewFilter(event.target.value)
    if (event.target.value == 0){
      setShowAll(true)
    }
  }


  const namesToShow = showAll 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handle = {handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm add={addName} name={newName} handleName = {handleNameChange} number={newNumber} handleNumber = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons namesToShow = {namesToShow} />
    </div>
  )
}

export default App
