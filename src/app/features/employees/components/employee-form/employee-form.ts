import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormControl } from '@common/components/form-control/form-control';
import { RequiredHelper } from '@common/components/required-helper/required-helper';
import { genderOptions } from '../../data/gender-options';
import { EmployeeAddForm } from '../../models/employee-add';

@Component({
  selector: 'app-employee-form',
  imports: [FormControl, ReactiveFormsModule, RequiredHelper],
  templateUrl: './employee-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeForm {
  readonly form = input.required<FormGroup<EmployeeAddForm>>();
  readonly formId = input.required<string>();
  readonly submitEmployee = output<void>();

  readonly genderOptions = genderOptions;
}
