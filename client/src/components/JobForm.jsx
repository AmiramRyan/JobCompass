import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    status: 'applied',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // TODO: send data to backend
  };
  const navigate = useNavigate();

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
          <Form.Select name="status" value={formData.status} onChange={handleChange} defaultValue={'applied'}>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="ghosted">Ghosted</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" name="notes" rows={3} value={formData.notes} onChange={handleChange} />
        </Form.Group>

        <Button type="submit" variant="primary">Submit</Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Form>
    </Container>
  );
};

export default JobForm;
