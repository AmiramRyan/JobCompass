import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FilterBar = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        title: '',
        company: '',
        status: 'all'
    });

    const handleInputChange  = (e) => {
        const {name, value} = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-3">
          <Form.Group controlId="formTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title"
              name="title"
              value={filters.title}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <div className="col-md-3">
          <Form.Group controlId="formCompany">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              name="company"
              value={filters.company}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <div className="col-md-3">
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <div className="col-md-3">
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={filters.status}
              onChange={handleInputChange}
            >
              <option value="all">All</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="ghosted">Ghosted</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <Button variant="primary" type="submit" className="mt-3">
        Apply Filters
      </Button>
    </Form>
  );
};

export default FilterBar;