import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from "axios"
import numService from "./services/numbers"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const[showAll, setShowAll] = useState(true) 
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (!persons.filter(e => e.name === newName).length > 0){
      numService
      .create(nameObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNumber('')
      })
      setErrorMessage(
        `Added ${newName}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else{
      if(window.confirm(`${newName} is already added to phonebook, replace the 
      old number with a new one`)){
        const id = persons.filter(e => e.name === newName)[0].id
        numService
        .update(id, nameObject)
        .then(response => {
          setPersons(persons.map(n => n.id !== id ? n : response))
        })
        setErrorMessage(
          `Changed ${newName}'s number to ${newNumber}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const delNum = (person) => (event) => {
    if (window.confirm(`Delete ${person.name} ?`)){   
      numService
      .del(person.id)
      .then(returnedPersons => {
        setPersons(persons.filter(personThis => personThis.id !== person.id)
        )
      })}
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
      <Notification message = {errorMessage} />
      <Filter filter={newFilter} handle = {handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        add={addName} 
        name={newName} 
        handleName = {handleNameChange} 
        number={newNumber} 
        handleNumber = {handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        namesToShow = {namesToShow} 
        delNum = {delNum}
      />
    </div>
  )
}

export default App
