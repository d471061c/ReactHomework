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
    
    console.log(this.props.blog)
    const {title, author, url, likes, user} = this.props.blog
    const showIfExpanded = { display : this.state.expanded ? '' : 'none' }

    return (
      <div style={blogStyle} onClick={this.toggle}>
        {title} {author}
        <div style={showIfExpanded}>
          <p>
          <a href={url}> {url} </a> <br/>
          {likes} likes <button>like</button><br/>
          added by {user.name}</p>
        </div>
      </div>  
    )
  }
}


export default Blog