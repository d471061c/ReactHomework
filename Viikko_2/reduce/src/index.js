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

const Sisalto = ({osat}) => {
    const osiot = () => osat.map(osa => 
        <Osa nimi={osa.nimi} tehtavia={osa.tehtavia}/>
    )
    return (
        <div>
            {osiot()}
        </div>
    )
}

const Yhteensa = (props) => {
    let summa = props.osat.map((osa) => (osa.tehtavia)).reduce((a, b) => a + b, 0);
    return (
        <p> Yhteensä: {summa} </p>
    )
}

const Kurssi = ({kurssi}) => {
    const {nimi, osat} = kurssi
    return (
        <div>
            <Otsikko teksti={nimi}/>
            <Sisalto osat={osat}/>
            <Yhteensa osat={osat}/>
        </div>
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
        <Kurssi kurssi={kurssi}/>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
