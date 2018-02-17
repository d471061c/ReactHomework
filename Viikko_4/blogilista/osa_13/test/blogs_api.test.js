const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/Blog')

let initialBlogs = [
  {
    title: 'Initial Blog',
    author: 'Blogger',
    likes: 0,
    url: 'http://www.example.com'
  }
]

beforeAll(async () => {
  helper.clearDb()
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('adding blog returns JSON', async () => {
  const newBlog = {
    title: 'Example Blog 1',
    author: 'Unknown',
    likes: 0,
    url: 'http://www.example.com'
  }

  const blogsBefore = await helper.blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()

  expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  expect(blogsAfter).toContainEqual(newBlog)
})

test('adding blog sets likes to zero if undefined', async () => {
  const example = {
    title: 'Example Blog 2',
    author: 'Unknown',
    url: 'http://www.example.com'
  }
  const result = await api
    .post('/api/blogs')
    .send(example)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(result.body.likes).toBe(0)

})

test('adding blog without title returns a bad request status', async () => {
  const example = {
    author: 'Unknown',
    url: 'http://www.example.com'
  }

  await api
    .post('/api/blogs')
    .send(example)
    .expect(400)
})

test('adding blog without url returns a bad request status', async () => {
  const example = {
    title: 'Example Blog 2',
    author: 'Unknown'
  }

  await api
    .post('/api/blogs')
    .send(example)
    .expect(400)
})

describe('Deleting a blog', async () => {
  let blogObjects

  beforeAll(async () => {
    await helper.clearDb()
    blogObjects = initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })

  test('deletes an existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogObjects[0].id}`)
      .expect(204)
    const blogsAfterDeletion = await helper.blogsInDb()

    expect(blogsAfterDeletion.length).toBe(blogsAtStart.length - 1)
  })
})

afterAll(() => {
  server.close()
})