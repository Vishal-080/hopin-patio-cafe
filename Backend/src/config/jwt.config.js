const jwt = require('jsonwebtoken');

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  issuer: 'cafe-backend',
  audience: 'cafe-frontend'
};

const refreshTokenConfig = {
  secret: process.env.REFRESH_TOKEN_SECRET,
  expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
};

const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secret, {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshTokenConfig.secret, {
    expiresIn: refreshTokenConfig.expiresIn
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenConfig.secret);
};

module.exports = {
  jwtConfig,
  refreshTokenConfig,
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken
};