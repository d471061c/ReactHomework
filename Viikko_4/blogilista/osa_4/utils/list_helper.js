const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs === undefined) return 0
  if (blogs.length === 0) return 0
  return Math.max(...blogs.map(blog => blog.likes))
}

module.exports = {
  dummy,
  totalLikes
}