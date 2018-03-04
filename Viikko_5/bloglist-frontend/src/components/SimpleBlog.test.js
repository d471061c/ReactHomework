import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {
  const blog = {
    title: 'Simple Blog',
    author: 'Simple Blogger',
    likes: 10
  }

  test('renders content', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog}/>)
    const blogHeader = blogComponent.find('.blog-header')
    const blogLikes = blogComponent.find('.blog-likes')

    expect(blogHeader.text()).toContain(blog.title)
    expect(blogHeader.text()).toContain(blog.author)
    expect(blogLikes.text()).toContain(`blog has ${blog.likes} likes`)
  })

  test('function is called twice when button is pressed twice', () => {
    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const likeButton = blogComponent.find('.like-button')

    likeButton.simulate('click')
    likeButton.simulate('click')
    
    expect(mockHandler.mock.calls.length).toBe(2)
  })
});