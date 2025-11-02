import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { filter, lastValueFrom, switchMap } from 'rxjs';
import { ConfirmDialog } from '../../../../common/components/confirm-dialog/confirm-dialog';
import { Page } from '../../../../common/components/page/page';
import { EmployeeList } from '../../components/employee-list/employee-list';
import { EmployeeSearch } from '../../components/employee-search/employee-search';
import { EmployeeSort } from '../../components/employee-sort/employee-sort';
import { Employee } from '../../models/employee';
import { EmployeeApiService } from '../../services/employee-api.service';

@Component({
  selector: 'app-employee-list-page',
  imports: [Page, EmployeeList, DialogModule, EmployeeSearch, EmployeeSort, RouterLink],
  templateUrl: './employee-list-page.html',
  styleUrl: './employee-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPage {
  private readonly apiService = inject(EmployeeApiService);
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);
  private readonly pageSize = 10;
  private readonly savedScrollPosition = signal<number>(0);
  private readonly viewportScroller = inject(ViewportScroller);

  private readonly queryParams = injectQueryParams();

  readonly search = linkedSignal<string>(() => this.queryParams()['search'] ?? '');
  readonly sort = linkedSignal<string>(() => this.queryParams()['sort'] ?? '');
  readonly limit = linkedSignal<number>(() =>
    this.queryParams()['limit'] ? Number(this.queryParams()['limit']) : this.pageSize
  );

  private readonly employeesResource = resource({
    params: () => ({
      search: this.search(),
      sort: this.sort(),
      limit: this.limit(),
    }),
    loader: ({ params }) => lastValueFrom(this.apiService.getEmployees(params)),
  });

  readonly employees = computed(() => this.employeesResource.value()?.data ?? []);
  readonly hasMore = computed(() => this.employeesResource.value()?.hasMore ?? false);
  readonly isLoading = computed(() => this.employeesResource.isLoading());

  constructor() {
    effect(() => this.updateQueryParams(this.search(), this.sort(), this.limit()));
    effect(() => this.restoreScroll(this.isLoading(), this.savedScrollPosition()));
  }

  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open<string>(ConfirmDialog, {
      width: '300px',
      data: { message: 'Czy na pewno chcesz usunąć tego pracownika?' },
    });
    dialogRef.closed
      .pipe(
        filter(Boolean),
        switchMap(() => this.apiService.deleteEmployee(employee.id))
      )
      .subscribe(() => this.employeesResource.reload());
  }

  loadMore(): void {
    this.savedScrollPosition.set(this.viewportScroller.getScrollPosition()[1] ?? 0);
    this.limit.update((current) => current + this.pageSize);
  }

  private restoreScroll(isLoading: boolean, savedPosition: number): void {
    if (!isLoading && savedPosition !== 0) {
      setTimeout(() => {
        this.viewportScroller.scrollToPosition([0, savedPosition]);
      });
    }
  }

  private updateQueryParams(search: string, sort: string, limit: number): void {
    this.router.navigate([], {
      queryParams: {
        search: search || undefined,
        sort: sort || undefined,
        limit: limit || undefined,
      },
      queryParamsHandling: 'merge',
    });
  }
}
