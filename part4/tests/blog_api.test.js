const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('../utils/list_helper.js')

const User = require('../models/user')
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
  
  test('deletion of a blog', async () => {
    const res = await api.get('/api/blogs')
    await api
     .delete(`/api/blogs/${res.body.find(blog => blog.id).id}`)
     .expect(204)

     const resAfterDel = await api.get('/api/blogs')
     expect(resAfterDel.body).toHaveLength(initialBlogs2.length - 1)
  })

  test('editing of a blog', async () => {
    const res = await api.get('/api/blogs')
    const initialBlog = res.body.find(blog => blog.id)
    const changedBlog = {
      title: initialBlog.title,
      author: initialBlog.author,
      url: initialBlog.url,
      likes: 998
    }

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(changedBlog)
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(changedBlog.likes).toBe(998)
  })




describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})