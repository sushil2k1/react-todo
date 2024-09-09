import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState("");
  const [text, setText] = useState([]);

  // Load tasks from localStorage 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setText(savedTodos);
    }
  }, []);

  // Save tasks to localStorage 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(text));
  }, [text]);

  function saveTodo() {
    if (value) {
      setText((prev) => [...prev, value]);
      setValue("");
    }
  }

  function deleteTodo(index) {
    return function () {
      setText(text.filter((_, i) => i !== index));
    };
  }

  function updateTodo(index) {
    return () => {
      setText(
        text.map((item, i) => {
          if (i === index) {
            let updatedTask = prompt("Update task", item);
            return updatedTask || item; 
          }
          return item;
        })
      );
    };
  }

  function inputChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <h1 className='heading'>TODO</h1>
      <input onChange={inputChange} placeholder='Enter Task' value={value} />
      <button onClick={saveTodo}>Save</button>
      <ul>
        {text.map((item, index) => (
          <li className='list' onDoubleClick={deleteTodo(index)} key={index}>
            {item} <button onClick={updateTodo(index)}>Update</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
