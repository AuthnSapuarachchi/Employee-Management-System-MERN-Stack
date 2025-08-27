import React, { useState } from 'react';
import AddDepartmentModal from './AddDepartmentModal.jsx';

const AddDepartment = ({ onDepartmentAdded }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Add Department
      </button>
      <AddDepartmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDepartmentAdded={onDepartmentAdded}
      />
    </div>
  );
};

export default AddDepartment;
