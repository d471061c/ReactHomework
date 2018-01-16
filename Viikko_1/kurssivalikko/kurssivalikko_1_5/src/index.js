import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1> {props.teksti} </h1>
    )
}

const Osa = (props) => {
    return (
        <p>
            <strong> {props.nimi}</strong>: {props.tehtavia}
        </p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa nimi={props.osat[0].nimi} tehtavia={props.osat[0].tehtavia}/>
            <Osa nimi={props.osat[1].nimi} tehtavia={props.osat[1].tehtavia}/>
            <Osa nimi={props.osat[2].nimi} tehtavia={props.osat[2].tehtavia}/>
        </div>
    )
}

const Yhteensa = (props) => {
    let summa = props.osat.map((osa) => (osa.tehtavia)).reduce((a, b) => a + b, 0);
    return (
        <p> Yhteensä: {summa} </p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
      <div>
        <Otsikko teksti={kurssi.nimi}/>
        <Sisalto osat={kurssi.osat}/>
        <Yhteensa osat={kurssi.osat}/>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
