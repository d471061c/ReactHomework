import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      best: -1,
      scores: {}
    }
  }

  render() {
    const {anecdotes} = this.props;

    const nextAnectode = () => (
      this.setState({ selected : Math.floor((Math.random() * anecdotes.length)) 
    }));

    const vote = (idx) => () => (
      this.setState((prevState) => {
        let newscore = {...this.state.scores};
        
        if(!newscore[idx]) {
          newscore[idx] = 0;
        } newscore[idx]++;

        if (this.state.best === -1 || newscore[idx] > this.state.scores[this.state.best]) {
          return { scores : newscore, best : idx }
        }

        return { scores : newscore }
      }) 
    )

    const BestAnecdote = this.state.best !== -1 ? () => (<div>
       <h3>anecdote with most votes:</h3>
       <p> {anecdotes[this.state.best]} </p>
       <p> has {this.state.scores[this.state.best]} votes </p>
    </div>) : () => (<div></div>)

    return (
      <div>
        <p>
            {anecdotes[this.state.selected]}
        </p>
        <p>
            has {this.state.scores[this.state.selected] === undefined ? 0: this.state.scores[this.state.selected]} votes
        </p>
        <button onClick={vote(this.state.selected)}>vote</button>
        <button onClick={nextAnectode}>next anectode</button>
        <BestAnecdote />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
