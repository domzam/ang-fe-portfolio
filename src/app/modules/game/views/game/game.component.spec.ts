import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { SnackbarService } from "src/app/modules/shared/services/snackbar.service";
import GameModule from "../../game.module";
import { GameState } from "../../state/game.state";
import { GameComponent } from "./game.component";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: Store;
  let snackbarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ],
      imports: [
        GameModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([GameState])
      ]
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    snackbarService = TestBed.inject(SnackbarService);

    Object.defineProperty(component, 'isCharactersLoading$', { writable: true });
    Object.defineProperty(component, 'isCharactersLoaded$', { writable: true });
    Object.defineProperty(component, 'isPlaying$', { writable: true });
  });

  it("should be displayed", () => {
    expect(component).toBeDefined();
  });

  it("should display game header",() => {
    expect(fixture.debugElement.query(By.css('app-game-header'))).toBeTruthy();
  });

  it("should display spinner when loading character", () => {
    component.isCharactersLoading$ = of(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.game-loading'))).toBeTruthy();
  });

  it("should display error message when failed to load characters", () => {
    component.isCharactersLoading$ = of(false);
    component.isCharactersLoaded$ = of(false);
    component.isPlaying$ = of(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.play-game-fail'))).toBeTruthy();
  });

});