import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../../common/components/page/page';

import { Location } from '@angular/common';
import { CardComponent } from '../../../../common/ui/card/card';
import { EmployeeFormFooter } from '../../components/employee-form-footer/employee-form-footer';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { Employee } from '../../models/employee';
import { EmployeeUpdate, EmployeeUpdateForm } from '../../models/employee-update';
import { EmployeeApiService } from '../../services/employee-api.service';

function createForm(formBuilder: NonNullableFormBuilder, employee: Employee) {
  return formBuilder.group<EmployeeUpdateForm>({
    firstName: formBuilder.control(employee.firstName, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    lastName: formBuilder.control(employee.lastName, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    gender: formBuilder.control(employee.gender, [Validators.required]),
  });
}

@Component({
  selector: 'app-update-employee-page',
  imports: [CardComponent, EmployeeForm, Page, EmployeeFormFooter],
  templateUrl: './update-employee-page.html',
  styleUrl: './update-employee-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmployeePage {
  readonly employee = input.required<Employee>();

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly apiService = inject(EmployeeApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  readonly formId = 'employeeUpdateForm';
  readonly form = computed(() => createForm(this.fb, this.employee()));

  onCancel() {
    this.location.back();
  }

  onSubmitEmployee() {
    this.apiService
      .updateEmployee(this.employee().id, this.form().getRawValue() as EmployeeUpdate)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
