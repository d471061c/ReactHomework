const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/Blog')


beforeAll(async () => {
  await Blog.remove({})
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('adding blog returns JSON', async () => {
  const example = {
    title: 'Example Blog 1',
    author: 'Example Author',
    url: 'http://www.example.com',
    likes: 2000
  }

  await api
    .post('/api/blogs')
    .send(example)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const result = await Blog.find({})
  expect(result.map(blog => blog.title)[0])
    .toEqual(example.title)
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

afterAll(() => {
  server.close()
})