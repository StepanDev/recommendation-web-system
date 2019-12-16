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


    acc.push(...diffSongs);
    return acc;
  }, [])
}

function songRateForUser(song, allUsersRo) {
  const songId = song.mbid;
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
    songId,
    artist: song.artist,
    image: song.image,
    name: song.name,
    url: song.url
  };
}

function normalizeRate(songRate) {
  // if (songRate > 10) {
  //   return 10
  // }
  return songRate
}

function buildRecommendation(user, friends) {
  const roAllUserUnsorted = roZeroAllUsers(user, friends);
  const roAllUsers = roAllUserUnsorted.sort((a, b) => a.userRo - b.userRo);
  const diffSongs = extractDiffSong(user, roAllUsers);
  console.log('diffSongs', diffSongs)
  const songsRates = diffSongs.map(song => {
    return songRateForUser(song, roAllUsers);
  });
  return songsRates.sort((a,b)=> a.rate - b.rate);
}

module.exports = { buildRecommendation };