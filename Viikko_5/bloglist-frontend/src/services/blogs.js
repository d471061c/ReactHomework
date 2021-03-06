import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (newBlog) => {
  const config = {
    headers: {'Authorization' : token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const config = {
    headers: {'Authorization': token}
  }
  blog.likes++
  const response = await axios.put(`${baseUrl}/${blog._id}`, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: {'Authorization': token}
  }
  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response.data
}

export default { likeBlog, getAll, setToken, addBlog, deleteBlog }