import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'
let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const update = async (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, setToken, login, update, token }