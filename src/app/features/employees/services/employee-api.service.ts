import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiResponse } from '@core/api-response';
import { Employee } from '../models/employee';
import { EmployeeAdd } from '../models/employee-add';
import { EmployeeUpdate } from '../models/employee-update';
import { EmployeeStore } from '../store/employee.store';
import { filterEmployee } from '../utils/filterEmployee';
import { generateEmployeeId } from '../utils/generateEmployeeId';
import { generateId } from '../utils/generateId';
import { sortEmployee } from '../utils/sortEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private readonly employeeStore = inject(EmployeeStore);

  getEmployees(params?: {
    search?: string;
    sort?: string;
    limit?: number;
  }): Observable<ApiResponse<Employee>> {
    let data = [...this.employeeStore.employees()];
    if (params?.sort) {
      data = sortEmployee(data, params.sort);
    }
    const search = params?.search?.trim() ?? '';
    if (search.length > 0) {
      data = filterEmployee(data, search);
    }

    const total = data.length;
    const limit = params?.limit ?? data.length;
    const paginatedData = data.slice(0, limit);

    return of({
      data: paginatedData,
      total: total,
      hasMore: limit < total,
    });
  }

  getEmployee(id: number): Observable<Employee | undefined> {
    return of(this.employeeStore.getEmployee(id));
  }

  createEmployee(employee: EmployeeAdd): Observable<EmployeeAdd> {
    const newEmployee: Employee = {
      ...employee,
      id: generateId(),
      employeeId: generateEmployeeId(this.employeeStore.employees().length + 1),
    };
    this.employeeStore.addEmployee(newEmployee);
    return of(employee);
  }

  updateEmployee(id: number, employee: EmployeeUpdate): Observable<EmployeeUpdate> {
    this.employeeStore.updateEmployee(id, employee);
    return of(employee);
  }

  deleteEmployee(id: number): Observable<number> {
    this.employeeStore.deleteEmployee(id);
    return of(id);
  }
}
