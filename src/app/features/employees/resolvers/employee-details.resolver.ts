import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeApiService } from '../services/employee-api.service';

export const employeeDetailsResolver: ResolveFn<Employee | undefined> = (
  route: ActivatedRouteSnapshot
) => {
  const employeeService = inject(EmployeeApiService);
  const id = route.paramMap.get('id');
  return employeeService.getEmployee(Number(id));
};
