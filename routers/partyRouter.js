const express = require('express');
const router = new express.Router();
const Party = require('../models/Party');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/startparty', auth, async (req, res) => {
    try {
        const date = req.body.date;
        const userId = req.body.userId;
        const name = req.body.username;
        const partyId = Math.floor(1000000 + Math.random() * 900000);
        newParty = new Party({
            userId,
            date,
            partyId,
            name
        });
        await newParty.save();
        const user = await User.findById(userId);
        user.partysIds.push(partyId);
        await user.save();
        res.status(200).json(partyId);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.post('/joinparty', async (req, res) => {
    const { partyId } = req.body
    try {
        const party = await Party.findOne({ partyId });
        if (!party)
            res.status(404).send('party not found')
        res.status(200).send(party);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;