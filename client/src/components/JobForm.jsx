import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const today = () =>{
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  return dateStr;
}

const JobForm = ({ initialData = null, onSubmit, onCancel,  isEditing = false}) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    status: 'Applied',
    notes: '',
    appliedDate: today()
  });

  useEffect (() => {
    if(initialData) {
      setFormData({
        title: initialData.title || '',
        company: initialData.company || '',
        status: initialData.status || '',
        notes: initialData.notes || '',
        appliedDate: initialData.appliedDate || today()
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

  return (
    <Container className="mt-5">
      <h2>Add New Job Application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" name="company" value={formData.company} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={formData.status} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Ghosted">Ghosted</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" name="notes" rows={3} value={formData.notes} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Applied Date</Form.Label>
          <Form.Control type='date' name="appliedDate" value={formData.appliedDate} onChange={handleChange}/>
        </Form.Group>
        <Button type="submit" variant="primary">{isEditing ? 'Save Changes' : 'Submit'}</Button>
        <Button variant="secondary" onClick={onCancel}>
          ← Back
        </Button>
      </Form>
    </Container>
  );
};

export default JobForm;
