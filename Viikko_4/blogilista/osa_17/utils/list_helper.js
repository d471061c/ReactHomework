const dummy = (blogs) => {
  // ESLINT UNUSED PARAMETER
  blogs
  return 1
}

const totalLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return 0
  return blogs.map(blog => blog.likes).reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return undefined
  let bestBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > bestBlog.likes) {
      bestBlog = blog
    }
  })
  return bestBlog
}

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return undefined
  let results = {}
  let blogger = { author: 'Unknown', blogs : 0 }
  blogs.forEach(blog => {
    if (results[blog.author]) {
      results[blog.author]++
    } else {
      results[blog.author] = 1
    }
    if (results[blog.author] > blogger.blogs) {
      blogger.author = blog.author
      blogger.blogs = results[blog.author]
    }
  })
  return blogger
}

const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return undefined
  let results = {}
  let blogger = { author: 'Unknown', likes : 0 }
  blogs.forEach(blog => {
    if (results[blog.author]) {
      results[blog.author] += blog.likes
    } else {
      results[blog.author] = blog.likes
    }
    if (results[blog.author] > blogger.likes) {
      blogger.author = blog.author
      blogger.likes = results[blog.author]
    }
  })
  return blogger
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}