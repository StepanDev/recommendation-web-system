/**
 * General routing
 */

const express = require('express');

const router = express.Router();
const lasftFmService = require("./services/lastfm")
const recommendationService = require("./services/recomendation")
const { LASTFM_METHODS } = require('./const')

/**
 * Routing for requests
 */

 router.get('/last', async (req, res) => {
  console.log('last')
  try {
    // cons session = lasftfmService.
    const USER_NAME = 'stepan_shvets';
    const user = await lasftFmService
      .handlePagination('GET', LASTFM_METHODS.GET_TOP_TRACKS, null, { user: USER_NAME, limit: 100 });

    const friendsData = await lasftFmService
      .sendRequestToLastFm('GET', LASTFM_METHODS.GET_FRIENDS, null, { user: USER_NAME, limit: 500 });
    // console.log('friendsData', friendsData)

    const friendsTopTracks = await Promise
      .all(
        friendsData.friends.user
          .map(friend =>
            lasftFmService.handlePagination('GET', LASTFM_METHODS.GET_TOP_TRACKS, null, {
              user: friend.name,
              limit: 1000
            })
          )
      );

    // console.log('friendsTopTracks', JSON.stringify(friendsTopTracks[0], null, 2));
    // console.log('friendsTopTracks', JSON.stringify(friendsTopTracks[1], null, 2));
    // console.log('friendsTopTracks', JSON.stringify(friendsTopTracks[2], null, 2));

    const recomendations = recommendationService.buildRecommendation(user, friendsTopTracks);

    res.send(recomendations)
  } catch (e) {
    console.error(e)
    res.send(e);
  }
});

module.exports = router;