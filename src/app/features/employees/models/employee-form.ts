import { FormControl } from '@angular/forms';
import { Gender } from './gender';

export interface EmployeeFormControls {
  readonly firstName: FormControl<string>;
  readonly lastName: FormControl<string>;
  readonly gender: FormControl<Gender | ''>;
}

export interface EmployeeAdd {
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: Gender;
}

export interface EmployeeUpdate {
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: Gender;
}
