

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
  return {
    type: 'VOTE',
    anecdote
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default reducer