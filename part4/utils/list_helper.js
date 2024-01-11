const User = require('../models/user')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce((n, blog) => Number(n) + Number(blog.likes), 0)
  }

const favoriteBlog = (blogs) => {
  return blogs.reduce((res, blog) => Number(res.likes) < Number(blog.likes)?
   blog.likes : res, blogs[0])
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    dummy, totalLikes, favoriteBlog, usersInDb
  }