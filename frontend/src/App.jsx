import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'var(--primary-gradient)' }}>
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <i className="bi bi-check2-square me-2"></i>
              Administrador de Tareas
            </Link>
          </div>
        </nav>
        <main className="flex-grow-1 app-main">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        </main>
        <footer className="py-3 text-center text-muted">
          <small>Administrador de Tareas © {new Date().getFullYear()}</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;