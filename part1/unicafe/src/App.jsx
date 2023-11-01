import { useState } from 'react'

const StatisticLine =  ({text, value }) => {
  return (
    <tr> 
    <td>{text}</td><td>{value}</td>
    </tr>
  )
}
const Button = ({action, tag}) => <button onClick={action}>{tag}</button>

const Buttons = ({addGood, addBad, addNeutral}) => {
  return (
    <div>
    <Button action={addGood} tag="good"/>
    <Button action={addNeutral} tag="neutral" />
    <Button action={addBad} tag="bad"/>
    </div>

  )


}
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
    <table>
      <tbody>
      <StatisticLine text="good"  value ={good}/>
      <StatisticLine text="neutral" value ={neutral}/>
      <StatisticLine text="bad" value ={bad}/>
      <StatisticLine text="all" value ={total} />
      <StatisticLine text="average" value ={(good-bad)/(good+neutral+bad)} />
      <StatisticLine text="positive" value ={(good/(good+neutral+bad))*100 +"%"} />
    </tbody>
    </table>
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
      <Buttons addBad={addBad} addGood={addGood} addNeutral={addNeutral}/>
      <br/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App