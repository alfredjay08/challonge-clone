import { expect, fixture, html } from "@open-wc/testing";
import { generateMatchesMarkup } from "./snapshot.js";
import { createMatches } from "./unit.js";

describe("Validate snapshot of generated markup", () => {
  it("Should return an element that has correct class", async () => {
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
        name: "Derkila",
        score: 1,
      },
      {
        _id: 1004,
        name: "Alicred",
        score: 4,
      },
    ];

    const matches = createMatches(players);

    const markup = generateMatchesMarkup("quarter", [matches[1]], players);
    const el = await fixture(markup);

    await expect(el).to.be.accessible();
    expect(markup).to.include("1003");
    expect(markup).to.include("1004");
    expect(el).dom.to.equal(`
    <div class="match" data-id="3">
      <div class="player hidden" data-id="1003">
        <div class="player__icon">
          <img
            src="undefined"
            class="player__icon-img"
            alt="Player Image"
          />
        </div>
        <div class="player__name">Derkila</div>
        <div class="player__score ">1</div>
      </div>
      <div class="player hidden" data-id="1004">
        <div class="player__icon">
          <img
            src="undefined"
            class="player__icon-img"
            alt="Player Image"
          />
        </div>
        <div class="player__name">Alicred</div>
        <div class="player__score winner">4</div>
      </div>
    </div>
    `);
  });
});
