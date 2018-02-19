const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  adult: Boolean
})

userSchema.statics.format = function(user) {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult,
    id: user._id
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
