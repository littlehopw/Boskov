const { StatusCodes } = require('http-status-codes');

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

module.exports = authorizeAdmin;