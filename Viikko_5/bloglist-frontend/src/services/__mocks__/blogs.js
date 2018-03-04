let token = null

const blogs = [
  {
      "__v": 0,
      "_id": "5a9821c5915841264fe3ec2e",
      "author": "Author",
      "likes": 24,
      "title": "Hello World",
      "url": "http://www.google.com",
      "user": {
          "_id": "5a91979cec5591464d84804e",
          "name": "Tester",
          "username": "username"
      }
  },
  {
      "__v": 0,
      "_id": "5a98226b915841264fe3ec30",
      "author": "lol",
      "likes": 18,
      "title": "example",
      "url": "lol",
      "user": {
          "_id": "5a91979cec5591464d84804e",
          "name": "Tester",
          "username": "username"
      }
  },
  {
      "__v": 0,
      "_id": "5a9a986b6cff5e12006bec55",
      "author": "blah",
      "likes": 19,
      "title": "New Blog",
      "url": "www.google.com",
      "user": {
          "_id": "5a91979cec5591464d84804e",
          "name": "Tester",
          "username": "username"
      }
  }
]


const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}


export default { getAll, blogs, setToken }