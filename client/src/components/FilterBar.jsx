import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'ghosted', label: 'Ghosted' }
];

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        title: '',
        company: '',
        status: []
    });

    const handleInputChange  = (e) => {
        const {name, value, multiple, options} = e.target;
        
        if (multiple) {
          const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);

          setFilters({
            ...filters,
            [name]: selectedOptions
          });
        } else {
          setFilters({
            ...filters,
            [name]: value
          });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const handleClear = () => {
      const clearedFilters = {
        title: '',
        company: '',
        status: []
      };
      setFilters(clearedFilters);
      onFilterChange(clearedFilters);
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
          <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Select
            isMulti
            name="status"
            options={statusOptions}
            value={statusOptions.filter(opt => filters.status.includes(opt.value))}
            onChange={(selectedOptions) =>
              setFilters({ ...filters, status: selectedOptions.map(opt => opt.value) })
            }
            />
          </Form.Group>
        </div>
      </div>

      <Button variant="primary" type="submit" className="mt-3 me-2">
        Apply Filters
      </Button>

      <Button variant="secondary" type="button" className="mt-3" onClick={handleClear}>
        Clear Filters
      </Button>
    </Form>
  );
};

export default FilterBar;