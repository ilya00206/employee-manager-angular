import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      // Zostawiam ścieżkę '/', aby móc dodać stronę startową do aplikacji w razie potrzeby
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },

      // można by było zrobić preloading dla tej ścieżki
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
