import React from 'react';


class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      content : ""
    }
  }

  onType = (event) => {
    this.setState({content : event.target.value})
  }

  vote = (store, anecdote) => () => {
    store.dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }

  add = (store, content) => (event) => {
    event.preventDefault();
    store.dispatch({
      type: 'ADD',
      data: content
    })
    this.setState({content : ''})
  }

  render() {
    const { store } = this.props
    const anecdotes = store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(store, anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input value={this.state.content} onChange={this.onType}/></div>
          <button onClick={this.add(store, this.state.content)}>create</button> 
        </form>
      </div>
    )
  }
}

export default App