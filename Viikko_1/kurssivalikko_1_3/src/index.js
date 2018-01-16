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
    return (
        <p> Yhteensä: {props.summa} </p>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  
  
    return (
      <div>
        <Otsikko teksti={kurssi}/>
        <Sisalto osat={[osa1, osa2, osa3]}/>
        <Yhteensa summa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia}/>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
