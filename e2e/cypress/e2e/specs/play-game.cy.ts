import playGamePage from "../pages/play-game.page";

describe('Play a game page', () => {
  describe("Play one battle", () => {
    it('should render cards details', () => {
      playGamePage
        .open()
        .setName('test user')
        .selectStartGameButton()
        .selectPlayButton();
      playGamePage.playerCard.titleText.should('not.have.text', '#####');
      playGamePage.computerCard.titleText.should('not.have.text', '#####');
    });
  });
});