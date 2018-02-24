
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')

beforeAll(async () => {
  await helper.clearUserDb()
})

describe('Registeration', async () => {
  beforeAll(async () => {
    await helper.clearUserDb()
  })

  test('with short password fails', async () => {
    const userWithBadPassword = {
      username: 'MyPasswordIsSmileyface',
      password: ':)',
      name: 'Bad User',
      adult: false
    }

    const usersInDb = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(userWithBadPassword)
      .expect(500)

    const userInDbAfter = await helper.usersInDb()

    expect(result.body).toEqual({ error : 'Too short password' })
    expect(usersInDb.length).toBe(userInDbAfter.length)
  })

  test('with non-unique user fails', async () => {
    const testUser = {
      username: 'UsernameTaken',
      password: 'somepassword',
      name: 'Test User',
      adult: false
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(200)

    const result = await api
      .post('/api/users')
      .send(testUser)
      .expect(500)

    expect(result.body).toEqual({ error : 'Username taken' })
  })

  test('sets adult field true as default', async () => {
    const basicUser = {
      username: 'BasicUser',
      password: 'somepassword',
      name:'Basic User'
    }

    const response = await api
      .post('/api/users')
      .send(basicUser)

    expect(response.body.adult).toBe(true)
  })
})

afterAll(() => {
  server.close()
})
