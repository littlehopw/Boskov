const jwtConfig = require('../configs/jwtConfig');
const { isTokenBlacklisted } = require('../configs/jwtConfig');
const { StatusCodes } = require('http-status-codes');

const autenticarToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token não fornecido' });

  const isBlacklisted = await isTokenBlacklisted(token);
  if (isBlacklisted) return res.status(StatusCodes.FORBIDDEN).json({ error: 'Token inválido (blacklist)' });

  try {
    const user = jwtConfig.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = autenticarToken;
