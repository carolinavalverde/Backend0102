import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import TodoApp from "./components/ToDoApp.jsx";
import EditarTarea from "./components/EditarTarea.jsx";

function App() {
  return (
    <Router>
      <section className="container m-3 d-flex justify-content-center">
        <div className="col-8">
          <div className="card shadow rounded pb-5 pe-3">
            <Routes>
              <Route path="/" element={<TodoApp />} />
              <Route path="/editar/:id" element={<EditarTarea />} />
            </Routes>
          </div>
        </div>
      </section>
    </Router>
  );
}

export default App;

