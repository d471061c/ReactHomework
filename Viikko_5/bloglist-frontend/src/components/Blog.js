import React from 'react'

class Blog extends React.Component {
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
      <div style={blogStyle}>
        <p onClick={this.toggle}>{title} {author}</p>
        <div style={showIfExpanded}>
          <p>
          <a href={url}> {url} </a> <br/>
          {likes} likes <button onClick={onLike}>like</button><br/>
          added by {user.name}<br/>
          {(!(user) || user.name === currentUser.name) && (<button onClick={onDelete}> Delete </button>)}
          </p>
        </div>
      </div>  
    )
  }
}


export default Blog