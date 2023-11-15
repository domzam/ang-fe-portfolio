import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { MaterialModule } from "../../modules/material/material.module";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        MaterialModule
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be displayed", () => {
    expect(component).toBeDefined();
  });

  it("should display 'Play a game' item", () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    expect(headerElement.textContent).toContain('Play a game');
  });

  it("should display 'Stats' item", () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    expect(headerElement.textContent).toContain('Stats');
  });

  it("should items count be '2'", () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    expect(headerElement.querySelectorAll('.item').length).toBe(2);
  });

  it("should display 'END GAME' button", () => {
    component.isPlaying = true;
    fixture.detectChanges();
    const headerElement: HTMLElement = fixture.nativeElement;
    expect(headerElement.querySelector('.end-game')?.textContent).toContain('END GAME');
  });

  it("should emit 'endGameEvent'", () => {
    spyOn(component.endGameEvent, 'emit');
    component.onEndGame();
    expect(component.endGameEvent.emit).toHaveBeenCalled();
  });

  it("should call 'onEndGame()' after click", () => {
    spyOn(component, 'onEndGame');
    component.isPlaying = true;
    fixture.detectChanges();
    const headerElement = fixture.debugElement.nativeElement;
    headerElement.querySelector('.end-game').click();
    expect(component.onEndGame).toHaveBeenCalled();
  });
});