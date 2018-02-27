import React from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      error: ''
    }
  }

  componentDidMount() {
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
        this.setState({ error: '' })
      }, 5000)
    }
  }

  logout = async (event) => {
    this.setState({user : null})
    window.localStorage.clear()
  }

  render() {
    return (
      <div>
        {this.state.error !== '' && Notification(this.state.error, 'error')}
        {this.state.user === null ?
              <LoginForm username={this.state.username}
                          password={this.state.password}
                          loginAction={this.login}
                          handleInput={this.handleLoginFieldChange}/>
            
             :
              (
                <div key="bloglist">
                  <div>{this.state.user.name} has logged in <button onClick={this.logout}>Logout</button></div>
                  <BlogList/>
                </div>
              )}
        
      </div>
    );
  }
}

export default App;
