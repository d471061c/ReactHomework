import React from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import Togglable from './Togglable';


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

  handleInput = (event) => {
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

  

  render() {
    return (<div>
      <h2> Blogs </h2>
      {this.state.message !== '' && Notification(this.state.message, 'info')}
      {this.blogList()}
      <Togglable buttonLabel="new blog">
        <BlogForm title={this.state.title}
                  author={this.state.author}
                  url={this.state.url}
                  onSubmit={this.createBlog}
                  handleInput={this.handleInput}/>
      </Togglable>
    </div>)
  }
}

export default BlogList