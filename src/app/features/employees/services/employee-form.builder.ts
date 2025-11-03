import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Employee } from '../models/employee';
import { EmployeeFormControls } from '../models/employee-form';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFormBuilder {
  private readonly fb = inject(NonNullableFormBuilder);

  createForm(employee?: Employee) {
    return this.fb.group<EmployeeFormControls>({
      firstName: this.fb.control(employee?.firstName ?? '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      lastName: this.fb.control(employee?.lastName ?? '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      gender: this.fb.control(employee?.gender ?? '', [Validators.required]),
    });
  }
}
