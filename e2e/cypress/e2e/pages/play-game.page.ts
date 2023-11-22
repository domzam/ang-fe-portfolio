import { CardComponent } from "../components/card.component";

class PlayGamePage {

  playerCard = new CardComponent(0);
  computerCard = new CardComponent(1);

  get enterNameInput() { return cy.get('.start-game input'); }
  get startGameButton() { return cy.contains('START GAME'); }
  get playButton() { return cy.get('button').contains('PLAY'); }

  open() {
    cy.visit('/battlefield');
    return this;
  }

  setName(name: string) {
    this.enterNameInput
      .type(name, { force: true });
    return this;
  }

  selectStartGameButton() {
    this.startGameButton.click();
    return this;
  }

  selectPlayButton() {
    this.playButton.click({ timeout: 10_000 });
    return this;
  }

}

export default new PlayGamePage();