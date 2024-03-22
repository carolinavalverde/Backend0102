import React, { useState } from "react";
import Swal from "sweetalert2";
import { actualizarTarea } from "../helpers/queries";

const EditarTareaModal = ({ tareaEditando, cerrarModalEditarTarea, setTareas }) => {
  console.log("Tarea editando:", tareaEditando);
  const [textoTareaEditando, setTextoTareaEditando] = useState(tareaEditando.texto);

  const editarTarea = async () => {
    if (textoTareaEditando.trim() !== "") {
      const tareaActualizada = await actualizarTarea(tareaEditando.id, {
        ...tareaEditando,
        texto: textoTareaEditando,
      });
      if (tareaActualizada) {
        setTareas((prevTareas) =>
          prevTareas.map((tarea) =>
            tarea.id === tareaEditando.id ? tareaActualizada : tarea
          )
        );
        cerrarModalEditarTarea();
        Swal.fire("Editada", "La tarea ha sido editada", "success");
      } else {
        Swal.fire("Error", "Hubo un problema al editar la tarea", "error");
      }
    }
  };

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Tarea</h5>
            <button
              type="button"
              className="btn-close"
              onClick={cerrarModalEditarTarea}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              value={textoTareaEditando}
              onChange={(e) => setTextoTareaEditando(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cerrarModalEditarTarea}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={editarTarea}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarTareaModal;
