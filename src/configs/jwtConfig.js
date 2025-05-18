const jwt = require('jsonwebtoken');
const redisClient = require('../redisClient');

const generateToken = (usuario) => {
  return jwt.sign({ id: usuario.id, role: usuario.role }, process.env.SECRET_JWT, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_JWT);
};

const isTokenBlacklisted = async (token) => {
  const result = await redisClient.get(token);
  return result !== null;
};

const blacklistToken = async (token) => {
  await redisClient.set(token, 'blacklisted', { EX: 3600 }); // expira em 1h
};

module.exports = { generateToken, verifyToken, blacklistToken, isTokenBlacklisted };
