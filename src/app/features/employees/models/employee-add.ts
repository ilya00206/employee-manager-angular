import { FormControl } from '@angular/forms';
import { Gender } from './gender';

export interface EmployeeAddForm {
  readonly firstName: FormControl<string>;
  readonly lastName: FormControl<string>;
  readonly gender: FormControl<Gender | ''>;
}

export interface EmployeeAdd {
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: Gender;
}
