import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1> {props.teksti} </h1>
    )
}

const Sisalto = (props) => {
    const osiot = props.nimet.map(function(nimi, indeksi) {
        return <p> <strong>{nimi}</strong>: {props.tehtavat[indeksi]}</p>
    });
    return (
        <div>
            {osiot}
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <p> Yhteensä: {props.summa} </p>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14
  
    return (
      <div>
        <Otsikko teksti={kurssi}/>
        <Sisalto nimet={[osa1, osa2, osa3]} tehtavat={[tehtavia1, tehtavia2, tehtavia3]}/>
        <Yhteensa summa={tehtavia1 + tehtavia2 + tehtavia3}/>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
