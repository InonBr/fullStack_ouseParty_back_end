const express = require('express');
const router = new express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

router.post(
  '/singup',
  [
    check('firstName', 'First name is required').trim().not().isEmpty(),
    check('lastName', 'Last name is required').trim().not().isEmpty(),
    check('username', 'Username is required').trim().not().isEmpty(),
    check('email', 'Please includ a valid email').trim().isEmail(),
    check('password1', 'Please enter a password with 6 or more characters')
      .trim()
      .isLength({
        min: 6,
      }),
    check('password2').custom((password2, { req }) => {
      if (req.body.password1 !== password2) {
        throw new Error("Passwords don't match");
      } else {
        return password2;
      }
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if there are errors return 400 (bed request);
      return res.status(400).json({ errors: errors.array() });
    } else {
      return res.status(200).json({ msg: 'good request' });
    }
  }
);

module.exports = router;
