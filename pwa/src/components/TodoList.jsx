import React, { useState, useEffect } from "react";
import { todosAPI } from "../api/apiService";
import SkeletonTodoItem from "./SkeletonTodoItem";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todosAPI.getTodos();
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const response = await todosAPI.addTodo(newTodo.trim());
      setTodos(response.data);
      setNewTodo("");
    } catch (err) {
      setError("Failed to add todo");
      console.error("Error adding todo:", err);
    }
  };

  const deleteTodo = async (index) => {
    try {
      const response = await todosAPI.deleteTodo(index);
      setTodos(response.data);
    } catch (err) {
      setError("Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  if (loading) {
    return (
      <div className="todo-list">
        <h2>Todo List</h2>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <div className="todos">
          {[...Array(4)].map((_, index) => (
            <SkeletonTodoItem key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Todo List</h2>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="todos">
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          todos.map((todo, index) => (
            <div key={index} className="todo-item">
              <span className="todo-text">{todo}</span>
              <button onClick={() => deleteTodo(index)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
