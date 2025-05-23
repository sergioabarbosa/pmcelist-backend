const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const sectors = require('./data/sectors');
const User = require('./models/userModel');
const Sector = require('./models/sectorModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Sector.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleSectors = sectors.map((sector) => {
      return { ...sector };
    });

    await Sector.insertMany(sampleSectors);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Sector.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}