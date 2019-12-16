const LASTFM_METHODS = {
    GET_TOP_TRACKS: 'user.getTopTracks',
    GET_FRIENDS: 'user.getFriends',
    GET_INFO: 'user.getInfo',
  };

  const DATA_FIELD = {
    'user.getTopTracks':'toptracks',
    'user.getFriends':'friends',
  }
  module.exports = {
    LASTFM_METHODS,
    DATA_FIELD
  }