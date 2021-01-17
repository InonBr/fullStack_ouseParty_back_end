const express = require('express');
const router = new express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post(
  '/login',
  [
    check('email', 'Please includ a valid email').isEmail(),
    check('password1', 'Password is requierd').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if there are errors return 400 (bed request);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password1 } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const compare = await bcrypt.compare(password1, user.password);

      if (!compare) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const token = jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        },
        process.env.TOKEN
      );

      return res.status(200).json({
        token,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

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
      // test if email and username are unique
      const userEmail = await User.findOne({ email });
      const userUsername = await User.findOne({ username });

      if (userEmail || userUsername) {
        if (userEmail) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Email already registered' }] });
        }

        return res
          .status(400)
          .json({ errors: [{ msg: 'Username alredy exists' }] });
      }

      const password = await bcrypt.hash(password1, 10);

      newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          email: newUser.email,
        },
        process.env.TOKEN
      );

      return res.status(200).json({
        token,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
