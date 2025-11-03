import { Route } from '@angular/router';
import { Breadcrumbs } from '@common/components/breadcrumbs/breadcrumb.model';
import { AddEmployeePage } from './pages/add-employee-page/add-employee-page';
import { EmployeeListPage } from './pages/employee-list-page/employee-list-page';
import { UpdateEmployeePage } from './pages/update-employee-page/update-employee-page';
import { employeeDetailsResolver } from './resolvers/employee-details.resolver';

const routes: Route[] = [
  {
    path: '',
    component: EmployeeListPage,
    title: 'Pracownicy',
    data: {
      breadcrumbs: new Breadcrumbs([]),
      heading: 'Pracownicy',
    },
  },
  {
    path: 'add',
    component: AddEmployeePage,
    title: 'Dodaj nowego pracownika',
    data: {
      breadcrumbs: new Breadcrumbs([
        { label: 'Dodaj nowego pracownika', routerLink: ['/employees/add'] },
      ]),
      heading: 'Dodaj nowego pracownika',
    },
  },
  {
    path: ':id',
    resolve: {
      employee: employeeDetailsResolver,
    },
    children: [
      {
        path: 'update',
        component: UpdateEmployeePage,
        title: 'Aktualizuj dane pracownika',
        data: {
          breadcrumbs: new Breadcrumbs([
            { label: 'Aktualizuj dane pracownika', routerLink: ['/employees/:id/update'] },
          ]),
          heading: 'Aktualizuj dane pracownika',
        },
      },
    ],
  },
];

export default routes;
