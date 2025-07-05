import React from 'react';
import { Modal } from 'react-bootstrap';
import JobForm from './JobForm';

const EditJobModal = ({ job, onClose, onSave }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <JobForm
          initialData={job}
          onSubmit={(updatedJob) => {
            onSave({ ...updatedJob, id: job.id});
          }}
          onCancel={onClose}
          isEditing={true}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditJobModal;
