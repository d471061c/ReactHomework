import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notifierReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes)
          .filter(c => c.content.toLowerCase().indexOf(this.props.store.getState().filter.toLowerCase()) !== -1)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  this.props.store.dispatch(voteAnecdote(anecdote.id))
                  this.props.store.dispatch(notify(`You voted '${anecdote.content}'`))
                  setTimeout(() => {
                    this.props.store.dispatch(notify(''))
                  }, 5000)
                }
                }>
                  vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default AnecdoteList
