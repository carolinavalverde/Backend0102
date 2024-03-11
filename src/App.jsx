import React from "react";
import "./Styles/App.css";
import TodoApp from "./components/ToDoApp.jsx";

function App() {
  return (
    <section className="container m-3 d-flex justify-content-center">
      <div className="col-8 ">
        <div className="card shadow rounded pb-5 pe-3">
          <TodoApp />
        </div>
      </div>
    </section>
  );
}

export default App;
