const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name not set"] },
    number: { type: String, required: [true, "Number not set"] }
})

personSchema.statics.format = function (person) {
    return {
        id: person._id,
        name: person.name,
        number: person.number
    }
}

const Person = mongoose.model('Person', personSchema)


module.exports = Person