import { useState } from 'react'

const StatLine =  ({name, count}) => <div>{name} {count}</div>
const Statistics = ({good, neutral, bad}) => {
  
  const total = good+neutral+bad
  if (total <= 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else return (
  <div>
      <StatLine name="good"  count={good}/>
      <StatLine name="neutral" count={neutral}/>
      <StatLine name="bad" count={bad}/>
      <StatLine name="all" count={total} />
      <StatLine name="average" count={(good-bad)/(good+neutral+bad)} />
      <StatLine name="positive" count={(good/(good+neutral+bad))*100 +"%"} />
  </div>
  )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => 
    setGood(good + 1)

    
  const addNeutral = () =>
    setNeutral(neutral + 1)

  const addBad = () =>
    setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <br/>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
      <br/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App