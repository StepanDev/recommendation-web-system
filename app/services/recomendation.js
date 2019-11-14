// const data = require('./data.json');

function roUsers(firstUser, secondUser) {
  const commonSongs = firstUser.toptracks.track
    .reduce((acc, currentSong) => {
      const a = secondUser.toptracks.track
        .find(
          (s) => {
            return s.mbid === currentSong.mbid;
          }
        );
      if (a) {
        console.log('commonSOOOOONG');
        acc.push({ firstUser: currentSong, secondUser: a });
      }
      return acc;
    }, []);

  const x = commonSongs.reduce((acc, cur) => {
    acc += Math.pow(normalizeRate(cur.firstUser.playcount) - normalizeRate(cur.secondUser.playcount), 2);
    return acc;
  }, 0);

  return Math.sqrt(x);
}

function roZero(firstUser, secondUser) {
  return 1 / (1 + roUsers(firstUser, secondUser));
}

function roZeroAllUsers(user, friends) {
  return friends.reduce((acc, friend) => {
    if (user.toptracks['@attr'].user === friend.toptracks['@attr'].user) {
      return acc;
    }
    const userRo = roZero(user, friend);
    // console.log('friend.toptracks.track', friend.toptracks.track)
    acc.push({ userRo, name: friend.toptracks['@attr'].user, track: friend.toptracks.track });
    return acc;
  }, [])
}

function extractDiffSong(user, allUsers) {
  return allUsers.reduce((acc, curUser) => {
    const diffSongs = curUser.track.filter(curSong => {
      if (user.toptracks.track.some(cs => cs.mbid === curSong.mbid)) {
        return false;
      }

      return !acc.some(cs => cs.mbid === curSong.mbid);
    });

    // console.log('diff', diffSongs);

    acc.push(...diffSongs);
    return acc;
  }, [])
}

function songRateForUser(songId, allUsersRo) {
  const { nominator, denominator } = allUsersRo.reduce((acc, curUser, index) => {
    const songInCurUser = curUser.track.find(cs => {
      return cs.mbid === songId;
    });
    if (songInCurUser) {
      acc.nominator += curUser.userRo * normalizeRate(songInCurUser.playcount);
      acc.denominator += curUser.userRo;
    }
    return acc;
  }, { nominator: 0, denominator: 0 });

  return {
    rate: denominator === 0
      ? 0
      : nominator / denominator,
    songId
  };
}

function normalizeRate(songRate) {
  // TODO range form
  if (songRate > 10) {
    return 10
  }
  return songRate
}

// uncomment all below
// const roAllUserUnsorted = roZeroAllUsers(data.users[1]);
// console.log(`roZeroAllUsers(data.users[1]) = ${JSON.stringify(roAllUserUnsorted, null, 2)}`);

// const roAllUsers = roAllUserUnsorted.sort((a, b) => a.userRo - b.userRo);
// console.log(`roAllUsers = ${JSON.stringify(roAllUserUnsorted, null, 2)}`);

// const diffSongs = extractDiffSong(data.users[1], roAllUsers);
// console.log(`extractDiffSong = ${JSON.stringify(diffSongs, null, 2)}`);

// console.log('songRateForUser', songRateForUser(3, roAllUsers));


// const songsRates = diffSongs.map(song => {
//   console.log('song', song);
//   return songRateForUser(song.id, roAllUsers);
// });

// console.log(songsRates);

function buildRecommendation(user, friends) {
  const roAllUserUnsorted = roZeroAllUsers(user, friends);
  const roAllUsers = roAllUserUnsorted.sort((a, b) => a.userRo - b.userRo);
  const diffSongs = extractDiffSong(user, roAllUsers);
  // console.log('diffSongs', diffSongs);
  const songsRates = diffSongs.map(song => {
    // console.log('song', song);
    return songRateForUser(song.mbid, roAllUsers);
  });
  console.log('songsRates', songsRates)
  return songsRates;
}

module.exports = { buildRecommendation };