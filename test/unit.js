export const createMatches = (players) => {
  const matches = [];
  for (let i = 0; i < players.length; i += 2) {
    matches.push({
      _id: i + 1,
      playerOneId: players[i]._id,
      playerTwoId: players[i + 1]._id,
      matchType: "quarter",
    });
  }

  return matches;
};

export const updateMatches = (
  previousMatchWinners,
  matchType,
  latestMatchId
) => {
  const newMatches = [];
  for (let i = 0; i < previousMatchWinners.length; i += 2) {
    latestMatchId++;

    newMatches.push({
      _id: latestMatchId,
      playerOneId: previousMatchWinners[i],
      playerTwoId: previousMatchWinners[i + 1],
      matchType: matchType,
    });
  }

  return newMatches;
};

export const getWinners = (match, players) => {
  const playerOne = players.find((player) => player._id === match.playerOneId);
  const playerTwo = players.find((player) => player._id === match.playerTwoId);

  return playerOne.score > playerTwo.score ? playerOne._id : playerTwo._id;
};
