import React from 'react';
import personService from './services/PersonService'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    personService.getAll()
    .then(response => {
      this.setState({persons : response.data})
    })
  }

  addPerson = (event) => {
      event.preventDefault()
      if (this.state.newName.length === 0) return
      if (this.state.newNumber.length === 0) return
      if (this.state.persons.map(person=>person.name).indexOf(this.state.newName) !== -1) return

      const person = {name : this.state.newName, number: this.state.newNumber}
      personService.addPerson(person).then(response => {
        const persons = this.state.persons.concat(response.data)
        this.setState({persons, newName:'', newNumber:''})
      })
      
  }

  deletePerson = (person) => {
    return () => {
      if (window.confirm("poistetaanko " + person.name)) {
        let personsleft = this.state.persons.filter(p => p.id !== person.id);
        personService.deletePerson(person.id).then(response => {this.setState({persons : personsleft})})
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
    const {filter, persons, newName, newNumber} = this.state
    const personList = () => persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1).map(person => 
    <tr key={person.name}>
      <td> {person.name} </td>
      <td> {person.number} </td>
      <td> <button onClick={this.deletePerson(person)}>Poista </button> </td>
    </tr>)
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
