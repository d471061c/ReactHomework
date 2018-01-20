import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        const positives = (((good * 1.0) / sum) * 100).toFixed(1);

        return (<div>
                    <h2> anna palautetta </h2>
                    <div>
                        <button onClick={() => this.setState({ good : good + 1})}>hyvä</button>
                        <button onClick={() => this.setState({ neutral : neutral + 1})}>neutraali</button>
                        <button onClick={() => this.setState({ bad : bad + 1})}>huono</button>
                    </div>
                    <h2> statistiikka </h2>
                    <div>
                        <p> hyvä {good} <br/>
                            neutraali {neutral} <br/>
                            huono {bad} <br/>
                            keskiarvo {average} <br/>
                            positiivisia {positives} %
                        </p>
                    </div>
                </div>)
    }
}

ReactDOM.render(<App />,  document.getElementById('root'));

