export class CardComponent {

  private index = 0;

  get it() { return cy.get('.card').eq(this.index); }
  get titleText() { return this.it.find('.header-title'); }


  constructor(index: number) {
    this.index = index;
  }

}