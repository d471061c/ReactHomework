import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  filter = (e) => {
    this.props.setFilter(e.target.value)
  }

  render = () => {
    return (
      <div>
        filter <input onInput={this.filter}/>
      </div>)
  }
}

const connectFilter = connect(
  null,
  { setFilter }
)(Filter)

export default connectFilter