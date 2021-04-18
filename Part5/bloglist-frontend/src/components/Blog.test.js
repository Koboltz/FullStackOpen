import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog>', () => {
    let component
   

    beforeEach(() => {
        const blog = {
            title: 'test',
            author: 'tester',
            url: 'test.com',
            likes: 25,
            user: {id: '606a0e74fc65720328bda539'}
        }

        const fetchAll = () => {
            console.log('fetched')
        }
        
        const user = {
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ…ePfYlc83w",
            "username":"curtis",
            "name":"curtis a"
        }
        
        const blogs = []

        component = render(
            <Blog blog={blog} fetchAll={fetchAll} user={user} blogs={blogs} />
        )
    })

    test('renders only blog title and author by default', () => {
        
        expect(component.container).toHaveTextContent(
            'test tester'
        )

        expect(component.container).not.toHaveTextContent(
            'test.com'
        )

        expect(component.container).not.toHaveTextContent(
            25
        )

    })

    test('renders additional info when the view button is clicked', () => {
     
        const button = component.getByText('view')
        fireEvent.click(button)
        expect(component.container).toHaveTextContent(
            'test.com'
        )
        expect(component.container).toHaveTextContent(
            'likes: 25'
        )

    })

    test('calls onclick function twice when clicked twice', async () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const mockFn = jest.fn()

        component.container.querySelector('.like-button').append('onClick', mockFn)

        const like = component.container.querySelector('.like-button')
        fireEvent.click(like)
        fireEvent.click(like)

        
        expect(mockFn.mock.calls).toHaveLength(2)

        component.debug()

    })

})