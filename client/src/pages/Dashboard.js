import React, { useEffect, useState, useRef } from 'react';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import EditJobModal from '../components/EditJobModal';
import JobForm from '../components/JobForm';
import getUserFromToken from '../utils/getUserFromToken';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');
const user = getUserFromToken();

function Dashboard() {
  const navigate = useNavigate();
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
  const [stats, setStats] = useState({});
  const applicationAddModalR = useRef(null);
  const applicationListR = useRef(null);
  const userNameRef = useRef('');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/jobs/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  //First load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchJobs();
    }
  }, []);

  //Scroll controll
  useEffect (() => {
    if (showAddModal && applicationAddModalR.current) {
      applicationAddModalR.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showAddModal])

  //Calculate stats
  useEffect (() => {
    if (token) fetchStats();
  }, [])

  useEffect(() => {
  const fetchUser = async () => {
    const user = await getUserFromToken();
    if (user && user.email) {;
      userNameRef.current = user.email.split('@')[0];
    }
  };
  fetchUser();
}, []);
  const fetchJobs = async () => {
    try{
      const res = await fetch('/api/jobs',{
        method: 'GET',
        headers: {...(token && { Authorization: `Bearer ${token}` })}
      });
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
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {...(token && { Authorization: `Bearer ${token}` })}
      });
      if(!res.ok) throw new Error(`Failed to delete job: ${jobId}`)
      //Update the full job list and the one currently in view
      setAllJobs(oldJobArr =>  oldJobArr.filter(job => job.id !== jobId))
      setFilteredJobs(oldJobArr => oldJobArr.filter(job => job.id !== jobId)) 
      fetchStats();
    } catch (e){
      console.error(e);
      alert('Failed to delete job');
    }
  }

  const handelUpdate = async (updatedJob) => {
    const jobId = updatedJob.id; 
    try{
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(updatedJob)
      });
      if(!res.ok) throw new Error(`Failed to update job: ${jobId}`)
      fetchJobs();
      fetchStats();
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
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(formData)
    });
    
    if(!res.ok) throw new Error('Failed to submit');
    const newJob = await res.json();
    //Normalize ID
    newJob.id = newJob._id;
    console.log('Job Created', newJob);
    setShowAddModal(false);
    fetchJobs();
    fetchStats();
    } catch (err) {
      console.error(err);
      alert('Job creation failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(token);
    window.location.href = '/login';
  }
  //Element
  return (
    <div className="container mt-5" ref={applicationListR}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>Welcome, {userNameRef.current}</div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1 className="mb-4 text-center">🧭 JobCompass Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-briefcase-fill display-4 mb-2"></i>
              <h5 className="card-title">Total Applications</h5>
              <p className="card-text display-6">{stats.total || 0}</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-calendar-event-fill display-4 mb-2"></i>
              <h5 className="card-title">Interviews</h5>
              <p className="card-text display-6">{stats.interview || 0}</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-trophy-fill display-4 mb-2"></i>
              <h5 className="card-title">Offers</h5>
              <p className="card-text display-6">{stats.offer || 0}</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-x-octagon-fill display-4 mb-2"></i>
              <h5 className="card-title">Rejected</h5>
              <p className="card-text display-6">{stats.rejected || 0}</p>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="card text-white bg-secondary shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-question-circle-fill display-4 mb-2"></i>
              <h5 className="card-title">Ghosted</h5>
              <p className="card-text display-6">{stats.ghosted || 0}</p>
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
