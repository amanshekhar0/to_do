import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; 
import "./App.css";
import axios from "axios";

const Todo = () => {
  const [task, setTask] = useState("");  
  const [todos, setTodos] = useState([]); 

 
  useEffect(() => {
    axios
      .get("http://localhost:8080/todo") 
      .then((response) => {
        setTodos(response.data); 
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
      });
  }, []);

  const addTask = () => {
    if (task) {
      axios
        .post("http://localhost:8080/todo", { task })
        .then((res) => {
          setTodos([...todos, res.data]); 
          setTask(""); 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/todo/${id}`)
      .then(() => {
        const filteredTodos = todos.filter((todo) => todo._id !== id);
        setTodos(filteredTodos);
      })
      .catch((err) => {
        console.log("Error deleting task:", err);
      });
  };

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <div className="input-area">
        <input
          type="text"
          value={task}
          placeholder="Let's do it"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <button className="add-task-btn" onClick={addTask}>
        Add Task
      </button>
      <div className="todo-list">
        <h3>Tasks:</h3>
        {todos.length === 0 ? (
          <div>
            <h2>No tasks available</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              <span>{todo.task}</span>
              <div className="todo-icons">
                <FaTrash className="delete-task" onClick={() => deleteTask(todo._id)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
