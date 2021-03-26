import React from 'react';

const Results = (props) => {
  
    return (
      <div>
        {props.persons.map(person => {
          if (person.name.toLowerCase().includes(props.filter.toLowerCase())){
             // console.log(`person: ${person.id}`)
            return (
              <p key={person.name}>{person.name} {person.number} <button value={person.id} onClick={props.deletePerson}>delete</button></p>
            )
            
          }
          return null;
        })}
      </div>
    )
}

export default Results