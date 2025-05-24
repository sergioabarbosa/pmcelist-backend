const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;
  
  console.log('Auth middleware called');
  console.log('Headers:', JSON.stringify(req.headers));

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token extracted:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      console.log('User found:', req.user ? `ID: ${req.user._id}, Admin: ${req.user.isAdmin}` : 'No user found');

      next();
    } catch (error) {
      console.error('Auth error details:', error.message);
      console.error('Not authorized, token failed');
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No Bearer token in authorization header');
  }

  if (!token) {
    console.error('No token provided in request');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  console.log('Admin middleware check for user:', req.user ? req.user._id : 'No user');
  console.log('Is admin?', req.user ? req.user.isAdmin : false);
  
  if (req.user && req.user.isAdmin) {
    console.log('Admin access granted');
    next();
  } else {
    console.error('Admin access denied');
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };