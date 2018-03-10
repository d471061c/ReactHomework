import React from 'react'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  filter = (e) => {
    this.props.store.dispatch(setFilter(e.target.value))
  }

  render = () => {
    return (
      <div>
        filter <input onInput={this.filter}/>
      </div>)
  }
}

export default Filter