import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../../common/components/page/page';
import { Card } from '../../../../common/components/card/card';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { EmployeeAdd, EmployeeAddForm } from '../../models/employee-add';
import { EmployeeApiService } from '../../services/employee-api.service';
import { EmployeeFormFooter } from '../../components/employee-form-footer/employee-form-footer';

@Component({
  selector: 'app-add-employee-page',
  imports: [Card, EmployeeForm, Page, EmployeeFormFooter],
  templateUrl: './add-employee-page.html',
  styleUrl: './add-employee-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeePage {
  private readonly fb = inject(NonNullableFormBuilder);

  private readonly apiService = inject(EmployeeApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  readonly formId = 'employeeAddForm';
  readonly form = this.fb.group<EmployeeAddForm>({
    firstName: this.fb.control('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    lastName: this.fb.control('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    gender: this.fb.control('', [Validators.required]),
  });

  onCancel() {
    this.location.back();
  }

  onSubmitEmployee() {
    this.apiService.createEmployee(this.form.getRawValue() as EmployeeAdd).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
