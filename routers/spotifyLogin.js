const express = require('express');
const router = new express.Router();
const request = require('request');

router.post('/spotifylogin', (req, res) => {
  try {
    const { clientId, secret, spotifyToken } = req.body.Authorization;

    const authOptionsGetRefresh = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          new Buffer.from(clientId + ':' + secret).toString('base64'),
      },
      form: {
        grant_type: 'authorization_code',
        code: spotifyToken,
        redirect_uri: 'http://localhost:3000/home',
      },
      json: true,
    };

    request.post(authOptionsGetRefresh, async (error, response, body) => {
      await body.refresh_token;

      return res.status(200).json({
        body,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
