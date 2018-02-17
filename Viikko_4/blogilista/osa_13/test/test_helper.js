const Blog = require('../models/Blog')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.test_format)
}

const clearDb = async () => {
  await Blog.remove({})
}

const saveBlog = async (blog) => {
  const result = await new Blog(blog).save()
  return result
}

module.exports = {
  blogsInDb,
  clearDb,
  saveBlog
}