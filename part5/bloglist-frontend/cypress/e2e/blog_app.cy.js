describe('Blog app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Blogs')
  })
  it('login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })
})
describe('Login',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tester',  username: 'tester', password: '123'
    }
    const user2 = {
      name: 'tester2',  username: 'tester2', password: '123'
    }
    cy.request('POST', `http://localhost:3003/api/users`, user)
    cy.request('POST', `http://localhost:3003/api/users`, user2)
    cy.visit('http://localhost:5173')
  })
  it('succeeds with correct credentials', function() {
    cy.get('input:first').type('tester')
    cy.get('input:last').type('123')
    cy.get('#login-button').click()
    cy.contains(' Logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('input:first').type('shit')
    cy.get('input:last').type('shit')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    cy.contains('login')
  })
  it('A blog can be created', function() {
    cy.login({ username: 'tester', password: '123' })
    cy.contains('new blog').click()
    cy.get('#title').type('Ass')
    cy.get('#author').type('Tron')
    cy.get('#url').type('Aud')
    cy.get('#submit-button').click()
    cy.contains('Added new blog')
    cy.contains('Ass by Tron')
  })
  it('A blog can be liked', function() {
    cy.login({ username: 'tester', password: '123' })
    cy.contains('new blog').click()
    cy.get('#title').type('Ass')
    cy.get('#author').type('Tron')
    cy.get('#url').type('Aud')
    cy.get('#submit-button').click()
    cy.contains('Added new blog')
    cy.contains('Ass by Tron')
    cy.contains('view').click()
    cy.contains('likes: 0')
    cy.contains('like').click()
    cy.contains('likes: 1')
  })
  it('A blog can be deleted by creator', function() {
    cy.login({ username: 'tester', password: '123' })
    cy.createBlog({title: 'Bible', author: 'Us', url: 'www'})
    cy.contains('view').click()
    cy.contains('delete').click()
    cy.get('html').should('not.contain', "Bible")
  })
  it('A blog can not be deleted by other users', function() {
    cy.login({ username: 'tester', password: '123' })
    cy.createBlog({title: 'Bible', author: 'Us', url: 'www'})
    cy.contains('log out').click()
    cy.login({ username: 'tester2', password: '123' })
    cy.contains('view').click()
    cy.get('html').should('not.contain', "delete")
  })
  it('Blogs are sorted by likes', function() {
    cy.login({ username: 'tester', password: '123' })
    cy.createBlog({title: 'The title with the second most likes', author: 'Number 2', url: 'www', likes: 5})
    cy.createBlog({title: 'The title with the most likes', author: 'Number 1', url: 'www', likes: 10})
    cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
    cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
  })
})
