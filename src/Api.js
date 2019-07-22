import { request } from 'react-request-hook';

export const fetch = (response, success, error) => {
    if (response.data) success(response)
    if (response.error) error(response)
}

export const api = {
    getTodos: () => {
        return request({
            method: 'get',
            url: '/todos'
        })
    },
    removeTodo: (id) => {
        return request({
            method: 'delete',
            url: '/todos/' + id
        })
    },
    addTodo: ({ title, body, tags }) => {
        return request({
            method: 'post',
            url: '/todos/',
            data: {
                title: title,
                body: body,
                tags: tags
            }
        })
    },
    completeTodo: (id) => {
        return request({
            method: 'get',
            url: '/todos/complete/' + id
        })
    }
}