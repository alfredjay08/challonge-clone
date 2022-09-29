"use strick";

const icons = ["blue", "orange", "yellow"];
const stage = document.getElementsByClassName("stage");
const tournamentContainer =
  document.getElementsByClassName("tournament-bracket")[0];
const btnStart = document.getElementById("btn--start");

const players = [
  {
    _id: 1,
    name: "Dendi",
    score: 3,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
  {
    _id: 2,
    name: "Miracle-",
    score: 1,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
  {
    _id: 3,
    name: "Tenz",
    score: 2,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
  {
    _id: 4,
    name: "Sinantra",
    score: 1,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
  {
    _id: 5,
    name: "Topson",
    score: 3,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
  {
    _id: 6,
    name: "Chaknu~",
    score: 2,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
  {
    _id: 7,
    name: "Nevermore",
    score: 1,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
  {
    _id: 8,
    name: "PudgEbar",
    score: 4,
    image: `src/upload/ninja-${icons[Math.floor(Math.random() * 3)]}.jpg`,
  },
];

const matches = [];

const initMatches = (players) => {
  let matchesCreated = 0;

  for (let i = 0; i < players.length; i += 2) {
    matchesCreated++;

    matches.push({
      _id: matchesCreated,
      playerOneId: players[i]._id,
      playerTwoId: players[i + 1]._id,
      matchType: "quarter",
    });
  }
};

const updateMatches = (previousMatchWinners, matchType) => {
  let latestMatchId = matches.at(-1)._id;
  for (let i = 0; i < previousMatchWinners.length; i += 2) {
    latestMatchId++;

    matches.push({
      _id: latestMatchId,
      playerOneId: previousMatchWinners[i],
      playerTwoId: previousMatchWinners[i + 1],
      matchType: matchType,
    });
  }
};

const generateMatchesMarkup = (matchType) => {
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
          <div class="player hidden" data-id=${playerOne._id}>
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
          <div class="player hidden" data-id=${playerTwo._id}>
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
    });
};

const getWinners = (match) => {
  const playerOne = players.find((player) => player._id === match.playerOneId);
  const playerTwo = players.find((player) => player._id === match.playerTwoId);

  return playerOne.score > playerTwo.score ? playerOne._id : playerTwo._id;
};

const setupBrackets = () => {
  const stageLength = stage.length;
  let matchesMarkup, bracketMarkup;

  for (let i = 0; i < stageLength; i++) {
    switch (i) {
      case 0:
        matchesMarkup = generateMatchesMarkup("quarter");
        bracketMarkup = "";

        for (let j = 0; j < matchesMarkup.length; j += 2) {
          bracketMarkup += `
            <div class="bracket">
              ${matchesMarkup[j]}
              ${matchesMarkup[j + 1]}
            </div>
          `;
        }

        stage[i].innerHTML = bracketMarkup;
        break;
      case 1:
        const quarterMatchWinners = matches
          .filter((match) => match.matchType === "quarter")
          .map(getWinners);

        updateMatches(quarterMatchWinners, "semi");
        matchesMarkup = generateMatchesMarkup("semi");
        bracketMarkup = "";

        for (let j = 0; j < matchesMarkup.length; j += 2) {
          bracketMarkup += `
            <div class="bracket">
              ${matchesMarkup[j]}
              ${matchesMarkup[j + 1]}
            </div>
          `;
        }

        stage[i].innerHTML = bracketMarkup;

        break;
      default:
        const semiMatchWinners = matches
          .filter((match) => match.matchType === "semi")
          .map(getWinners);

        updateMatches(semiMatchWinners, "final");
        matchesMarkup = generateMatchesMarkup("final");
        bracketMarkup = `
              ${matchesMarkup[0]}
          `;

        stage[i].innerHTML = bracketMarkup;
    }
  }

  const playersElement = document.getElementsByClassName("player");

  [...playersElement].forEach((playerEl) => {
    playerEl.addEventListener("mouseover", (e) => {
      const playerId = e.currentTarget.dataset.id;
      if (playersElement[0].classList.contains("hidden")) return;

      [...playersElement]
        .filter((playerEl) => playerEl.dataset.id !== playerId)
        .forEach((playerEl) => {
          playerEl.classList.add("fade");
        });
    });
  });

  [...playersElement].forEach((playerEl) => {
    playerEl.addEventListener("mouseout", () => {
      [...playersElement].forEach((playerEl) => {
        playerEl.classList.remove("fade");
      });
    });
  });

  btnStart.addEventListener("click", () => {
    let milliseconds = 500;

    [...playersElement].forEach((playerEl, index) => {
      setTimeout(() => {
        playerEl.classList.remove("hidden");
        playerEl.classList.add("tilt");
      }, milliseconds * index);
    });
  });
};

initMatches(players);
setupBrackets();
