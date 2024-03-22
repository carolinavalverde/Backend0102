import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/App.css";
import Swal from "sweetalert2";
import {
  obtenerTareas,
  agregarTarea,
  actualizarTarea,
  eliminarTarea,
} from "../helpers/queries.js";
import EditarTarea from "../components/EditarTarea.jsx";

function TodoApp() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tareaEditando, setTareaEditando] = useState(null);

  useEffect(() => {
    const cargarTareas = async () => {
      const tareasDesdeAPI = await obtenerTareas();
      setTareas(tareasDesdeAPI);
    };
    cargarTareas();
  }, []);

  const agregarNuevaTarea = async () => {
    if (nuevaTarea.trim() !== "") {
      const tareaNueva = { texto: nuevaTarea, completada: false };
      const tareaAgregada = await agregarTarea(tareaNueva);
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
      setTareas((prevTareas) =>
        prevTareas.map((tarea) =>
          tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        )
      );
    }
  };

  const eliminarTareaPorId = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "La tarea se eliminará permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirmacion.isConfirmed) {
      const eliminada = await eliminarTarea(id);
      if (eliminada) {
        setTareas((prevTareas) =>
          prevTareas.filter((tarea) => tarea.id !== id)
        );
        Swal.fire("Eliminada", "La tarea ha sido eliminada", "success");
      } else {
        Swal.fire("Error", "Hubo un problema al eliminar la tarea", "error");
      }
    }
  };

  const abrirModalEditarTarea = (tarea) => {
    setTareaEditando(tarea);
    console.log("ID de tarea editando:", tarea.id);
  };

  const cerrarModalEditarTarea = () => {
    setTareaEditando(null);
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
        <button className="btn btn-warning mb-3" onClick={agregarNuevaTarea}>
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
              <div className="ms-auto">
                <button
                  className="btn btn-outline-primary mx-2 my-1"
                  onClick={() => abrirModalEditarTarea(tarea)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger mx-2 my-1"
                  onClick={() => eliminarTareaPorId(tarea.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tareaEditando && (
        <EditarTarea
          tarea={tareaEditando}
          cerrarModalEditarTarea={cerrarModalEditarTarea}
        />
      )}
    </div>
  );
}

export default TodoApp;