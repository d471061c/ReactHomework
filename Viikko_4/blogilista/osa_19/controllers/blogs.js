const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (request.body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

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
    const blog = new Blog(request.body)
    const savedblog = await blog.save()
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()
    response.json(Blog.format(savedblog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
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