import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notifierReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes)
          .filter(c => c.content.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  this.props.voteAnecdote(anecdote.id)
                  this.props.notify(`You voted '${anecdote.content}'`)
                  setTimeout(() => {
                    this.props.notify('')
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(c => c.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter),
    filter: state.filter
  }
}


const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteAnecdote, notify }
)(AnecdoteList)

export default ConnectedAnecdoteList
