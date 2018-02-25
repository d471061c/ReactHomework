const Blog = require('../models/Blog')
const User = require('../models/User')


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(User.format)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.test_format)
}

const clearBlogDb = async () => {
  await Blog.remove({})
}

const clearUserDb = async () => {
  await User.remove({})
}

module.exports = {
  blogsInDb,
  clearBlogDb,
  usersInDb,
  clearUserDb
}