const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    username: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Regular User',
    username: 'user',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

module.exports = users;