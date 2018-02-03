const express = require('express')
const bodyParser = require('body-parser')

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
]

const app = express()

app.use(bodyParser.json())

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
  
  person.id = Math.floor(Math.random() * Math.floor(100000))
  persons = persons.concat(person)

  res.json(person)
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
   let content = `<p>puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`
   res.send(content)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})