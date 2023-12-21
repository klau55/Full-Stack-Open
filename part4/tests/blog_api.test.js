const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const initialBlogs2 = [
      {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      }]

beforeEach(async () => {
    await Blog.deleteMany({})
    let i = 0
    while (initialBlogs2[i])
    {
      let blogObject = new Blog(initialBlogs2[i])
      await blogObject.save()
      i++
    }
    })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs2.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      "React patterns"
    )
  })  
  test('blogs have specific id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()
  })
  test('a new blog gets added', async () => {
    const newBlog =
    {
      id: "123",
      title: "test",
      author: "test",
      url: "t",
      likes: 123,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('test')
  })
  test('likes are defined or set to 0', async () => {
    const newBlog =
    {
      id: "123",
      title: "test",
      author: "test",
      url: "t",
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

      const response = await api.get('/api/blogs')
      const likes = response.body.map(r => r.likes)
      expect(likes).not.toContain(undefined)
  })
  test('if title or url missing get error 400', async () => {
    const newBlog =
    {
      author: 'Random Author',
      likes: 4
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  