import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({name, onClick}) => (
    <button onClick={onClick}>{name}</button>
)

const Statistics = ({good, neutral, bad}) => (
    [ 
            <Static key="hyvä" name="hyvä" value={good}/>,
            <Static key="neutraali" name="neutraali" value={neutral}/>,
            <Static key="huono" name="huono" value={bad}/>
    ]
)

const Static = ({name, value}) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    render() {
        const {good, neutral, bad} = this.state
        const sum = good + neutral + bad;
        const average = ((good - bad) * 1.0 / sum).toFixed(1);
        const positives = (((good * 1.0) / sum) * 100).toFixed(1) + " %";
        const Stats = sum > 0 ? ()=>(<table>
                                        <tbody>
                                            <Statistics good={good} bad={bad} neutral={neutral}/>
                                            <Static name="keskiarvo" value={average}/>
                                            <Static name="positiivisia" value={positives}/>
                                        </tbody>
                                    </table>) : ()=>(<p>ei yhtään palautetta annettu</p>);
        
        const updateValue = (name) => () => (
            this.setState({[name] : this.state[name] + 1})
        )
        
        return (<div>
                    <h2> anna palautetta </h2>
                    <div>
                        <Button onClick={updateValue("good")} name="hyvä"/>
                        <Button onClick={updateValue("neutral")} name="neutraali"/>
                        <Button onClick={updateValue("bad")} name="huono"/>
                    </div>
                    <h2> statistiikka </h2>
                    <Stats/>
                </div>)
    }
}

ReactDOM.render(<App />,  document.getElementById('root'));

