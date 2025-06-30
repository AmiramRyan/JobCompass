import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';

//TODO: Get from API
const allJobs = [
  { id: 1, title: "Frontend Developer", company: "Acme Corp", status: "applied", appliedDate: "2025-06-15" },
  { id: 2, title: "Backend Developer", company: "TechInc", status: "interviewing", appliedDate: "2025-06-12" },
  { id: 3, title: "UI/UX Designer", company: "Designify", status: "rejected", appliedDate: "2025-06-10" },
  { id: 4, title: "DevOps Engineer", company: "CloudCo", status: "ghosted", appliedDate: "2025-06-05" },
  { id: 5, title: "Software Engineer", company: "StartupX", status: "applied", appliedDate: "2025-06-20" }
];

function Dashboard() {
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    status: 'all'
  });

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    const filteredJobs = allJobs.filter(job => {
      const matchesStatus =
        newFilters.status.length === 0 || newFilters.status.includes(job.status);

      return (
        (newFilters.title === '' || job.title.toLowerCase().includes(newFilters.title.toLowerCase())) &&
        (newFilters.company === '' || job.company.toLowerCase().includes(newFilters.company.toLowerCase())) &&
        matchesStatus
      );
    });

    setFilteredJobs(filteredJobs);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">🧭 JobCompass Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-briefcase-fill display-4 mb-2"></i>
              <h5 className="card-title">Total Applications</h5>
              <p className="card-text display-6">12</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-calendar-event-fill display-4 mb-2"></i>
              <h5 className="card-title">Interviews</h5>
              <p className="card-text display-6">4</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-trophy-fill display-4 mb-2"></i>
              <h5 className="card-title">Offers</h5>
              <p className="card-text display-6">1</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-x-octagon-fill display-4 mb-2"></i>
              <h5 className="card-title">Rejected</h5>
              <p className="card-text display-6">3</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-secondary shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-question-circle-fill display-4 mb-2"></i>
              <h5 className="card-title">Ghosted</h5>
              <p className="card-text display-6">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* FilterBar*/}
      <FilterBar onFilterChange={handleFilterChange} />

      {/*Filtered job results*/}
      {filteredJobs.length === 0 ? (
        <div className="alert alert-warning text-center">
          No jobs found with the selected filters.
        </div>
      ) : (
        <div className="row g-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="col-md-4">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}

      {/*New Application Btn*/}
      <div className="text-center mt-5">
        <Link to="/add-job" className="btn btn-outline-primary btn-lg">
          <i className="bi bi-plus-circle me-2"></i>Add New Application
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
