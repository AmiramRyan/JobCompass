
const express = require('express');
const connectDB = require('./db');
const Job = require('./models/Job');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

//Initiate
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Job CRUD
app.post('/jobs', async (req, res) => {
  const { title, company, status, notes, appliedDate } = req.body;

  try{
    const newJob = new Job({
      title,
      company,
      status,
      notes,
      appliedDate
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
})

app.get('/jobs', async (req, res) => {
  try {
    jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/jobs/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const job = await Job.findById(id);
    if(!job) {
      return res.status(404).json({ message: 'Job not found' });
    } 
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.put('/jobs/:id', async (req, res) => {
  const {id} = req.params;
  const { title, company, status, notes, appliedDate } = req.body;
  try {
    const job = await Job.findByIdAndUpdate(id, {
      title,
      company,
      status,
      notes,
      appliedDate
    }, { new: true });
    if(!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.delete('/jobs/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const job = await Job.findByIdAndDelete(id);
    if(!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})
