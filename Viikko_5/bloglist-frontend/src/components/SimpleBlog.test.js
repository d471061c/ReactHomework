import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {
  test('renders content', () => {
    const blog = {
      title: 'Simple Blog',
      author: 'Simple Blogger',
      likes: 10
    }

    const blogComponent = shallow(<SimpleBlog blog={blog}/>)
    const blogHeader = blogComponent.find('.blog-header')
    const blogLikes = blogComponent.find('.blog-likes')

    expect(blogHeader.text()).toContain(blog.title)
    expect(blogHeader.text()).toContain(blog.author)
    expect(blogLikes.text()).toContain(`blog has ${blog.likes} likes`)
  })
});