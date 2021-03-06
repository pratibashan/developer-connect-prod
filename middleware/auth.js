const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

  //Get token from header
  const token = req.header('x-auth-token');
  console.log(`Server:${token}`)

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //verify the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    console.log(`decoded:${decoded}`)
    console.log(`user:${req}`)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' })
  }
}
