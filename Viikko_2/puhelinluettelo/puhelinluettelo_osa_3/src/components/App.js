import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number:'040-123456'}
      ],
      newName: '',
      newNumber: ''
    }
  }

  addPerson = (event) => {
      event.preventDefault()
      if (this.state.newName.length === 0) return
      if (this.state.newNumber.length === 0) return
      if (this.state.persons.map(person=>person.name).indexOf(this.state.newName) !== -1) return
      if (this.state.persons.map(person=>person.number).indexOf(this.state.newNumber) !== -1) return
      const persons = this.state.persons.concat({name:this.state.newName, number:this.state.newNumber})
      this.setState({persons, newName:'', newNumber:''})
  }
  
  handlePersonNameChanged = (event) => {
      this.setState({ newName : event.target.value })
  }

  handlePersonNumberChanged = (event) => {
     this.setState({newNumber : event.target.value })
  }

  render() {
    const {persons, newName, newNumber} = this.state
    const personList = () => persons.map(person => 
    <tr key={person.name}>
      <td> {person.name} </td>
      <td> {person.number} </td>
    </tr>)
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
