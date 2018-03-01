import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog/>', () => {
  test('renders contents', () => {
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

    const blogComponent = shallow(<Blog blog={blog} onLike={blank} onDelete={blank} currentUser={user}/>)
    
    const blogCard= blogComponent.find('.blog')
    const blogContent = blogComponent.find('.blog-content')
    const blogHeader = blogComponent.find('.blog-header')
    
    const blogLikes = blogComponent.find('.blog-likes')

    expect(blogHeader.text()).toContain(blog.title)
    expect(blogHeader.text()).toContain(blog.author)
    expect(blogContent.getElement().props.style).toEqual({ display: 'none' })
  })


});