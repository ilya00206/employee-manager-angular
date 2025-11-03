import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Card } from '@common/components/card/card';
import { NavigationBack } from '@common/components/navigation-back/navigation-back';
import { Page } from '@common/components/page/page';
import { EmployeeFormFooter } from '../../components/employee-form-footer/employee-form-footer';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { Employee } from '../../models/employee';
import { EmployeeUpdate } from '../../models/employee-update';
import { EmployeeApiService } from '../../services/employee-api.service';
import { EmployeeFormBuilder } from '../../services/employee-form.builder';

@Component({
  selector: 'app-update-employee-page',
  imports: [Card, EmployeeForm, Page, EmployeeFormFooter, NavigationBack],
  templateUrl: './update-employee-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmployeePage {
  readonly employee = input.required<Employee>();

  private readonly employeeFormBuilder = inject(EmployeeFormBuilder);
  private readonly apiService = inject(EmployeeApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly formId = 'employeeUpdateForm';
  readonly form = computed(() => this.employeeFormBuilder.createForm(this.employee()));

  onSubmitEmployee() {
    this.apiService
      .updateEmployee(this.employee().id, this.form().getRawValue() as EmployeeUpdate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
