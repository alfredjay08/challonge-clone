export const generateMatchesMarkup = (matchType, matches, players) => {
  return matches
    .filter((match) => match.matchType === matchType)
    .map((match) => {
      const playerOne = players.find(
        (player) => player._id === match.playerOneId
      );
      const playerTwo = players.find(
        (player) => player._id === match.playerTwoId
      );

      return `
          <div class="match" data-id="${match._id}">
            <div class="player hidden" data-id="${playerOne._id}">
              <div class="player__icon">
                <img
                  src="${playerOne.image}"
                  class="player__icon-img"
                  alt="Player Image"
                />
              </div>
              <div class="player__name">${playerOne.name}</div>
              <div class="player__score ${
                playerOne.score > playerTwo.score ? "winner" : ""
              }">${playerOne.score}</div>
            </div>
            <div class="player hidden" data-id="${playerTwo._id}">
              <div class="player__icon">
                <img
                  src="${playerTwo.image}"
                  class="player__icon-img"
                  alt="Player Image"
                />
              </div>
              <div class="player__name">${playerTwo.name}</div>
              <div class="player__score ${
                playerOne.score < playerTwo.score ? "winner" : ""
              }">${playerTwo.score}</div>
            </div>
          </div>
       `;
    })
    .join("");
};
