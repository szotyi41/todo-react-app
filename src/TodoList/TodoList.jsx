import React, {useState, useEffect, useContext} from 'react';
import { useResource } from 'react-request-hook';
import Api from './../Api.js';
import './TodoList.css';
import { TodosContext } from '../Context/Todos';

const TodoList = () => {

    const [todos, setTodos] = useContext(TodosContext)

    const [removeTodoResponse, removeTodoRequest] = useResource(Api.removeTodo)
    const [completeTodoResponse, completeTodoRequest] = useResource(Api.completeTodo)
    
    // Catch remove response
    useEffect(() => {
        if (removeTodoResponse.data) {
            setTodos(removeTodoResponse.data)
        }
    })

    // Catch complete response
    useEffect(() => {
        if (completeTodoResponse.data) {
            setTodos(completeTodoResponse.data)
        }
    })

    if (todos.length) {
        return (
            <div className="todos">
                {todos.map(todo => 
                    <div key={todo.id} className="todo-item">
                        <div className="todo-title">{todo.title}</div>
                        <div className="todo-body">{todo.body}</div>
                        <div className="todo-complete" onClick={() => completeTodoRequest(todo.id)}>{todo.completed === true ? 'Pending' : 'Completed'}</div>
                        <div className="todo-remove" onClick={() => removeTodoRequest(todo.id)}></div>
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