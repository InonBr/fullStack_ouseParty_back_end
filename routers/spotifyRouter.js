const express = require('express');
const router = new express.Router();
const axios = require('axios').default;

// const SpotifyWebApi = require('spotify-web-api-node');
// const mongoose = require('mongoose');

const userId = process.env.USER_ID_SPOTIFY_EXAMPLE;
const spotifyToken = process.env.SPOTIFT_TOKEN;

router.get('/spotifyconnect', (req, res) => {
  axios.get('https://accounts.spotify.com/authorize').then((response) => {
    console.log(response.data);
    res.render(response.data);

    // res.end();
  });
  //   // `https://api.spotify.com/v1/users/${userId}`
  //   try {
  //     axios
  //       .get(`https://api.spotify.com/v1/users/${userId}`, {
  //         headers: {
  //           Authorization: `Bearer ${spotifyToken}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //       });
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server error');
  //   }
  //   res.send('Hello World!');
});

module.exports = router;
