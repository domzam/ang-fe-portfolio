import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule, } from "@ngxs/store";
import { MaterialModule } from "../../../../modules/material/material.module";
import { HeaderComponent } from "../../../../components/header/header.component";
import { GameCardComponent } from "../../components/game-card/game-card.component";
import { StarshipCardComponent } from "../../components/starship-card/starship-card.component";
import { AppRoutingModule } from "../../../../app-routing.module";
import { of } from "rxjs";
import { BattlefieldComponent } from "./battlefield.component";

import { GameOption } from "../../models/game-option.enum";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BattlefieldHeaderComponent } from "../../components/battlefield-header/battlefield-header.component";

describe('AppComponent', () => {
  let component: BattlefieldComponent;
  let fixture: ComponentFixture<BattlefieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BattlefieldComponent,
        HeaderComponent,
        GameCardComponent,
        StarshipCardComponent,
        BattlefieldHeaderComponent
      ],
      imports: [
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([])
      ]
    });
    fixture = TestBed.createComponent(BattlefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    Object.defineProperty(component, 'isPlaying$', { writable: true });
    Object.defineProperty(component, 'isLoading$', { writable: true });
  });


  it("should be displayed", () => {
    expect(component).toBeDefined();
  });

  it("should display 'Enter name' input and 'Start game' button", () => {
    const appElement: HTMLElement = fixture.nativeElement;
    expect(appElement.querySelector('.start-game input')).toBeDefined();
    expect(appElement.querySelector('.start-game .start-game-button')).toBeDefined();
  });

  it("should display 'Game is loading...' message and spinner", () => {
    component.isPlaying$ = of(true);
    component.isLoading$ = of(true);
    fixture.detectChanges();
    const battlefieldElement: HTMLElement = fixture.nativeElement;
    expect(battlefieldElement.querySelector('.game-loading-text')?.textContent).toContain('Game is loading ...');
    expect(battlefieldElement.querySelector('.game-loading-progress')).toBeDefined();
  });

  it("should display 'people' cards", () => {
    component.isPlaying$ = of(true);
    component.isLoading$ = of(false);
    component.selectedOption = GameOption.People;
    fixture.detectChanges();
    const battlefieldElement: HTMLElement = fixture.nativeElement;
    expect(battlefieldElement.querySelectorAll('app-game-card').length).toEqual(2);
  });

  it("should display 'starships' cards", () => {
    component.isPlaying$ = of(true);
    component.isLoading$ = of(false);
    component.selectedOption = GameOption.Starships;
    fixture.detectChanges();
    const battlefieldElement: HTMLElement = fixture.nativeElement;
    expect(battlefieldElement.querySelectorAll('app-starship-card').length).toEqual(2);
  });
});