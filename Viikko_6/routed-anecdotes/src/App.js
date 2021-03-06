import React from 'react'
import { BrowserRouter as Router, Route, NavLink as Link } from 'react-router-dom'
import { Container, Menu as SMenu, Table, Form, Button, Grid, Image } from 'semantic-ui-react'

const Menu = () => {

  return (
    <SMenu>    
      <SMenu.Item link>
        <Link to='/anecdotes'>anecdotes</Link>&nbsp;
      </SMenu.Item>
      <SMenu.Item link>
        <Link to='/create'>create new</Link>&nbsp;
      </SMenu.Item>
      <SMenu.Item link>
        <Link to='/about'>about</Link>&nbsp;
      </SMenu.Item>
    </SMenu>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote => <Table.Row key={anecdote.id} >
                                     <Table.Cell> 
                                       <Link to={"/anecdotes/" + anecdote.id}>{anecdote.content}</Link>
                                       </Table.Cell>
                                     </Table.Row>)}
      </Table.Body>
    </Table>  
  </div>
)

const About = () => (
  <div>
    <Grid columns='two' divided>
      <Grid.Row colums={2}>
        <Grid.Column width={8}>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>
        
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column>
        <Image src="http://www.bcimensa.com/img/code-monkey-620x284.jpg"/>
        </Grid.Column>
      </Grid.Row>
      
    </Grid>
    <br/>
  </div>
  
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({ content: '', author: '', info: '' })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label> content </label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label> author </label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label> url for more info </label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field> 
          <Button>create</Button>
        </Form>
      </div>  
    )

  }
}

const Anecdote = (props) => {
  const { anecdote } = props
  return (
    <div>
      <h3> {anecdote.content} </h3>  
      <p> has {anecdote.votes} votes </p>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote)})
    this.setState({ notification : `a new anecdote ${anecdote.content} added!`})
    setTimeout(() => {
      this.setState({ notification: ''})
    }, 5000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {

    const notificationStyle = {
      color: 'green',
      fontSize: 16,
      borderStyle: 'solid',
      borderRadius: 10,
      padding: 10,
      marginBottom: 5
    }

    return (
      <Container>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
            <Menu />
            { this.state.notification !== '' ? <div style={notificationStyle}> { this.state.notification }</div> : <div></div> }
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Route path="/about" render={() => <About />}/>      
            <Route path="/create" render={() => <CreateNew addNew={this.addNew}/> }/>
          <Footer />
        </div>
      </Router>
      </Container>
    );
  }
}

export default App;
