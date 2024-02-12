import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {

    const blog = {
        author: 'Test Author',
        title: 'Component testing is done with react-testing-library',
        url: 0,
        likes: 5,
        creator: 'Test Creator'
        },
        user = {
            username: 'Test Creator'
        }

    test('renders blog wo extra data', () => {

        const { container } = render(<Blog blog={blog} user={user}/>)
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle({
            display: 'none'
        })
    })

    test('URL and likes are shown when the button clicked',async () => {

        const { container } = render(<Blog blog={blog} user={user}/>)
        const action = userEvent.setup()
        const button = screen.getByText('view')
        await action.click(button)
        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking the like button twice calls event handler twice',async () => {
        const mockHandler = jest.fn()
        render(<Blog blog={blog} user={user} likeBlog={mockHandler}/>)
        const action = userEvent.setup()
        const viewButton = screen.getByRole('button', { name: 'view' })
        await action.click(viewButton)
        const likeButton = screen.getByLabelText('like')
        await action.click(likeButton)
        await action.click(likeButton)

        expect(mockHandler).toHaveBeenCalledTimes(2)
    })
    
    test('new blog form calls event handler with the right details',async () => {
        const mockHandler = jest.fn()
        render(<BlogForm user={user} blogs={[]} addBlog={mockHandler}/>)
        const action = userEvent.setup()
        const titleInput = screen.getByPlaceholderText('title')
        await action.type(titleInput, 'TITLE TEST')
        const authorInput = screen.getByPlaceholderText('author')
        await action.type(authorInput, 'AUTHOR TEST')
        const urlInput = screen.getByPlaceholderText('url')
        await action.type(urlInput, 'URL TEST')
        const sendButton = screen.getByText('create')
        await action.click(sendButton)
        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].title).toBe('TITLE TEST')
    })
})   
