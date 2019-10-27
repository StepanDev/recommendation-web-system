const data = require('./data.json');

function roUsers(firstUser, secondUser) {
  const commonSongs = firstUser.songs
    .reduce((acc, currentSong) => {
      const a = secondUser.songs.find((s) => s.id === currentSong.id);
      if (a) {
        acc.push({ firstUser: currentSong, secondUser: a });
      }
      return acc;
    }, []);

  const x = commonSongs.reduce((acc, cur) => {
    acc += Math.pow(normalizeRate(cur.firstUser.times) - normalizeRate(cur.secondUser.times), 2);
    return acc;
  }, 0);

  return Math.sqrt(x);
}


function roZero(firstUser, secondUser) {
  return 1 / (1 + roUsers(firstUser, secondUser));
}

function roZeroAllUsers(user) {
  return data.users.reduce((acc, curUser) => {
    if (user.id === curUser.id) {
      return acc;
    }
    const userRo = roZero(user, curUser);
    acc.push({ userRo, id: curUser.id, songs: curUser.songs });
    return acc;
  }, [])
}

function extractDiffSong(user, allUsers) {
  return allUsers.reduce((acc, curUser) => {
    const diffSongs = curUser.songs.filter(curSong => {
      if (user.songs.some(cs => cs.id === curSong.id)) {
        return false;
      }

      return !acc.some(cs => cs.id === curSong.id);
    });

    console.log('diff', diffSongs);

    acc.push(...diffSongs);
    return acc;
  }, [])
}

function songRateForUser(songId, allUsersRo) {
  const { nominator, denominator } = allUsersRo.reduce((acc, curUser, index) => {
    const songInCurUser = curUser.songs.find(cs => cs.id === songId);
    if (songInCurUser) {
      acc.nominator += curUser.userRo * normalizeRate(songInCurUser.times);
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
  if (songRate > 10) {
    return 10
  }
  return songRate
}

const roAllUserUnsorted = roZeroAllUsers(data.users[1]);
console.log(`roZeroAllUsers(data.users[1]) = ${JSON.stringify(roAllUserUnsorted, null, 2)}`);

const roAllUsers = roAllUserUnsorted.sort((a, b) => a.userRo - b.userRo);
console.log(`roAllUsers = ${JSON.stringify(roAllUserUnsorted, null, 2)}`);

const diffSongs = extractDiffSong(data.users[1], roAllUsers);nide
console.log(`extractDiffSong = ${JSON.stringify(diffSongs, null, 2)}`);

console.log('songRateForUser', songRateForUser(3, roAllUsers));


const songsRates = diffSongs.map(song => {
  console.log('song', song);
  return songRateForUser(song.id, roAllUsers);
});

console.log(songsRates);

