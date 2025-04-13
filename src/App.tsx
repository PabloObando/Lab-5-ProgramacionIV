import { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  description: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

function App() {
  const [todoDescription, setTodoDescription] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value);
  };

  const handleClick = () => {
    if (!todoDescription.trim()) return;
    const newTodo: Todo = {
      description: todoDescription,
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    setTodoList(prevList => sortTodos([...prevList, newTodo]));
    setTodoDescription('');
  };

  const toggleComplete = (index: number) => {
    setTodoList(prevList => {
      const updatedList = [...prevList];
      const item = { ...updatedList[index] };
      item.completed = !item.completed;
      item.completedAt = item.completed ? new Date().toLocaleString() : undefined;
      updatedList[index] = item;
      return sortTodos(updatedList);
    });
  };

  const handleDelete = (index: number) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditText(todoList[index].description);
  };

  const handleSaveEdit = (index: number) => {
    if (!editText.trim()) return;
    const updatedList = [...todoList];
    updatedList[index].description = editText;
    setTodoList(sortTodos(updatedList));
    setEditIndex(null);
    setEditText('');
  };

  const sortTodos = (todos: Todo[]) => {
    return todos.sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  };

  const resetList = () => {
    setTodoList([]);
    localStorage.removeItem('todos');
  };

  return (
    <div className="todo-container">
      <div className="todo-input">
        <h1>Add ToDo</h1>
        <input
          type='text'
          value={todoDescription}
          onChange={handleChange}
        />
        <button className="add-btn" onClick={handleClick}>Add Item</button>
        <button className="reset-btn" onClick={resetList}>Reset List</button>
      </div>

      <div><h1>ToDos Here:</h1></div>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                {todo.description} (Created: {todo.createdAt})
                {todo.completed && <span> (Completed: {todo.completedAt})</span>}
                <button onClick={() => handleEdit(index)} style={{ marginLeft: 10 }}>Edit</button>
                <button onClick={() => handleDelete(index)} style={{ marginLeft: 10 }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

