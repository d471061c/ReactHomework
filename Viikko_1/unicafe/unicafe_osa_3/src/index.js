import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({name, onClick}) => (
    <button onClick={onClick}>{name}</button>
)

const Statistics = ({good, neutral, bad}) => (
    <span> 
        hyvä {good} <br/>
        neutraali {neutral} <br/>
        huono {bad} <br/>
    </span>
)

const Static = ({name, value}) => (
    <span>
        {name} {value} <br/>
    </span>
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

        return (<div>
                    <h2> anna palautetta </h2>
                    <div>
                        <Button onClick={() => this.setState({ good : good + 1})} name="hyvä"/>
                        <Button onClick={() => this.setState({ neutral : neutral + 1})} name="neutraali"/>
                        <Button onClick={() => this.setState({ bad : bad + 1})} name="huono"/>
                    </div>
                    <h2> statistiikka </h2>
                    <div>
                        <p> 
                            <Statistics good={good} bad={bad} neutral={neutral}/>
                            <Static name="keskiarvo" value={average}/>
                            <Static name="positiivisia" value={positives}/>
                        </p>
                    </div>
                </div>)
    }
}

ReactDOM.render(<App />,  document.getElementById('root'));

