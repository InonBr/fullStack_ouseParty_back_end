const express = require('express');
const router = new express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

router.post('/singup', [
  check('username', 'username is required').not().isEmpty(),
  check('email', 'Please includ a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({
    min: 6,
  }),
]);
