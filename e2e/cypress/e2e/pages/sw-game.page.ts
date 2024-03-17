import { CardComponent } from "../components/card.component";

class SwGamePage {

  playerCard = new CardComponent(0);
  computerCard = new CardComponent(1);

  get characterDropdown() { return cy.get('.select-game-option')}
  get characterDropdownSelected() { return this.characterDropdown.find('mat-select')}
  get playGameButton() { return cy.get('button').contains('PLAY A GAME'); }
  get nextRoundButton() { return cy.contains('NEXT ROUND'); }
  get endGameButton() { return cy.contains('END GAME'); }
  get charactersLoadingSpinner() { return cy.get('.game-loading-progress')}

  open() {
    cy.visit('/battlefield');
    return this;
  }

  selectPlayGameButton() {
    this.playGameButton.click();
    return this;
  }

}

export default new SwGamePage();