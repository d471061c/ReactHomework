import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      this.setState({ error : 'Wrong username or password' })
      setTimeout(() => {
        this.setState({ error: undefined })
      }, 5000)
    }
  }

  logout = async (event) => {
    this.setState({user : null})
    window.localStorage.clear()
  }

  loginForm = () => (
    <div>
      <h2> Log in to application </h2>
      <form onSubmit={this.login}>
        <div>
          username:
          <input type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}/>
        </div>
        <div>
          password:
          <input type="password"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleLoginFieldChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  blogList = () => (
    <div>
      <div>{this.state.user.name} has logged in <button onClick={this.logout}>Logout</button></div>
      <h2>blogs</h2>
      {this.state.blogs.map(blog => 
        <Blog key={blog._id} blog={blog}/>
      )}
    </div>
  )

  render() {
    return (
      <div>
        {this.state.user === null ?
              this.loginForm() :
              this.blogList()}
        {this.state.error !== null && Notification(this.state.error)}
      </div>
    );
  }
}

export default App;
