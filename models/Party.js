const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  partyId: {
    required: true,
    unique: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  playlistId: {
    type: String,
  },
});

module.exports = Party = mongoose.model('parties', PartySchema);
