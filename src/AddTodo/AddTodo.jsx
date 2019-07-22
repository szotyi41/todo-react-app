import React, { useState, useContext, useEffect } from 'react';
import { TodosContext } from '../Context/TodosContext';
import { useResource } from 'react-request-hook';
import { api, fetch } from '../Api';

import Select from 'reactize-selectize';


const AddTodo = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [todos, setTodos] = useContext(TodosContext)

    const [todosResponse, getTodosRequest] = useResource(api.getTodos)
    const [addTodoResponse, addTodoRequest] = useResource(api.addTodo)

    const tagOptions = {
        onChange: (value) => setTags(value),
        plugins: ['remove_button'],
        create: true
    }

    const defaultTags = [
        <option value="home" key={1}>Home</option>,
        <option value="work" key={2}>Work</option>,
        <option value="children" key={3}>Children</option>,      
    ]

    // Send get todos request
    useEffect(() => {
        getTodosRequest()
    }, [getTodosRequest])

    // Catch get todos response
    useEffect(() => {
        const response = todosResponse
        fetch(response, () => {
            setTodos(response.data)
        }, () => {
            alert('Cannot get todos: ' + response.error.message)
        })
    }, [setTodos, todosResponse, todosResponse.data, todosResponse.error])

    // Send add todo request
    const addTodo = () => {
        const todo = {
            title: title,
            body: body,
            tags: tags
        }
        addTodoRequest(todo)
    }

    // Catch add todo response
    useEffect(() => {
        const response = addTodoResponse
        fetch(addTodoResponse, () => {
            setTitle('')
            setBody('')
            setTags([])
            setTodos(response.data)
        }, () => {
            alert('Cannot send todo: ' + response.error.message)
        })

    }, [setTodos, addTodoResponse.data, addTodoResponse])

    return (
        <div>
            <div className="input-block">
                <label>Title</label>
                <input type="text" className="input-prm" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title"></input>
            </div>

            <div className="input-block">
                <label>Body</label>
                <textarea type="text" className="input-prm" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Body"></textarea>
            </div>

            <div className="input-block">
                <label>Tags</label>
                <Select options={tagOptions} placeholder="Tags" multiple>
                    {defaultTags}
                </Select>
            </div>
            <button className="button-blue" onClick={() => addTodo()}>Add</button>
        </div>
    )

}

export default AddTodo;