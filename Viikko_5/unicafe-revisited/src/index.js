import React from 'react';
import ReactDOM from 'react-dom';
import counterReducer from './reducer'
import './index.css';
import { createStore } from 'redux';

const Button = ({ name, onClick }) => (
  <button onClick={onClick}>{name}</button>
)

const Statistics = ({ good, neutral, bad }) => (
  [
    <Static key="hyvä" name="hyvä" value={good} />,
    <Static key="neutraali" name="neutraali" value={neutral} />,
    <Static key="huono" name="huono" value={bad} />
  ]
)

const Static = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const store = createStore(counterReducer)

class App extends React.Component {
  render() {
    const { good, ok, bad } = store.getState()
    const sum = good + ok + bad;
    const average = ((good - bad) * 1.0 / sum).toFixed(1);
    const positives = (((good * 1.0) / sum) * 100).toFixed(1) + " %";

    const Stats = sum > 0 ? () => (<table>
      <tbody>
        <Statistics good={good} bad={bad} neutral={ok} />
        <Static name="keskiarvo" value={average} />
        <Static name="positiivisia" value={positives} />
      </tbody>
    </table>) : () => (<p>ei yhtään palautetta annettu</p>);

    const updateValue = (name) => () => (
      store.dispatch({ type: name })
    )

    return (<div>
      <h2> anna palautetta </h2>
      <div>
        <Button onClick={updateValue("GOOD")} name="hyvä" />
        <Button onClick={updateValue("OK")} name="neutraali" />
        <Button onClick={updateValue("BAD")} name="huono" />
      </div>
      <h2> statistiikka </h2>
      <Stats />
    </div>)
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)