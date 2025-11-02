import { FormControl } from '@angular/forms';
import { Gender } from './gender';

export interface EmployeeUpdateForm {
  readonly firstName: FormControl<string>;
  readonly lastName: FormControl<string>;
  readonly gender: FormControl<Gender | ''>;
}

export interface EmployeeUpdate {
  readonly id: number;
  readonly employeeId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: Gender;
}
