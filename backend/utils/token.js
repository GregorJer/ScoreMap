const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.TOKEN_KEY;
  const options = { expiresIn: '2h' }; // or your own expiry time
  const token = jwt.sign(payload, secret, options);
  user.token = token;
  console.log("Token generated and assigned to user " + user.name)
  return token;
}

module.exports = generateToken;
