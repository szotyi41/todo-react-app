import { request } from 'react-request-hook';

const Api = {
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
    addTodo: ({ title, body}) => {
        return request({
            method: 'post',
            url: '/todos/',
            data: {
                title: title,
                body: body
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

export default Api;