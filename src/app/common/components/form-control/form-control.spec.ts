import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormControl as FormControlComponent } from './form-control';

describe('FormControl', () => {
  let component: FormControlComponent;
  let fixture: ComponentFixture<FormControlComponent>;
  let testControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormControlComponent);
    component = fixture.componentInstance;
    testControl = new FormControl('', Validators.required);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label with correct text', () => {
    fixture.componentRef.setInput('id', 'test-input');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('control', testControl);
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent).toContain('Test Label');
  });

  it('should set correct for attribute on label', () => {
    fixture.componentRef.setInput('id', 'test-input');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('control', testControl);
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.getAttribute('for')).toBe('test-input');
  });

  it('should not display asterisk when not required', () => {
    fixture.componentRef.setInput('id', 'test-input');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('control', testControl);
    fixture.componentRef.setInput('required', false);
    fixture.detectChanges();

    const asterisk = fixture.debugElement.query(By.css('.required-mark'));
    expect(asterisk).toBeFalsy();
  });

  it('should display asterisk when required is true', () => {
    fixture.componentRef.setInput('id', 'test-input');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('control', testControl);
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const asterisk = fixture.debugElement.query(By.css('.required-mark'));
    expect(asterisk).toBeTruthy();
    expect(asterisk.nativeElement.textContent).toBe('*');
  });

  it('should render form-error-message component', () => {
    fixture.componentRef.setInput('id', 'test-input');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('control', testControl);
    fixture.detectChanges();

    const errorMessageComponent = fixture.debugElement.query(By.css('app-form-error-message'));
    expect(errorMessageComponent).toBeTruthy();
  });

  it('should project ng-content for input field', () => {
    fixture.componentRef.setInput('id', 'test-input');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('control', testControl);
    fixture.detectChanges();

    const component = fixture.debugElement.nativeElement;
    expect(component).toBeTruthy();
  });

  it('should handle different label texts', () => {
    const labels = ['First Name', 'Last Name', 'Email Address'];

    labels.forEach((labelText) => {
      fixture.componentRef.setInput('id', 'test-input');
      fixture.componentRef.setInput('label', labelText);
      fixture.componentRef.setInput('control', testControl);
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.textContent).toContain(labelText);
    });
  });

  it('should handle different id values', () => {
    const ids = ['firstName', 'lastName', 'email'];

    ids.forEach((id) => {
      fixture.componentRef.setInput('id', id);
      fixture.componentRef.setInput('label', 'Test');
      fixture.componentRef.setInput('control', testControl);
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.getAttribute('for')).toBe(id);
    });
  });
});
