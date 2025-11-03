import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from '@common/components/card/card';
import { NavigationBack } from '@common/components/navigation-back/navigation-back';
import { Page } from '@common/components/page/page';
import { EmployeeFormFooter } from '../../components/employee-form-footer/employee-form-footer';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { EmployeeAdd } from '../../models/employee-form';
import { EmployeeApiService } from '../../services/employee-api.service';
import { EmployeeFormBuilder } from '../../services/employee-form.builder';

@Component({
  selector: 'app-add-employee-page',
  imports: [Card, EmployeeForm, Page, EmployeeFormFooter, NavigationBack],
  templateUrl: './add-employee-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeePage {
  private readonly apiService = inject(EmployeeApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly employeeFormBuilder = inject(EmployeeFormBuilder);

  readonly formId = 'employeeAddForm';
  readonly form = computed(() => this.employeeFormBuilder.createForm());

  onSubmitEmployee() {
    this.apiService
      .createEmployee(this.form().getRawValue() as EmployeeAdd)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
