import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/App.css";

function TodoApp() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      const nuevasTareas = [
        ...tareas,
        { id: Date.now(), texto: nuevaTarea, completada: false },
      ];
      setTareas(nuevasTareas);
      setNuevaTarea("");
      localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    }
  };

  const marcarComoHecha = (id) => {
    const nuevasTareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(nuevasTareas);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
  };

  const eliminarTareasCompletadas = () => {
    const nuevasTareas = tareas.filter((tarea) => !tarea.completada);
    setTareas(nuevasTareas);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
  };

  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasGuardadas);
  }, []);

  return (
    <div className="container m-2 p-3">
      <h1 className="text-center text-bg-dark bg-warning fw-bold rounded p-2">
        To Do List
      </h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Agregue su tarea aquí"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-warning mb-3" onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      {tareas.length === 0 ? (
        <p className="text-center text-warning">No hay tareas por ahora.</p>
      ) : (
        <ul className="list-group">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="list-group-item d-flex align-items-center"
            >
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => marcarComoHecha(tarea.id)}
                className="me-2 border-2 border-warning-subtle"
              />
              <span
                onClick={() => marcarComoHecha(tarea.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: tarea.completada ? "line-through" : "none",
                }}
              >
                {tarea.texto}
              </span>
            </li>
          ))}
        </ul>
      )}

      {tareas.some((tarea) => tarea.completada) && (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success mt-3"
            onClick={eliminarTareasCompletadas}
          >
            Eliminar Tareas hechas
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
