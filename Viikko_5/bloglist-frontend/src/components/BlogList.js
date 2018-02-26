import React from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import Notification from '../components/Notification'

class BlogList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      message: '',
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
      

      this.setState({ message : `a new blog '${this.state.title}' by ${this.state.author} added` })
      this.setState({ title: '', author: '', url: '', blogs: this.state.blogs.concat(response) })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)

    } catch (exception) {
      console.log("Error: ", exception)
    }
  }
  
  blogList = () => (
    <div>
      {this.state.blogs.map(blog => 
        <Blog key={blog._id} blog={blog}/>
      )}
    </div>
  )

  blogForm = () => (
    <div>
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
    </div>
  )

  render() {
    return (<div>
      <h2> Blogs </h2>
      {this.state.message !== '' && Notification(this.state.message, 'info')}
      {this.blogList()}
      {this.blogForm()}
    </div>)
  }
}

export default BlogList