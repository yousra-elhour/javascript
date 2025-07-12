import React, { useState } from "react";
import MovieList from "./components/MovieList";
import TodoList from "./components/TodoList";
import FormDemo from "./components/FormDemo";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie & Todo PWA</h1>
        <nav className="app-nav">
          <button
            className={activeTab === "movies" ? "active" : ""}
            onClick={() => setActiveTab("movies")}
          >
            Movies
          </button>
          <button
            className={activeTab === "todos" ? "active" : ""}
            onClick={() => setActiveTab("todos")}
          >
            Todos
          </button>
          <button
            className={activeTab === "forms" ? "active" : ""}
            onClick={() => setActiveTab("forms")}
          >
            Dynamic Forms
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === "movies" && <MovieList />}
        {activeTab === "todos" && <TodoList />}
        {activeTab === "forms" && <FormDemo />}
      </main>
    </div>
  );
};

export default App;
