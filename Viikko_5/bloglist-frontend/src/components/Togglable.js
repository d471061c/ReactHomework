import React from 'react'
import PropTypes from 'prop-types'
class Togglable extends React.Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired
  } 
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible : !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const { buttonLabel, children } = this.props
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}> { buttonLabel } </button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
      
    )
  }
}

export default Togglable