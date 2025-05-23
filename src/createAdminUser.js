const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

console.log('Starting admin user creation...');
console.log('Connecting to database...');

connectDB();

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@pmce.com.br' });
    
    if (adminExists) {
      console.log('Admin user already exists. Updating password...');
      adminExists.password = bcrypt.hashSync('123', 10);
      await adminExists.save();
      console.log('Admin password updated successfully');
    } else {
      console.log('Creating new admin user...');
      const adminUser = new User({
        name: 'Administrador PMCE',
        username: 'admin',  // Added username field
        email: 'admin@pmce.com.br',
        password: bcrypt.hashSync('123', 10),
        isAdmin: true
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    }
    
    console.log('Operation completed, exiting...');
    process.exit(0);
  } catch (error) {
    console.error(`Error during admin creation: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

// Add error handling for MongoDB connection
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully, creating admin user...');
  createAdminUser();
});