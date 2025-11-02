import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Zostawiam ścieżkę '/', aby móc dodać stronę startową do aplikacji w razie potrzeby
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      {
        path: 'employees',
        loadChildren: () => import('./features/employees/employees.routes'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
