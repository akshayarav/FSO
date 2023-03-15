import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
  <button onClick = {handleClick}>{text}</button>
  )
}
const StatisticLine = (props) =>{
  return(
    <tr>
    <td>{props.text}</td>
    <td>{props.value} {props.percent}</td>
    </tr>
  )
}
const Statistics = (props) => {
  if(props.stats[0]== 0 && props.stats[1]==0 && props.stats[2]==0){
    return(
      <p>no feedback given</p>
    )
  }
  const all = props.stats[0] + props.stats[1] + props.stats[2]
  return(
    <table>
    <tbody>
    <StatisticLine text='good'value={props.stats[0]}/>
    <StatisticLine text='neutral'value={props.stats[1]}/>
    <StatisticLine text='bad'value={props.stats[2]}/>
    <StatisticLine text='all'value={all}/>
    <StatisticLine text='average'value={(props.stats[0]-props.stats[2])/all}/>
    <StatisticLine text='positive'value={props.stats[0]/(all) * 100}percent='%'/>
    </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stats = [good, neutral, bad]
  
  const goodReview = () => setGood(good+1)
  const neutralReview = () => setNeutral(neutral+1)
  const badReview = () => setBad(bad+1)


  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={goodReview} text='good' />
      <Button handleClick={neutralReview} text='neutral' />
      <Button handleClick={badReview} text='bad' />
      <h1> statistics </h1>
      <Statistics stats = {stats} />
    </div>
  )
}

export default App