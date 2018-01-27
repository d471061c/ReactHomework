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
    const kurssit = [{
          nimi: 'Half Stack -sovelluskehitys',
          id: 1,
          osat: [
            {
              nimi: 'Reactin perusteet',
              tehtavia: 10,
              id: 1
            },
            {
              nimi: 'Tiedonvälitys propseilla',
              tehtavia: 7,
              id: 2
            },
            {
              nimi: 'Komponenttien tila',
              tehtavia: 14,
              id: 3
            }
          ]
        },
        {
          nimi: 'Node.js',
          id: 2,
          osat: [
            {
              nimi: 'Routing',
              tehtavia: 3,
              id: 1
            },
            {
              nimi: 'Middlewaret',
              tehtavia: 7,
              id: 2
            }
          ]
        }
    ]
    

    const kurssilista = ()=>kurssit.map(kurssi => <Kurssi kurssi={kurssi}/>)

    return (
      <div>
        {kurssilista()}
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
