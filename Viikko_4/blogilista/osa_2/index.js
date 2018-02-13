const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const app = express()


app.use(cors())
app.use(bodyParser.json())

app.use(middleware.logger)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to database', process.env.MONGODB_URI))
  .catch(err => console.log(err))
mongoose.Promise = global.Promise


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
