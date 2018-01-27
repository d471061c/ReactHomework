import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
      event.preventDefault()
      if (this.state.newName.length === 0) return
      const persons = this.state.persons.concat({name:this.state.newName})
      this.setState({persons, newName:''})
  }
  
  handlePersonInput = (event) => {
      this.setState({ newName : event.target.value })
  }

  render() {
    const {persons, newName} = this.state
    const personList = () => persons.map(person => <li key={person.name}> {person.name} </li>)
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={newName} onChange={this.handlePersonInput}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
            {personList()}
        </ul>
      </div>
    )
  }
}

export default App
