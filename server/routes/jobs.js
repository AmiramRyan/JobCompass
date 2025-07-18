const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware);

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id});

    const stats = {
      total: jobs.length,
      applied: jobs.filter(j => j.status === "Applied").length,
      interview: jobs.filter(j => j.status ==='Interviewing').length,
      offer: jobs.filter(j => j.status === 'Accepted').length,
      rejected: jobs.filter(j => j.status === 'Rejected').length,
      ghosted: jobs.filter(j => j.status === 'Ghosted').length,
    };

    res.json(stats);
  } catch (err){
    console.error(err);
    res.status(500).json({message: 'Failed to calculate stats' });
  }
});

//Post new job
router.post('/', authMiddleware, async (req, res) => {
  const { title, company, status, notes, appliedDate } = req.body;

  try{
    const newJob = new Job({
      title,
      company,
      status,
      notes,
      appliedDate,
      userId: req.user.id
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
})

router.get('/:id', async (req, res) => {
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

//Update Job
router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

//GET All jobs of a user
router.get('/', async (req, res) => {
  try {
    jobs = await Job.find({ userId: req.user.id});
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router;