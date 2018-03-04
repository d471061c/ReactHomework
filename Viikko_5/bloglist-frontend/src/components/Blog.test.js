import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog/>', () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      user: 'Example',
      likes: 20
    }

    const user = {
      name: 'Test User',
      username: 'tester',
      _id: '0'
    }

    const blank = () => {}

  test('renders contents', () => {
    const blogComponent = shallow(<Blog blog={blog} onLike={blank} onDelete={blank} currentUser={user}/>)
    
    const blogContent = blogComponent.find('.blog-content')
    const blogHeader = blogComponent.find('.blog-header')

    expect(blogHeader.text()).toContain(blog.title)
    expect(blogHeader.text()).toContain(blog.author)
    expect(blogContent.getElement().props.style).toEqual({ display: 'none' })
  })

  test('visible when pressed', () => {
    const blogComponent = shallow(<Blog blog={blog} onLike={blank} onDelete={blank} currentUser={user}/>)
    const blogHeader = blogComponent.find('.blog-header')
    blogHeader.simulate('click')
    const blogContent = blogComponent.find('.blog-content')
    expect(blogContent.getElement().props.style).toEqual({ display: '' })
  })

});