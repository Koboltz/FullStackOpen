import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Results from './components/Results';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([
  ])

  useEffect(() => {
    
    personsService  
    .getAll()
    .then(initialPersons => {
       // console.log(initialPersons)
      setPersons(initialPersons)
    })
    .catch(err => alert(err))
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState(''); 
  const [errorMessage, setErrorMessage ] = useState(null)

  const handleNameChange = ({target}) => {
    setNewName(target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    //console.log('button clicked', event.target)
    const personObj  = {
      name: newName,
      number: newNumber
    }
    const check = persons.find(person => person.name === personObj.name)
    //console.log(check)
    if (check !== undefined) {
     const result = window.confirm(`${personObj.name} is already added to phonebook. Replace the old number with the new one?`)
     if (result) {
       personsService
        .updatePerson(check.id, personObj)
        .then(newPersons => {
          setPersons(persons.map(person => person.id !== check.id ? person : newPersons))
          setErrorMessage(`Updated ${personObj.name}`)
          setTimeout(() => {
            setErrorMessage (null)
          }, 5000)
        })
        .catch(err => {
          setErrorMessage(`Information of ${personObj.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
     return null
    } else {
    personsService
      .addNewPerson(personObj)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('');
        setNewNumber('')
        setErrorMessage(`Added ${personObj.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch((err) => {
        alert('Unknown Error')
      })
    
    }
    
  }

  const deletePerson = (event) => {
    //console.log(event.target.value)
    const person = persons.find(person => {
      //console.log(`personsid: ${person.id}`)
      return person.id.toString() === event.target.value;
      
    })
    //console.log(`person: ${person.name}`)
    const result = window.confirm(`delete ${person.name}?`)
    if (result) {
    personsService
      .deletePerson(event.target.value)
      .then(
       setPersons(persons.filter(person => person.id.toString() !== event.target.value))
      )
    }
    return null;
  }

  const handleNumberChange = ({target}) => {
    setNewNumber(target.value);
  }

  const handleFilter = ({target}) => {
    setFilter(target.value.toLowerCase());

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilter}/>
      <h3>add a person</h3>
      <Notification message={errorMessage}/><br />
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Results persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App