import { TestBed } from '@angular/core/testing';
import { employees as seedEmployees } from '../data/employees';
import { Employee } from '../models/employee';
import { Gender } from '../models/gender';
import { EmployeeStore } from './employee.store';

describe('EmployeeStore', () => {
  let service: EmployeeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with seed employees', () => {
    expect(service.employees().length).toBe(seedEmployees.length);
  });

  it('should return employee by id and undefined for missing id', () => {
    const existing = seedEmployees[0];
    expect(service.getEmployee(existing.id)).toEqual(existing);
    expect(service.getEmployee(999999)).toBeUndefined();
  });

  it('should add a new employee to the beginning of the list', () => {
    const initialLength = service.employees().length;
    const newEmployee: Employee = {
      id: 1000,
      employeeId: '00100000',
      firstName: 'New',
      lastName: 'Employee',
      gender: Gender.Male,
    };

    service.addEmployee(newEmployee);

    const list = service.employees();
    expect(list.length).toBe(initialLength + 1);
    expect(list[0]).toEqual(newEmployee);
  });

  it('should update an existing employee fields immutably', () => {
    const target = seedEmployees[1];
    const before = service.employees();

    service.updateEmployee(target.id, {
      firstName: 'Updated',
      lastName: 'User',
      gender: target.gender,
    });

    const after = service.employees();
    const updated = service.getEmployee(target.id)!;

    expect(updated.firstName).toBe('Updated');
    expect(updated.lastName).toBe('User');
    expect(updated.employeeId).toBe(target.employeeId);
    expect(updated.gender).toBe(target.gender);

    expect(after).not.toBe(before);
  });

  it('should not change state when updating non-existing id', () => {
    const snapshot = service.employees();
    service.updateEmployee(999998, { firstName: 'Noop', lastName: 'User', gender: Gender.Male });
    const next = service.employees();

    expect(next).not.toBe(snapshot);
    expect(next).toEqual(snapshot);
  });

  it('should delete an existing employee', () => {
    const target = seedEmployees[2];
    const initialLength = service.employees().length;

    service.deleteEmployee(target.id);

    const list = service.employees();
    expect(list.length).toBe(initialLength - 1);
    expect(list.find((e) => e.id === target.id)).toBeUndefined();
  });

  it('should keep state unchanged when deleting non-existing id', () => {
    const snapshot = service.employees();
    service.deleteEmployee(999997);
    const next = service.employees();

    expect(next).not.toBe(snapshot);
    expect(next).toEqual(snapshot);
  });
});
