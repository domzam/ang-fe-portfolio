import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { MaterialModule } from "../../../material/material.module";
import { CardComponent } from "./card.component";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent
      ],
      imports: [
        MaterialModule
      ]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it("should be displayed", () => {
    expect(component).toBeDefined();
  });

  it("should display score", () => {
    component.score = 3;
    component.scoreLimit = 5;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.score')).nativeElement.textContent
    ).toContain('3 / 5');
  });

  it("should display progress bar", () => {
    expect(fixture.debugElement.query(By.css('.progress'))).toBeTruthy();
  });

  it("should display progress bar value", () => {
    component.score = 3;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('mat-progress-bar')).componentInstance.value
    ).toBe(60);
  });

  it("should display spinner on loading", () => {
    component.isLoading = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.spinner'))).toBeTruthy();
  });

  it("should hide spinner when loaded", () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.spinner'))).toBeNull();
  });

  it("should display error icon when loaded and name equals null", () => {
    component.isLoading = false;
    component.name = undefined;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.error-icon'))).toBeTruthy();
  });

  it("should hide error icon when loaded and name not equals null", () => {
    component.isLoading = false;
    component.name = 'Luke';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.error-icon'))).toBeNull();
  });
});