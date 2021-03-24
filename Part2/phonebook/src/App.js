import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Results from './components/Results';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([
  ])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState(''); 

  const handleNameChange = ({target}) => {
    setNewName(target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target)
    const personObj  = {
      name: newName,
      number: newNumber
    }
    const check = persons.find(person => person.name === personObj.name)
    console.log(check)
    if (check !== undefined) {
    alert(`${personObj.name} is already added to phonebook`)
    } else {
    setPersons(persons.concat(personObj));
    }
    setNewName('');
    setNewNumber('')
    
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
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Results persons={persons} filter={filter}/>
    </div>
  )
}

export default App