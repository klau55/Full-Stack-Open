import { useState } from 'react'

const Display = ({name, count}) => {
  return (
  <div>
    {name} {count}
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
      <Display name="good"  count={good}/>
      <Display name="neutral" count={neutral}/>
      <Display name="bad" count={bad}/>
    </div>
  )
}

export default App