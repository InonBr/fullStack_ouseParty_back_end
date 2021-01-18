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
  spotifyId: {
    required: true,
    // unique: true, // needs to be unique, lets ignore it for now...
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  partysIds: {
    required: true,
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('all_users', UserSchema);
