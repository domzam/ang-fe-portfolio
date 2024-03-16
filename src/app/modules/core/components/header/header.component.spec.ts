import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { MaterialModule } from "../../../material/material.module";

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

  it("should display 'SW game' item", () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    expect(headerElement.textContent).toContain('SW Game');
  });
});