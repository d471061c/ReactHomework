const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '0',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 13,
        __v: 0
      },
      {
        _id: '1',
        title: 'Go To Statement Considered Harmful (Duplicate 1)',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 31,
        __v: 0
      },
      {
        _id: '2',
        title: 'Go To Statement Considered Harmful (Duplicate 2)',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      },
      {
        _id: '3',
        title: 'Duplicates Considered Harmful',
        author: 'Unknown',
        url: '???',
        likes: 9000,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(9000)
  })
})