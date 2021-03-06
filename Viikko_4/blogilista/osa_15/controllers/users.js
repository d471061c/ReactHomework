const userRouter = require('express').Router()
const User = require('../models/User')

const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users.map(User.format))
  } catch (exception) {
    console.log(exception)
  }
})

userRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error : 'Error has occured' })
  }
})

module.exports = userRouter