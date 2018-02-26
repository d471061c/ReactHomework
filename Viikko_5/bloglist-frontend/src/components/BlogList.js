import React from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'

class BlogList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      blogs: []
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      const response = await blogService.addBlog(blog)
      this.setState({ title: '', author: '', url: '', blogs: this.state.blogs.concat(response) })
    } catch (exception) {
      console.log("Error: ", exception)
    }
  }
  
  blogList = () => (
    <div>
      <h2>blogs</h2>
      {this.state.blogs.map(blog => 
        <Blog key={blog._id} blog={blog}/>
      )}
    </div>
  )

  render() {
    return (<div>
      {this.blogList()}
      <h3>Create new</h3>
      <form onSubmit={this.createBlog}>
        <div>
          title:
          <input type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}/>
        </div>
        <div>
          author:
          <input type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleInputChange}/>
        </div>
        <div>
          url:
          <input type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleInputChange}/>
        </div>
        <button type="submit">Create blog</button>
      </form>
    </div>)
  }
}

export default BlogList