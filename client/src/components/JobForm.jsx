import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const today = () =>{
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  return dateStr;
}
const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    status: 'Applied',
    notes: '',
    appliedDate: today()
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const res = await fetch('/jobs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      
      if(!res.ok) throw new Error('Failed to submit');
      const newJob = await res.json();
      console.log('Job Created', newJob);
      
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Job creation failed');
    }
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
        <Button type="submit" variant="primary">Submit</Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Form>
    </Container>
  );
};

export default JobForm;
