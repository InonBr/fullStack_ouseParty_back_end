const request = require('request');
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');

router.delete('/spotifyDeleteSong', auth, (req, res) => {
  try {
    const { spotifyauthorization } = req.headers;
    const { playlistId, songId } = req.body;

    const deleteAuth = {
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: spotifyauthorization,
      },
      body: {
        tracks: [
          {
            uri: `spotify:track:${songId}`,
          },
        ],
      },
      json: true,
    };

    request.delete(deleteAuth, async (err, res, body) => {
      if (err) {
        throw err;
      }

      console.log(await body);
    });

    return res.status(200).json({
      msg: 'deleted successfully',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
