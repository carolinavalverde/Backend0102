import React, { useState } from "react";
import "./Styles/App.css";
import TodoApp from "./components/ToDoApp.jsx";
import EditarTareaModal from "./components/EditarTareaModal.jsx";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="container m-3 d-flex justify-content-center">
      <div className="col-8 ">
        <div className="card shadow rounded pb-5 pe-3">
          <TodoApp onEditButtonClick={handleEditButtonClick} />
          {modalOpen && <EditarTareaModal onClose={handleCloseModal} />}
        </div>
      </div>
    </section>
  );
}

export default App;
