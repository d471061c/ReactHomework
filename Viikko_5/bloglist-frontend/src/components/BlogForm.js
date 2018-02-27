import React from 'react'

const BlogForm = ({onSubmit, title, author, url, handleInput}) => (
  <div>
    <h3>Create new</h3>
    <form onSubmit={onSubmit}>
      <div>
        title:
        <input type="text"
              name="title"
              value={title}
              onChange={handleInput}/>
      </div>
      <div>
        author:
        <input type="text"
              name="author"
              value={author}
              onChange={handleInput}/>
      </div>
      <div>
        url:
        <input type="text"
              name="url"
              value={url}
              onChange={handleInput}/>
      </div>
      <button type="submit">Create blog</button>
    </form>
  </div>
)

export default BlogForm