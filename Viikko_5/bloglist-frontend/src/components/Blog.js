import React from 'react'
import PropTypes from 'prop-types'


class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    onLike: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggle = () => {
    this.setState({ expanded : !this.state.expanded })
  }

  render(props) {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    
    const { title, author, url, likes, user } = this.props.blog
    const { onLike, onDelete, currentUser } = this.props

    const showIfExpanded = { display : this.state.expanded ? '' : 'none' }
    return (
      <div className="blog" style={blogStyle}>
        <div className="blog-header" onClick={this.toggle}>{title} {author}</div>
        <div className="blog-content" style={showIfExpanded}>
          <p>
          <a href={url}> {url} </a> <br/>
          <span className="blog-likes">{likes} likes <button onClick={onLike}>like</button></span><br/>
          added by {user.name}<br/>
          {(!(user) || user.name === currentUser.name) && (<button onClick={onDelete}> Delete </button>)}
          </p>
        </div>
      </div>  
    )
  }
}


export default Blog