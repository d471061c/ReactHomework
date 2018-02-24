const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./utils/tokenExtractor')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor.tokenExtractor)

app.use(middleware.logger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

mongoose.connect(config.mongoUrl)
  .then(() => console.log('Connected to database', config.mongoUrl))
  .catch(err => console.log(err))
mongoose.Promise = global.Promise


const PORT = config.port

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}