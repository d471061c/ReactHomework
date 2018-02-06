const mongoose = require('mongoose')

const url = 'mongodb://<username>:<password>@ds125288.mlab.com:25288/sandbox'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 4) {
    const name = process.argv[2];
    const number = process.argv[3]
    const person = new Person({
        name: name,
        number: number,
        id: Math.floor(Math.random() * Math.floor(100000))
    })
    person.save()
           .then(response => {
               console.log('lisätään henkilö',name,'numero',number,'luetteloon')
               mongoose.connection.close()
    })
} else if (process.argv.length === 2) {
    Person.find({})
          .then(result => {
              console.log("puhelinluettelo:")
              result.forEach(person => {
                  console.log(person.name,person.number)
              })
              mongoose.connection.close()
          })
} 

mongoose.connection.close()   
