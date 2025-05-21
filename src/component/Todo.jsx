import React, { useState } from 'react';

export const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddToDo = () => {
        if (inputValue.trim() === '') return;

        if (editIndex !== null) {
            const updateTodos = todos.map((todo, index) =>
                index === editIndex ? { text: inputValue, completed: false } : todo
            );
            setTodos(updateTodos);
            setEditIndex(null);
        } else {
            setTodos([...todos, { text: inputValue, completed: false }]);
        }

        setInputValue('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDeleteTodo = (index) => {
        const updateTodos = todos.filter((_, i) => i !== index);
        setTodos(updateTodos);
    };

    const handleEditTodo = (index) => {
        setInputValue(todos[index].text);
        setEditIndex(index);
    };

    const toggleCompleted = (index) => {
        const updateTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updateTodos);
    };

    return (
        <main className="container mt-5 p-5">
            <div className="text-center mb-4">
                <h3>The TODO Application</h3>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="input-group mb-4">
                        <input
                            className="form-control"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Add a new todo..."
                        />
                        <button onClick={handleAddToDo} className="btn btn-primary">
                            {editIndex === null ? 'Add' : 'Update Todo'}
                        </button>
                    </div>
                </div>
            </div>

            <ul className="list-group mx-auto" style={{ maxWidth: "600px" }}>
                {todos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                                flex: 1
                            }}
                            onClick={() => toggleCompleted(index)}
                        >
                            {todo.text}
                        </span>
                        <div>
                            <button onClick={() => handleEditTodo(index)} className="btn btn-warning btn-sm me-2">
                                Edit
                            </button>
                            <button onClick={() => handleDeleteTodo(index)} className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
};
