import React from 'react';

const Results = (props) => {
  
    return (
      <div>
        {props.persons.map(person => {
          if (person.name.toLowerCase().includes(props.filter.toLowerCase())){
            return <p key={person.name}>{person.name} {person.number}</p>
          }
          return null;
        })}
      </div>
    )
}

export default Results