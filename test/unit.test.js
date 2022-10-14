import { createMatches, updateMatches, getWinners } from "./unit.js";
import { expect } from "@esm-bundle/chai";

describe("Validate functions to be pure", () => {
  it("Should create a match object with correct property and without mutation", () => {
    const players = [
      {
        _id: 1001,
        name: "Alfred Jay",
      },
      {
        _id: 1002,
        name: "Ngujo",
      },
    ];

    expect(JSON.stringify(createMatches(players))).to.include("_id");
    expect(JSON.stringify(createMatches(players))).to.include("playerOneId");
    expect(JSON.stringify(createMatches(players))).to.include("playerOneId");

    expect(createMatches(players)).to.eql([
      {
        _id: 1,
        playerOneId: 1001,
        playerTwoId: 1002,
        matchType: "quarter",
      },
    ]);

    expect(createMatches(players).length).to.not.equal(0);
  });

  it("Should return an array of matces and the number of matches should always be even", () => {
    const winnersId = [1002, 1003, 1005, 1007];

    expect(updateMatches(winnersId, "semi", 5)).to.eql([
      {
        _id: 6,
        playerOneId: 1002,
        playerTwoId: 1003,
        matchType: "semi",
      },
      {
        _id: 7,
        playerOneId: 1005,
        playerTwoId: 1007,
        matchType: "semi",
      },
    ]);

    expect(updateMatches(winnersId, "final", 10).length % 2).to.equal(0);
  });

  it("Should return the correct winners", () => {
    const players = [
      {
        _id: 1001,
        name: "Alfred Jay",
        score: 3,
      },
      {
        _id: 1002,
        name: "Ngujo",
        score: 2,
      },
      {
        _id: 1003,
        name: "Ngujo",
        score: 1,
      },
      {
        _id: 1004,
        name: "Ngujo",
        score: 5,
      },
    ];

    const matches = createMatches(players);

    expect(getWinners(matches[0], players)).to.not.equal(0);
    expect(getWinners(matches[1], players)).to.not.equal(0);

    expect(getWinners(matches[0], players)).to.equal(1001);
  });
});
