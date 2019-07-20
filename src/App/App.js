import React, { useState } from 'react';
import TodoList from '../TodoList/TodoList';
import AddTodo from '../AddTodo/AddTodo';
import { TodosContext } from '../Context/Todos';

function App() {

	const [todos, setTodos] = useState([])

	return (
		<div className="App">
			<TodosContext.Provider value={[todos, setTodos]}>
				<AddTodo></AddTodo>
				<TodoList></TodoList>
			</TodosContext.Provider>
		</div>
	);
}

export default App;
