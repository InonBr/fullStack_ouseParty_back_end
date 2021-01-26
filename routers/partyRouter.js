const express = require('express');
const router = new express.Router();
const Party = require('../models/Party');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/startparty/:id', auth, async (req, res) => {
  try {
    const { playlistId } = req.body;
    const { id } = req.params;

    const party = await Party.findOneAndUpdate({ partyId: id }, { playlistId });
    if (!party) res.status(404).send('Party not found');

    const updatedeParty = await Party.findOne({ partyId: id });

    return res.status(200).json({
      updatedeParty,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/startparty', auth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const name = req.body.username;
    const partyId = Math.floor(1000000 + Math.random() * 900000);
    newParty = new Party({
      userId,
      partyId,
      name,
      playlistId: '',
    });
    await newParty.save();
    const user = await User.findById(userId);
    user.partysIds.push(partyId);
    await user.save();
    res.status(200).json(newParty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/joinparty', async (req, res) => {
  const { partyId } = req.body;
  try {
    const party = await Party.findOne({ partyId });
    if (!party) res.status(404).send('party not found');
    res.status(200).send(party);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
