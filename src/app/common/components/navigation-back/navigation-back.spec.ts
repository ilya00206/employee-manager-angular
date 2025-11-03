import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationBack } from './navigation-back';

describe('NavigationBack', () => {
  let component: NavigationBack;
  let fixture: ComponentFixture<NavigationBack>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBack],
      providers: [Location],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBack);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default label "Cofnij"', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent.trim()).toBe('Cofnij');
  });

  it('should display custom label when provided', () => {
    fixture.componentRef.setInput('label', 'Wróć');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent.trim()).toBe('Wróć');
  });

  it('should have button with secondary class', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList.contains('button')).toBeTrue();
    expect(button.nativeElement.classList.contains('secondary')).toBeTrue();
  });

  it('should call location.back() when button is clicked', () => {
    spyOn(location, 'back');

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(location.back).toHaveBeenCalled();
  });

  it('should call onCancel method when button is clicked', () => {
    spyOn(component, 'onCancel');

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(component.onCancel).toHaveBeenCalled();
  });
});
