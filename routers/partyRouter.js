const express = require('express');
const router = new express.Router();
const Party = require('../models/Party')
const User = require('../models/User')

router.post('/startparty', async (req, res) => {
    console.log(req.body);
    const date = req.body.date
    const userId = req.body.userId
    const partyId = Math.floor(1000000 + Math.random() * 900000)
    newParty = new Party({
        userId,
        date,
        partyId
    })
    await newParty.save()
    const user = await User.findById(userId)
    user.partysIds.push(partyId)
    await user.save()
    res.status(200).json(partyId)
})

module.exports = router;
