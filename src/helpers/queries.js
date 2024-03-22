import Swal from "sweetalert2";

const mostrarAlertaError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
};

const APITareas = import.meta.env.VITE_API_TAREAS;

export const obtenerTareas = async () => {
  try {
    const response = await fetch(APITareas);
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
    const response = await fetch(APITareas, {
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
    const response = await fetch(`${APITareas}/${id}`, {
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

export const editarTarea = async (tareaEditada, id) => {
  try {
    const respuesta = await fetch(APITareas + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaEditada),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarTarea = async (id) => {
  try {
    const response = await fetch(`${APITareas}/${id}`, {
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

export const obtenerTareaPorId = async (id) => {
  try {
    const response = await fetch(APITareas + "/" + id);
    if (response.status === 200) {
      const tareaData = await response.json();
      console.log("Tarea obtenida por ID:", tareaData);
      return tareaData; 
    } else {
      console.error("Error al obtener la tarea:", response.statusText);
    }
    return null; 
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    throw new Error("Error al obtener la tarea");
  }
};
