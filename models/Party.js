const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  partyId: {
    required: true,
    unique: true,
    type: String,
  },
  songsList: {
    type: Array
  }
});

module.exports = Party = mongoose.model('parties', PartySchema);