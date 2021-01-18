const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.TOKEN,
      (err, decodedToken) => {
        if (err) {
          res.status(400).send('Expired token');
        } else {
          next();
        }
      }
    );
  } else {
    res.status(400).send('Cannot find user');
  }
};

module.exports = auth;
