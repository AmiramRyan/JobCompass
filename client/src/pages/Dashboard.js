import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import EditJobModal from '../components/EditJobModal';
import JobForm from '../components/JobForm';

function Dashboard() {
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    status: 'all'
  });

  //States
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [editingJob, setEditingJob] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const applicationAddModalR = useRef(null);
  const applicationListR = useRef(null);
  //First load
  useEffect(() => {
    fetchJobs();
  }, []);

  //Scroll controll
  useEffect (() => {
    if (showAddModal && applicationAddModalR.current) {
      applicationAddModalR.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showAddModal])
  const fetchJobs = async () => {
    try{
      const res = await fetch('/jobs');
      if(!res.ok) throw new Error('Failed to retrieve jobs list')
      const jobs = await res.json();

      //Normalize
      const nJobs = jobs.map(job => ({...job, id: job._id}))
      setAllJobs(nJobs);
      setFilteredJobs(nJobs);
    } catch (e) {
      console.error(e);
    }
  };

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

  const handelDelete = async (jobId) => {
    try{
      const res = await fetch(`/jobs/${jobId}`, {
        method: 'DELETE',
      });
      if(!res.ok) throw new Error(`Failed to delete job: ${jobId}`)
      //Update the full job list and the one currently in view
      setAllJobs(oldJobArr =>  oldJobArr.filter(job => job.id !== jobId))
      setFilteredJobs(oldJobArr => oldJobArr.filter(job => job.id !== jobId)) 
    } catch (e){
      console.error(e);
      alert('Failed to delete job');
    }
  }

  const handelUpdate = async (updatedJob) => {
    const jobId = updatedJob.id; 
    try{
      const res = await fetch(`/jobs/${jobId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedJob)
      });
      if(!res.ok) throw new Error(`Failed to update job: ${jobId}`)
      fetchJobs();
    }
    catch(e){
      console.error(e);
      alert('Failed to update Job')
    }
  }

  const handleEditClick = (job) => {
    setEditingJob(job);
    setShowEditModal(true);
  }

  const handleCreateJob = async (formData) => {
  
  try{
    const res = await fetch('/jobs', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });
    
    if(!res.ok) throw new Error('Failed to submit');
    const newJob = await res.json();
    //Normalize ID
    newJob.id = newJob._id;
    console.log('Job Created', newJob);
    fetchJobs();
    } catch (err) {
      console.error(err);
      alert('Job creation failed');
    }
  };
  
  return (
    <div className="container mt-5" ref={applicationListR}>
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

      {/*Filtered job res*/}
      {filteredJobs.length === 0 ? (
        <div className="alert alert-warning text-center">
          No jobs found with the selected filters.
        </div>
      ) : (
        <div className="row g-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="col-md-4">
              <JobCard job={job} onDelete={handelDelete} onUpdate={handleEditClick}/>
            </div>
          ))}
        </div>
      )}

      {/*New Job Btn*/}
      <div className="text-center mt-5">
        <button className="btn btn-outline-primary btn-lg"
          onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>New Application
        </button>
      </div>

      {/*New Application Modal*/}
      {showAddModal && (
        <div ref={applicationAddModalR}>
          <JobForm
          onSubmit={handleCreateJob}
          onCancel={() => setShowAddModal(false)}
          />
        </div>
      )}

      {/*Edit Modal*/}
      {showEditModal && editingJob && (
        <EditJobModal job={editingJob} 
          onClose={() => setShowEditModal(false)}
          onSave={(updatedJob) => {
            handelUpdate(updatedJob);
            setShowEditModal(false);
          }}
        />
      )}
    </div> 
  );
}

export default Dashboard;
