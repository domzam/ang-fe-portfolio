export class CardComponent {

  get scoreHeader() { return cy.get('.card-header').eq(this.index) }

  get cardContent() { return cy.get('.card').eq(this.index); }
  get cardImage() { return this.cardContent.find('img'); }
  get cardCommonProperty() { return this.cardContent.find('.common'); }
  get cardTitle() { return this.cardContent.find('mat-card-title'); }
  get cardProperties() { return this.cardContent.find('.properties'); }

  constructor(private index: number = 0) {}

}