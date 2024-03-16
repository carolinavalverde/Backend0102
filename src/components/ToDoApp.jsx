import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/App.css";
import {
  obtenerTareas,
  agregarTarea as agregarNuevaTarea,
  actualizarTarea,
  eliminarTarea as eliminarUnaTarea,
} from "../helpers/queries.js";

function TodoApp() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  useEffect(() => {
    const cargarTareas = async () => {
      const tareasDesdeAPI = await obtenerTareas();
      setTareas(tareasDesdeAPI);
    };
    cargarTareas();
  }, []);

  const agregarTarea = async () => {
    if (nuevaTarea.trim() !== "") {
      const tareaNueva = { texto: nuevaTarea, completada: false };
      const tareaAgregada = await agregarNuevaTarea(tareaNueva);
      if (tareaAgregada) {
        setTareas([...tareas, tareaAgregada]);
        setNuevaTarea("");
      }
    }
  };

  const marcarComoHecha = async (id) => {
    const tareaActualizada = await actualizarTarea(id, {
      ...tareas.find((tarea) => tarea.id === id),
      completada: !tareas.find((tarea) => tarea.id === id).completada,
    });
    if (tareaActualizada) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        )
      );
    }
  };

  const eliminarTareasCompletadas = async () => {
    const tareasNoCompletadas = tareas.filter((tarea) => !tarea.completada);
    const tareasEliminadas = tareas.filter((tarea) => tarea.completada);
    tareasEliminadas.forEach(async (tarea) => {
      await eliminarUnaTarea(tarea.id);
    });
    setTareas(tareasNoCompletadas);
  };

  return (
    <div className="container m-2 p-3">
      <h1 className="text-center text-bg-dark bg-warning fw-bold rounded p-2">
        To Do List
      </h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Agregue una tarea"
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
