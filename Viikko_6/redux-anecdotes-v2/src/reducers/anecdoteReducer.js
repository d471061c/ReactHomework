import anecdoteService from '../services/anecdotes'

//const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const anecdote = action.anecdote
    const old = store.filter(a => a.id !== anecdote.id)

    return [...old, { ...anecdote }]
  }
  if (action.type === 'CREATE') {

    return [...store, action.content]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}


export const voteAnecdote = (anecdote) => {
  return async(dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      anecdote: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.saveAnecdote(content)
    dispatch({
      type: 'CREATE',
      content: anecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer