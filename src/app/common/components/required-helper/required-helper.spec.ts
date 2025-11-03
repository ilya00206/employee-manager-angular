import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RequiredHelper } from './required-helper';

describe('RequiredHelper', () => {
  let component: RequiredHelper;
  let fixture: ComponentFixture<RequiredHelper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredHelper],
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredHelper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display required helper text', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.textContent).toContain('Pola oznaczone');
    expect(element.textContent).toContain('są wymagane do wypełnienia');
  });

  it('should display asterisk mark', () => {
    const asteriskElement = fixture.debugElement.query(By.css('.required-mark'));
    expect(asteriskElement).toBeTruthy();
    expect(asteriskElement.nativeElement.textContent).toBe('*');
  });
});
