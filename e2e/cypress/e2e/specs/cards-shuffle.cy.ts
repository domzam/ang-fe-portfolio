import swGamePage from "../pages/sw-game.page";


describe("Play a game and make cards shuffle", { testIsolation: false }, () => {
  before(() => {
    swGamePage.open();
  });

  it("should render select with 'people' value", () => {
    swGamePage.characterDropdown.should('be.visible');
    swGamePage.characterDropdownSelected.should('contain.text', 'people');
  });

  it("should render 'PLAY A GAME' button", () => {
    swGamePage.playGameButton.should('be.visible');
  });

  it("should display two game cards after selecting 'PLAY A GAME' button", () => {
    swGamePage.charactersLoadingSpinner.should('not.be.enabled');
    swGamePage.selectPlayGameButton();
    swGamePage.playerCard.cardContent.should('be.visible');
    swGamePage.computerCard.cardContent.should('be.visible');
  });

  it("should display image in players card", () => {
    swGamePage.playerCard.cardImage.should('be.visible');
  });

  it("should display image in computers card", () => {
    swGamePage.computerCard.cardImage.should('be.visible');
  });

  it("should display common property in players card", () => {
    swGamePage.playerCard.cardCommonProperty.should('be.visible');
  });

  it("should display common property in computers card", () => {
    swGamePage.computerCard.cardCommonProperty.should('be.visible');
  });

  it("should display card title in players card", () => {
    swGamePage.playerCard.cardTitle.should('be.visible');
  });

  it("should display card title in computers card", () => {
    swGamePage.computerCard.cardTitle.should('be.visible');
  });

  it("should display card properties in players card", () => {
    swGamePage.playerCard.cardTitle.should('be.visible');
  });

  it("should display card properties in computers card", () => {
    swGamePage.computerCard.cardTitle.should('be.visible');
  });

  it("should display 'NEXT ROUND' button", () => {
    swGamePage.nextRoundButton.should('be.visible');
  });

  it("should display 'END GAME' button", () => {
    swGamePage.endGameButton.should('be.visible');
  });

});
