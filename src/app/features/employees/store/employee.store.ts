import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee';
import { employees } from '../data/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStore {
  private readonly _employees = signal<Employee[]>(employees);

  get employees() {
    return this._employees.asReadonly();
  }

  getEmployee(id: number) {
    return this._employees().find((employee) => employee.id === id);
  }

  addEmployee(employee: Employee) {
    this._employees.update((employees) => [...employees, employee]);
  }

  updateEmployee(id: number, updatedEmployee: Employee) {
    this._employees.update((employees) =>
      employees.map((e) => (e.id === id ? { ...e, ...updatedEmployee } : e))
    );
  }

  deleteEmployee(id: number) {
    this._employees.update((employees) => employees.filter((e) => e.id !== id));
  }
}
