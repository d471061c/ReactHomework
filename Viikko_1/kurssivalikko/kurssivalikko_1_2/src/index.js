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
            <Osa nimi={props.nimet[0]} tehtavia={props.tehtavat[0]}/>
            <Osa nimi={props.nimet[1]} tehtavia={props.tehtavat[1]}/>
            <Osa nimi={props.nimet[2]} tehtavia={props.tehtavat[2]}/>
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
