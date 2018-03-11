import axios from 'axios'

let url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const saveAnecdote = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })
  return response.data
}

const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`${url}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
  return response.data
}

export default { getAll, saveAnecdote, voteAnecdote }