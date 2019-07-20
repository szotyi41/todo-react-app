import React, { useState, useContext, useEffect } from 'react';
import { TodosContext } from '../Context/TodosContext';
import { useResource } from 'react-request-hook';
import Api from '../Api';

const AddTodo = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [todos, setTodos] = useContext(TodosContext)

    const [todosResponse, getTodosRequest] = useResource(Api.getTodos)
    const [addTodoResponse, addTodoRequest] = useResource(Api.addTodo)

    // Send get todos request
    useEffect(() => {
        getTodosRequest()
    }, [getTodosRequest])

    // Catch get todos response
    useEffect(() => {
        if (todosResponse.data) {
            setTodos(todosResponse.data)
        }
    }, [setTodos, todosResponse.data])

    // Send add todo request
    const addTodo = () => {
        const todo = {
            title: title,
            body: body
        }
        addTodoRequest(todo)
    }

    // Catch add todo response
    useEffect(() => {
        if (addTodoResponse.data) {
            setTodos(addTodoResponse.data)
        }
    }, [setTodos, addTodoResponse.data])

    return (
        <div>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title"></input>
            <input type="text" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Body"></input>
            <button onClick={() => addTodo()}>Add</button>
        </div>
    )

}

export default AddTodo;