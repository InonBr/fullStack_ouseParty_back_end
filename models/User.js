const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    unique: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password1: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('all_users', UserSchema);
