const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(express.json());
app.use(cors())

let todos = [
    {id: 1, title: 'Title', body: 'Body', completed: false, tags: ['children']},
    {id: 2, title: 'Title 2', body: 'Body 2', completed: false, tags: ['house']}
];

// Get todos
app.get('/todos', (req, res) => {
    console.log('get')
    res.send(todos)
})

// Delete todo
app.delete('/todos/:id', (req, res) => {
    console.log('delete')
    todos = todos.filter(todo => todo.id.toString() !== req.params.id)
    res.send(todos)
})

// Add todo
app.post('/todos/', (req, res) => {
    console.log('adding')
    todos.push({
        id: new Date().getTime().toString(),
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        completed: false
    })
    res.send(todos)
})

// Enable / Disable todo completed status
app.get('/todos/complete/:id', (req, res) => {
    console.log('complete', req.params.id)
    todos = todos.map(todo => {
        if (todo.id.toString() === req.params.id) {
            return { ...todo, completed: !todo.completed }
        }
        return todo
    })
    res.send(todos)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))