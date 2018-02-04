import axios from 'axios'

const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const addPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}

export default {getAll, addPerson, deletePerson, updatePerson}
