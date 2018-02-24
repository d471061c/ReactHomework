const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  if (blog.title === undefined) {
    return response.status(400).json({ error: 'title is undefined' })
  }

  if (blog.url === undefined) {
    return response.status(400).json({ error: 'url is undefined' })
  }

  const user = await User.findById(blog.user)
  if (user !== undefined) {
    const result = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    user.save()
    return response.status(201).json(result)
  }
  return response.status(400).json({ error: 'User undefined' })
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error : 'malformatted id' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(201).json(result)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error : 'malformatted id' })
  }
})

module.exports = blogRouter