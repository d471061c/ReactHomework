import React from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import Togglable from './Togglable';
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

class BlogList extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

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
      this.setState({ blogs : blogs.sort((a, b) => a.likes < b.likes) })
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


  delete = (blog) => async () => {
    const result = await BlogService.deleteBlog(blog)
    this.setState({blogs : this.state.blogs.filter(b => b._id !== result._id)})
  }

  like = (blog) => async () => {
    const newBlog = await BlogService.likeBlog(blog)
    if (newBlog.like === blog.like + 1) blog.like++
    this.setState( {blogs : this.state.blogs.sort((a, b) => a.likes < b.likes)} )
  }
  
  blogList = (user) => (
    <div>
      {this.state.blogs.map(blog => 
        <Blog key={blog._id} blog={blog} onDelete={this.delete(blog)} onLike={this.like(blog)} currentUser={user}/>
      )}
    </div>
  )

  render(props) {
    const { user } = this.props
    return (<div>
      <h2> Blogs </h2>
      {this.state.message !== '' && Notification(this.state.message, 'info')}
      {this.blogList(user)}
      <Togglable buttonLabel="new blog" ref={component => this.BlogForm = component}>
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