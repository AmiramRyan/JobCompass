const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
};


router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/users/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id);
    if(!user) {
      return res.status(404).json({ message: `User with Id: ${id} ,not found`});
    }
    res.status(200).json({ email: user.email});
  } catch (err){
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  }
})

module.exports = router;
