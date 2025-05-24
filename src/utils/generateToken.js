// SOLUÇÃO: Incluir dados completos do usuário no JWT
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ 
    id: user._id,
    _id: user._id, // Para compatibilidade
    email: user.email,
    isAdmin: user.isAdmin,
    role: user.role || 'user'
  }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;