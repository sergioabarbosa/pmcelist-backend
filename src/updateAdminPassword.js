const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

console.log('Updating admin password...');
console.log('Connecting to database...');

connectDB();

const updateAdminPassword = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ email: 'admin@pmce.com.br' });
    
    if (!admin) {
      console.log('Admin user not found in database!');
      process.exit(1);
    }
    
    console.log('Admin user found:');
    console.log('Name:', admin.name);
    console.log('Email:', admin.email);
    
    // Directly set the password and save to bypass the pre-save hook
    const newPassword = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    console.log('New password:', newPassword);
    console.log('Generated hash:', hashedPassword);
    
    // Update the user document directly without triggering the pre-save hook
    await User.updateOne(
      { _id: admin._id },
      { $set: { password: hashedPassword } }
    );
    
    console.log('Admin password updated successfully');
    
    // Verify the new password
    const updatedAdmin = await User.findById(admin._id);
    console.log('Updated password hash:', updatedAdmin.password);
    
    // Test the password comparison
    const isMatch = await bcrypt.compare(newPassword, updatedAdmin.password);
    console.log('Verification test result:', isMatch);
    
    process.exit(0);
  } catch (error) {
    console.error(`Error during update: ${error.message}`);
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
  console.log('MongoDB connected successfully, updating admin password...');
  updateAdminPassword();
});