const Blog = require('../models/Blog')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.test_format)
}

const clearDb = async () => {
  await Blog.remove({})
}

module.exports = {
  blogsInDb,
  clearDb
}