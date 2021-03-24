import React, { useState } from 'react';

const Best = (props) => {
  const i = props.points.indexOf(Math.max(...props.points))
  return (
    <div>
      <p>{props.anecdotes[i]}</p>
      <p>has {props.points[i]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const pointsArr = new Array(anecdotes.length).join('0').split('').map(parseFloat);
  const [points, setPoints] = useState(pointsArr)

  const copy = [...points];


  const handleClick = () =>{
    const randIndex = Math.floor(Math.random() * anecdotes.length);
    //console.log(randIndex)
    setSelected(randIndex)
  }

  const handleVote = () => {
    copy[selected]++;
    setPoints(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br /> has {points[selected]} votes.<br />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Best anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App
