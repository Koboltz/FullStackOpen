import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.setter}>
      {props.name}
    </button>
  )
}

const Statistic = (props) => {
  
  return (
    <tr>
      <td>{props.text}:</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const all = good + neutral + bad;
  const average = (good + (-bad)) / all;
  const positive = (good / all) * 100;
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good}/>
          <Statistic text='neutral' value={neutral}/>
          <Statistic text='bad' value={bad}/>
          <Statistic text='all' value={all}/>
          <Statistic text='average' value={average}/>
          <Statistic text='positive' value={positive + ' %'}/>
        </tbody>
      </table>
      </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name='good' setter={() => setGood(good + 1)}/>
      <Button name='neutral' setter={() => setNeutral(neutral + 1)}/>
      <Button name='bad' setter={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
