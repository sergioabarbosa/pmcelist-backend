const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(`Login attempt for email: ${email}`);
  console.log(`Password received: ${password}`);

  const user = await User.findOne({ email });

  if (user) {
    console.log(`User found: ${user.name}, ID: ${user._id}`);
    console.log(`Stored password hash: ${user.password}`);
    
    // Manual comparison for debugging
    const manualCompare = await bcrypt.compare(password, user.password);
    console.log(`Manual bcrypt comparison result: ${manualCompare}`);
    
    // Using the model method
    const isMatch = await user.matchPassword(password);
    console.log(`Model matchPassword result: ${isMatch}`);
    
    if (isMatch) {
      res.json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
        token: token,
        user: {
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          role: user.role
        }
      });
      return;
    }
  } else {
    console.log('No user found with this email');
  }

  res.status(401).json({ message: 'Invalid email or password' });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    username: email.split('@')[0], // Add username field
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = { authUser, registerUser, getUserProfile };