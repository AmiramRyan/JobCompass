import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Briefcase, Calendar, MapPin } from 'react-feather';

const statusColors = {
  applied: "primary",
  interviewing: "warning",
  accepted: "success",
  rejected: "danger",
  ghosted: "secondary",
};

const JobCard = ({ job, onDelete }) => {
    const { title, company, status, appliedDate } = job;

    return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title className="mb-1">
              <Briefcase size={18} className="me-2" />
              {title}
            </Card.Title>
            <Card.Subtitle className="text-muted">
              {company} &mdash; <MapPin size={14} className="me-1" />
            </Card.Subtitle>
          </div>
          <Badge bg={statusColors[status.toLowerCase()] || 'dark'} className="text-capitalize">
            {status}
          </Badge>
        </div>
        <div className="mt-2 text-muted">
          <Calendar size={14} className="me-1" />
          Applied: {new Date(appliedDate).toLocaleDateString()}
          <button className="btn btn-danger btn-sm ms-3" onClick={() => onDelete(job.id)}>Delete</button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;