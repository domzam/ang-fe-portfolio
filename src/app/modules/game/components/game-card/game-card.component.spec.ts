import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GameCardComponent } from "./game-card.component";
import { MaterialModule } from "../../../material/material.module";
import { BattleResult } from "../../models/battle-result.enum";
import { SharedModule } from "src/app/modules/shared/shared.module";

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameCardComponent
      ],
      imports: [
        MaterialModule,
        SharedModule
      ]
    });
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be displayed", () => {
    expect(component).toBeDefined();
  });

  it("should display default image", () => {
    component.imagePath = '';
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.querySelector('.img')?.getAttribute('src')).toContain('none.jpg');
  });

  it("should display spinner", () => {
    component.isLoading = true;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.querySelector('.spinner')).toBeDefined();
  });

  it("should display default person details", () => {
    component.person = null;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.querySelector('.header-title')?.textContent).toContain('#####');
  });

  it("should render person details common property value", () => {
    component.person = {
      properties: {
        height: '',
        mass: '170',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        created: '',
        edited: '',
        name: '',
        homeworld: '',
        url: '',
      },
      description: '',
      uid: '',
    };
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(
      cardElement.querySelector('.property.common .property__value')?.textContent
    ).toContain('170');
  });

  it("should render card as winner", () => {
    component.battleResult = BattleResult.Winner;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.querySelector('.card')).toHaveClass('winner');
  });

  it("should render card as loser", () => {
    component.battleResult = BattleResult.Loser;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.querySelector('.card')).toHaveClass('loser');
  });

  it("should render card as draw", () => {
    component.battleResult = BattleResult.Draw;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.querySelector('.card')).toHaveClass('draw');
  });

  it("should render card as final winner", () => {
    component.battleResult = BattleResult.FinalWinner;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.querySelector('.card')).toHaveClass('final-winner');
  });
});
