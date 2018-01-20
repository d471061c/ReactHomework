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
        return (<div>
                    <h2> anna palautetta </h2>
                    <div>
                        <button onClick={() => this.setState({ good : this.state.good + 1})}>hyvä</button>
                        <button onClick={() => this.setState({ neutral : this.state.neutral + 1})}>neutraali</button>
                        <button onClick={() => this.setState({ bad : this.state.bad + 1})}>huono</button>
                    </div>
                    <h2> statistiikka </h2>
                    <div>
                        <p> hyvä {this.state.good} <br/>
                            neutraali {this.state.neutral} <br/>
                            huono {this.state.bad}
                        </p>
                    </div>
                </div>)
    }
}

ReactDOM.render(<App />,  document.getElementById('root'));

