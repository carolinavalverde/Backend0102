import Swal from "sweetalert2";

const mostrarAlertaError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
};

const API_URL = import.meta.env.VITE_API_TAREAS;

export const obtenerTareas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    mostrarAlertaError(error.message);
    return [];
  }
};

export const agregarTarea = async (nuevaTarea) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaTarea),
    });
    if (!response.ok) {
      throw new Error("Error al agregar la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    mostrarAlertaError(error.message);
    return null;
  }
};

export const actualizarTarea = async (id, tareaActualizada) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaActualizada),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    mostrarAlertaError(error.message);
    return null;
  }
};

export const eliminarTarea = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }
    return true;
  } catch (error) {
    console.error("Error:", error);
    mostrarAlertaError(error.message);
    return false;
  }
};
