import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GameHeaderComponent } from "./game-header.component";
import { MaterialModule } from "../../../material/material.module";
import { By } from "@angular/platform-browser";
import { GameOption } from "../../enums/game-option.enum";
import { provideAnimations } from "@angular/platform-browser/animations";
import { GameEvent } from "../../enums/game-event.enum";

  describe('GameHeaderComponent', () => {
  let component: GameHeaderComponent;
  let fixture: ComponentFixture<GameHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameHeaderComponent
      ],
      imports: [
        MaterialModule,
      ],
      providers: [
        provideAnimations()
      ]
    });
    fixture = TestBed.createComponent(GameHeaderComponent);
    component = fixture.componentInstance;
  });

  it("should be displayed", () => {
    expect(component).toBeDefined();
  });

  it("should call onStartGame() after 'PLAY A GAME' button click", () => {
    component.gameOption = GameOption.People;
    component.isPlaying = false;
    component.isCharactersLoading = false;
    component.isCharactersLoaded = true;
    fixture.detectChanges();

    spyOn(component, 'onStartGame');
    const button = fixture.debugElement.queryAll(By.css('button')).find(
      buttonDebugEl => buttonDebugEl.nativeElement.textContent === 'PLAY A GAME'
    );
    expect(button).toBeTruthy();
    button?.nativeElement.click();
    expect(component.onStartGame).toHaveBeenCalledTimes(1);
  });

  it("should call 'gameEvent' event emiter with 'GameEvent.Start' after 'onStartGame()' call", () => {
    spyOn(component.gameEvent, 'emit');
    component.onStartGame();
    expect(component.gameEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.gameEvent.emit).toHaveBeenCalledWith(GameEvent.Start);
  })
});