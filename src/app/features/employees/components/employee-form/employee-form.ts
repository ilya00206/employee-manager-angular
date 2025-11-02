import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from '../../../../common/ui/form-control/form-control.component';
import { EmployeeAddForm } from '../../models/employee-add';
import { genderOptions } from '../../data/gender-options';
import { RequiredHelper } from '../../../../common/ui/required-helper/required-helper';

@Component({
  selector: 'app-employee-form',
  imports: [FormControlComponent, ReactiveFormsModule, RequiredHelper],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeForm {
  readonly form = input.required<FormGroup<EmployeeAddForm>>();
  readonly formId = input.required<string>();
  readonly submitEmployee = output<void>();

  readonly genderOptions = genderOptions;
}
