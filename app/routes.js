/**
 * General routing
 */

const express = require('express');

const router = express.Router();
const lasftFmService = require("./services/lastfm")
const recommendationService = require("./services/recomendation")

/**
 * Routing for /edition requests
 */
const LASTFM_METHODS = {
    GET_TOP_TRACKS: 'user.getTopTracks',
    GET_FRIENDS: 'user.getFriends',

};
router.get('/last', async (req, res) => {
    console.log('last')
    try {
        // cons session = lasftfmService.
        const USER_NAME = 'veselunec';

        const friendsData = await lasftFmService
            .sendRequestToLastFm('GET', LASTFM_METHODS.GET_FRIENDS, null, { user: USER_NAME });
        
        const friendsTopTracks = await Promise
            .all(
                friendsData.friends.user.map(friend => lasftFmService.
                    sendRequestToLastFm('GET', LASTFM_METHODS.GET_TOP_TRACKS, null, { user: friend.name })));
        console.log('friendsTopTracks', friendsTopTracks)

        res.send(friendsData)
    } catch (e) {
        console.error(e)
        res.send(e);
    }
});

module.exports = router;