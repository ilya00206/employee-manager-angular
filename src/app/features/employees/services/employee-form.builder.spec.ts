import { TestBed } from '@angular/core/testing';
import { EmployeeFormBuilder } from './employee-form.builder';
import { ReactiveFormsModule } from '@angular/forms';
import { Gender } from '../models/gender';

describe('EmployeeFormBuilder', () => {
  let builder: EmployeeFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [EmployeeFormBuilder],
    });
    builder = TestBed.inject(EmployeeFormBuilder);
  });

  it('should create form with empty defaults and validators', () => {
    const form = builder.createForm();

    expect(form.controls.firstName.value).toBe('');
    expect(form.controls.lastName.value).toBe('');
    expect(form.controls.gender.value).toBe('');

    form.controls.firstName.setValue('');
    form.controls.lastName.setValue('');
    form.controls.gender.setValue('');
    form.updateValueAndValidity();

    expect(form.controls.firstName.hasError('required')).toBeTrue();
    expect(form.controls.lastName.hasError('required')).toBeTrue();
    expect(form.controls.gender.hasError('required')).toBeTrue();

    form.controls.firstName.setValue('a');
    form.controls.lastName.setValue('b');
    form.controls.gender.setValue(Gender.Male);
    form.updateValueAndValidity();

    expect(form.controls.firstName.valid).toBeTrue();
    expect(form.controls.lastName.valid).toBeTrue();
    expect(form.controls.gender.valid).toBeTrue();
  });

  it('should prefill form when employee is provided', () => {
    const form = builder.createForm({
      id: 1,
      employeeId: '00000001',
      firstName: 'Jan',
      lastName: 'Kowalski',
      gender: Gender.Female,
    });

    expect(form.controls.firstName.value).toBe('Jan');
    expect(form.controls.lastName.value).toBe('Kowalski');
    expect(form.controls.gender.value).toBe(Gender.Female);
  });
});
