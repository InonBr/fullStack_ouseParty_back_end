const express = require('express');
const router = new express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
    }

    const { firstName, lastName, username, email, password1 } = req.body;

    try {
      const userEmail = await User.findOne({ email });
      const userUsername = await User.findOne({ username });

      if (userEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User alredy exists' }] });
      }

      if (userUsername) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User alredy exists' }] });
      }

      newUser = {
        firstName,
        lastName,
        username,
        email,
        password1,
      };

      console.log(newUser);

      newUser.password1 = await bcrypt.hash(newUser.password1, 10);

      console.log(newUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

    return res.status(200).json({ msg: 'good request' });
  }
);

module.exports = router;
