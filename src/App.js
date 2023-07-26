import React, { useState, useEffect, Fragment } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => setTodos(res.data));
  }, []);

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  return (
  <Fragment>
    <select onChange={(e) => setTodosPerPage(e.target.value)}>
      <option value='10'>10</option>
      <option value='25'>25</option>
      <option value='50'>50</option>
    </select>
    <div>
      {visibleTodos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <span onClick={prevPageHandler}>Prev</span>
      <p>
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${currentPage === page ? 'active' : ''}`}>
              {`${page} | `}
          </span>
        ))}
      </p>
      <span onClick={nextPageHandler}>Next</span>
    </div>
    <select onChange={(e) => setTodosPerPage(e.target.value)}>
      <option value='10'>10</option>
      <option value='25'>25</option>
      <option value='50'>50</option>
    </select>
  </Fragment>);
}

export default App;
