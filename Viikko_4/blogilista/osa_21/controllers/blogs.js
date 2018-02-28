const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (request.body === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    
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

    const user = await User.findById(decodedToken.id)
    blog.user = user._id
    const savedblog = await blog.save()
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()
    response.json(savedblog)
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
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (decodedToken.id !== blog.user.toString()) {
      console.log(user._id)
      console.log(blog.user)
      return response.status(400).send({ error : 'Only the owner of the blog can remove the blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.json(blog)
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
