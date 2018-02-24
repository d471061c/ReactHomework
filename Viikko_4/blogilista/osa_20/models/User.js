const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  name: String,
  adult: { type: Boolean, default: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.post('save', function(error, doc, next) {
  if ((error.name === 'BulkWriteError' || error.name === 'MongoError') && error.code === 11000) {
    next(new Error('Username taken'))
  } else {
    next(error)
  }
})

userSchema.statics.format = function(user) {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs,
    id: user._id
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
