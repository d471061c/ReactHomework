const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/Person')

const url = 'mongodb://<username>:<password>@ds125288.mlab.com:25288/sandbox'
mongoose.connect(url)

morgan.token('body', function getBody(req) { return JSON.stringify(req.body) })

const app = express()

app.use(morgan(':method :url :body :res[content-length] :status - :response-time ms'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static("build"))

app.get("/api/persons", (req, res) => {
  Person
      .find({})
      .then(result => {
        res.json(result.map(Person.format));
      })
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post("/api/persons", (req, res) => {
  const person = req.body
  
  if (person === undefined ) {
    return res.status(400).json({error: 'Person missing'})
  }
  
  if (person.name === undefined) {
    return res.status(400).json({error : 'name is missing'})
  }

  if (person.number === undefined) {
    return res.status(400).json({error : 'number is missing'})
  }
  
  const personObj = new Person({
    name: person.name,
    number: person.number
  })
  personObj
    .save()
    .then(response => {
      res.json(Person.format(response));
    })
    .catch(error => {
      console.log(error)
    })

})

app.get("/info", (req, res) => {
   let content = `<p>puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`
   res.send(content)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})