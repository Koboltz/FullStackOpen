import React from 'react';

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((a,b) => ({
      exercises: a.exercises + b.exercises
    }))
    return(
      <h3>total of {sum.exercises} exercises</h3>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(part => {
            return <Part key={part.id} part={part} />
          }
        )
        }
      </div>
    )
  }
  
  export default Course;