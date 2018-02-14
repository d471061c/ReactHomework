const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return 0
  return Math.max(...blogs.map(blog => blog.likes))
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}