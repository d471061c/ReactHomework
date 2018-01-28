import React from 'react'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            country : '',
            countries : []
        }
    }

    componentWillMount() {
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(response => {
          this.setState({countries : response.data })
        })
      }
    
    handleChange = (event) => {
        this.setState({country : event.target.value})
    }

    render() {
        const {country} = this.state
        const results = () => {
            let matches = this.state.countries.filter(c => c.name.toLowerCase().indexOf(country.toLowerCase()) !== -1);
            if (matches.length > 10) {
                return <div> too many matches, specify another filter </div>
            } else if (matches.length === 1) {
                const result = matches[0];
                return (
                <div> 
                    <h2> {result.name} </h2>
                    <p> Capital: {result.capital} </p>
                    <p> Population: {result.population} </p>
                    <img alt="flag" src={result.flag}/>
                </div>)
            } else {
                return matches.map(result => <div> {result.name} </div>)
            }
        }
        
        return (
        <div>
            <div>
                find countries: <input value={country} onChange={this.handleChange}/>
            </div>
            {results()}
        </div>)
    }
}

export default App