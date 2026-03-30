const jwt = require('jsonwebtoken');

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = { validateToken };
