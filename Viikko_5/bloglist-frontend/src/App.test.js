import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import BlogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';

describe('<App />', () => {
  let app
  
  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    test('only login form is rendered', () => {
      app.update()
      const loginComponent = app.find(LoginForm)
      expect(loginComponent.length).toEqual(1)
    })
  });
  
  describe('when use is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }      
      localStorage.setItem('loggedUser', JSON.stringify(user)) 
      app = mount(<App />)
    })

    test('all blogs are rendered', () => {
      app.update()
      const blogs = app.find(Blog)
      expect(blogs.length).toEqual(BlogService.blogs.length)
    })
  });
});