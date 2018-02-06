import React from 'react';
import personService from './services/PersonService'


const Notification = ({message}) => {
  return message === null ? null : (
    <div className="success">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentWillMount() {
    personService.getAll()
    .then(response => {
      this.setState({persons : response.data})
    })
  }

  notify(message) {
    this.setState({message : message})
    setTimeout(() => {
      this.setState({message: null})
    }, 10000)
  }

  addPerson = (event) => {
      event.preventDefault()
      const {newNumber, newName, persons} = this.state
      if (newName.length === 0) return
      if (newNumber.length === 0) return
      if (persons.map(person=>person.name.toLowerCase()).indexOf(newName.toLowerCase()) !== -1) {
        if (window.confirm(`${newName} on jo luettolossa, korvataanko vanha numero uudella?`)) {
          let changedPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase()) 
          changedPerson.number = newNumber
          let updatedPersons = persons.map(person => person.id === changedPerson.id ? changedPerson : person)
          personService.updatePerson(changedPerson.id, changedPerson)
            .then(response => this.setState({persons : updatedPersons}))
            .catch(error => this.addPerson(changedPerson))
          this.notify(`Henkilön '${changedPerson.name}' numero on vaihdettu`)
          return
        }
      }

      const person = {name : this.state.newName, number: this.state.newNumber}
      personService.addPerson(person).then(response => {
        const persons = this.state.persons.concat(response.data)
        this.setState({persons, newName:'', newNumber:''})
        this.notify(`lisättiin ${person.name}`)
      })
      
  }

  deletePerson = (person) => {
    return () => {
      if (window.confirm("poistetaanko " + person.name)) {
        let personsleft = this.state.persons.filter(p => p.id !== person.id);
        personService.deletePerson(person.id).then(response => {this.setState({persons : personsleft})})
        this.notify(`Henkilö '${person.name}' poistettiin`)
      }
    }
  }
  
  handlePersonNameChanged = (event) => {
      this.setState({ newName : event.target.value })
  }

  handlePersonNumberChanged = (event) => {
     this.setState({ newNumber : event.target.value })
  }

  handleFilterChanged = (event) => {
    this.setState({ filter : event.target.value })
  }

  render() {
    const {message, filter, persons, newName, newNumber} = this.state
    const personList = () => persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1).map(person => 
    <tr key={person.name}>
      <td> {person.name} </td>
      <td> {person.number} </td>
      <td> <button onClick={this.deletePerson(person)}>Poista </button> </td>
    </tr>)
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={message}/>
        <div>
          rajaa näytettäviä: <input value={filter} onChange={this.handleFilterChanged}/>
        </div>
        <h3> Lisää uusi </h3>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={newName} onChange={this.handlePersonNameChanged}/>
          </div>
          <div>
            numero: <input value={newNumber} onChange={this.handlePersonNumberChanged}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {personList()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
