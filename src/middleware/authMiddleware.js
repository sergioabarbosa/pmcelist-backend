// PROBLEMA: Usando decoded.id mas JWT pode ter _id
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

      // CORREÇÃO: Usar decoded.id OU decoded._id
      const userId = decoded.id || decoded._id;
      req.user = await User.findById(userId).select('-password');
      console.log('User found:', req.user ? `ID: ${req.user._id}, Admin: ${req.user.isAdmin}` : 'No user found');

      // ADICIONAL: Se não encontrou usuário no banco, usar dados do JWT
      if (!req.user && decoded.isAdmin !== undefined) {
        console.log('User not found in DB, using JWT data');
        req.user = {
          _id: userId,
          email: decoded.email,
          isAdmin: decoded.isAdmin,
          role: decoded.role
        };
      }

      next();
    } catch (error) {
      console.error('Auth error details:', error.message);
      console.error('Not authorized, token failed');
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No Bearer token in authorization header');
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