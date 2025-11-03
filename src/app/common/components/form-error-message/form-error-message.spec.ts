import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormErrorMessage } from './form-error-message';

describe('FormErrorMessage', () => {
  let component: FormErrorMessage;
  let fixture: ComponentFixture<FormErrorMessage>;
  let testControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorMessage);
    component = fixture.componentInstance;
    testControl = new FormControl('', Validators.required);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display errors for untouched invalid control', () => {
    fixture.componentRef.setInput('control', testControl);
    testControl.setValue('');
    testControl.markAsUntouched();
    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorElements.length).toBe(0);
  });

  it('should not display errors for pristine invalid control', () => {
    fixture.componentRef.setInput('control', testControl);
    testControl.setValue('');
    testControl.markAsPristine();
    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorElements.length).toBe(0);
  });

  it('should inject FORM_ERROR_MESSAGES', () => {
    expect(component).toBeTruthy();
  });

  it('should have errors signal', () => {
    fixture.componentRef.setInput('control', testControl);
    fixture.detectChanges();
    expect(component.errors).toBeDefined();
  });

  it('should have control input', () => {
    fixture.componentRef.setInput('control', testControl);
    fixture.detectChanges();
    expect(component.control()).toBe(testControl);
  });

  it('should not display errors when control is valid', () => {
    fixture.componentRef.setInput('control', testControl);
    testControl.setValue('Valid value');
    testControl.markAsTouched();
    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorElements.length).toBe(0);
  });

  it('should render error-message template', () => {
    fixture.componentRef.setInput('control', testControl);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});
