import React, { useEffect, useContext } from 'react';
import { useResource } from 'react-request-hook';
import { api, fetch } from './../Api.js';
import { TodosContext } from '../Context/TodosContext';

import './TodoList.css';

const TodoList = () => {

    const [todos, setTodos] = useContext(TodosContext)

    const [removeTodoResponse, removeTodoRequest] = useResource(api.removeTodo)
    const [completeTodoResponse, completeTodoRequest] = useResource(api.completeTodo)
    
    // Catch remove response
    useEffect(() => {
        const response = removeTodoResponse
        fetch(response, () => {
            setTodos(response.data)
        }, () => {
            alert('Cannot remove todo: ' + response.error.message)  
        })
    })

    // Catch complete response
    useEffect(() => {
        const response = completeTodoResponse
        fetch(response, () => {
            setTodos(response.data)
        }, () => {
            alert('Cannot set todos status: ' + response.error.message)  
        })
    })

    if (todos.length) {
        return (
            <div className="todos">
                {todos.map(todo => 
                    <div key={todo.id} className={"todo-item " + ( todo.completed ? 'todo-completed' : 'todo-not-completed' )}>
                        <div className="d-flex space-between">

                            <div className="todo-left">
                                <div className="todo-title">{todo.title}</div>
                                <div className="todo-body">{todo.body}</div>
                                <div className="todo-complete">{todo.completed === true ? 'Completed' : 'Pending'}</div>
                                {todo.tags.map(tag => <div className="todo-tag">{tag}</div>)}
                            </div>

                            <div className="todo-right">
                                <label className="switch">
                                    <input type="checkbox" checked={todo.completed} onChange={() => completeTodoRequest(todo.id)}/>
                                    <span className="slider round"></span>
                                </label>
                                <button className="button-red" onClick={() => removeTodoRequest(todo.id)}>Remove</button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="todos-empty">Todos not found</div>
    )
}

export default TodoList;