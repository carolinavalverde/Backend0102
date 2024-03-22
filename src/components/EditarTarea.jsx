import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { editarTarea, obtenerTareaPorId } from "../helpers/queries";

const EditarTarea = ({ id }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [tarea, setTarea] = useState(null);

  useEffect(() => {
    const cargarTarea = async () => {
      try {
        const tareaData = await obtenerTareaPorId(id);
        if (tareaData) {
          setTarea(tareaData);
          setValue("texto", tareaData.texto);
          setValue("completada", tareaData.completada);
        } else {
          console.error("No se pudo obtener la tarea");
        }
      } catch (error) {
        console.error("Error al obtener la tarea:", error);
      }
    };

    cargarTarea();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const nuevaTarea = { ...tarea, ...data };
      const response = await editarTarea(nuevaTarea, id);
      if (response.ok) {
        Swal.fire({
          title: "Tarea editada",
          text: "La tarea ha sido editada correctamente",
          icon: "success",
        });
      } else {
        throw new Error("Error al editar la tarea");
      }
    } catch (error) {
      console.error("Error al editar la tarea:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al editar la tarea. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  if (!tarea) {
    return <p>Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="texto" className="form-label">
          Texto de la tarea
        </label>
        <input
          type="text"
          className="form-control"
          id="texto"
          {...register("texto", { required: "Este campo es obligatorio" })}
        />
        {errors.texto && <p className="text-danger">{errors.texto.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="completada" className="form-label">
          Completada
        </label>
        <select
          className="form-select"
          id="completada"
          {...register("completada")}
        >
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
};

export default EditarTarea;
