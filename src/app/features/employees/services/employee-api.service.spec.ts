import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeAdd, EmployeeUpdate } from '../models/employee-form';
import { Gender } from '../models/gender';
import { EmployeeStore } from '../store/employee.store';
import { EmployeeApiService } from './employee-api.service';

describe('EmployeeApiService', () => {
  let service: EmployeeApiService;
  let employeeStore: EmployeeStore;

  const mockEmployees: Employee[] = [
    { id: 1, employeeId: '00000001', firstName: 'Jan', lastName: 'Kowalski', gender: Gender.Male },
    { id: 2, employeeId: '00000002', firstName: 'Anna', lastName: 'Nowak', gender: Gender.Female },
    {
      id: 3,
      employeeId: '00000003',
      firstName: 'Piotr',
      lastName: 'Wiśniewski',
      gender: Gender.Male,
    },
    {
      id: 4,
      employeeId: '00000004',
      firstName: 'Maria',
      lastName: 'Wójcik',
      gender: Gender.Female,
    },
    {
      id: 5,
      employeeId: '00000005',
      firstName: 'Tomasz',
      lastName: 'Kamiński',
      gender: Gender.Male,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeApiService, EmployeeStore],
    });
    service = TestBed.inject(EmployeeApiService);
    employeeStore = TestBed.inject(EmployeeStore);

    for (let i = 0; i < 20; i++) {
      employeeStore.deleteEmployee(i);
    }
    mockEmployees.forEach((employee) => employeeStore.addEmployee(employee));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEmployees', () => {
    it('should return all employees when no params provided', async () => {
      const result = await firstValueFrom(service.getEmployees());

      expect(result.data.length).toBe(mockEmployees.length);
      expect(result.total).toBe(mockEmployees.length);
      expect(result.hasMore).toBeFalse();
    });

    it('should return paginated employees when limit is provided', async () => {
      const limit = 3;
      const result = await firstValueFrom(service.getEmployees({ limit }));

      expect(result.data.length).toBe(limit);
      expect(result.total).toBe(mockEmployees.length);
      expect(result.hasMore).toBeTrue();
    });

    it('should filter employees by search term', async () => {
      const result = await firstValueFrom(service.getEmployees({ search: 'Kowalski' }));

      expect(result.data.length).toBe(1);
      expect(result.data[0].lastName).toBe('Kowalski');
      expect(result.total).toBe(1);
      expect(result.hasMore).toBeFalse();
    });

    it('should handle search with trimmed whitespace', async () => {
      const result = await firstValueFrom(service.getEmployees({ search: '  Anna  ' }));

      expect(result.data.length).toBe(1);
      expect(result.data[0].firstName).toBe('Anna');
    });

    it('should return all employees when search is empty string', async () => {
      const result = await firstValueFrom(service.getEmployees({ search: '' }));

      expect(result.data.length).toBe(mockEmployees.length);
      expect(result.total).toBe(mockEmployees.length);
    });

    it('should return empty array when search matches no employees', async () => {
      const result = await firstValueFrom(service.getEmployees({ search: 'NonexistentName' }));

      expect(result.data.length).toBe(0);
      expect(result.total).toBe(0);
      expect(result.hasMore).toBeFalse();
    });

    it('should sort employees when sort param is provided', async () => {
      const result = await firstValueFrom(service.getEmployees({ sort: 'firstName,asc' }));

      expect(result.data[0].firstName).toBe('Anna');
      expect(result.data.length).toBe(mockEmployees.length);
    });

    it('should combine search, sort and limit', async () => {
      const result = await firstValueFrom(
        service.getEmployees({
          search: 'a',
          sort: 'firstName,asc',
          limit: 2,
        })
      );

      expect(result.data.length).toBe(2);
      expect(result.hasMore).toBeTrue();
    });
  });

  describe('getEmployee', () => {
    it('should return employee by id', async () => {
      const result = await firstValueFrom(service.getEmployee(1));

      expect(result).toBeTruthy();
      expect(result?.id).toBe(1);
      expect(result?.firstName).toBe('Jan');
      expect(result?.lastName).toBe('Kowalski');
    });

    it('should return undefined when employee not found', async () => {
      const result = await firstValueFrom(service.getEmployee(999));

      expect(result).toBeUndefined();
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee with generated id and employeeId', async () => {
      const newEmployee: EmployeeAdd = {
        firstName: 'Nowy',
        lastName: 'Pracownik',
        gender: Gender.Male,
      };

      const result = await firstValueFrom(service.createEmployee(newEmployee));

      expect(result).toEqual(newEmployee);

      const employees = employeeStore.employees();
      expect(employees.length).toBe(mockEmployees.length + 1);
      expect(employees[0].firstName).toBe('Nowy');
      expect(employees[0].lastName).toBe('Pracownik');
      expect(employees[0].id).toBeDefined();
      expect(employees[0].employeeId).toBeDefined();
    });

    it('should add employee to the beginning of the list', async () => {
      const newEmployee: EmployeeAdd = {
        firstName: 'First',
        lastName: 'Employee',
        gender: Gender.Female,
      };

      await firstValueFrom(service.createEmployee(newEmployee));

      const employees = employeeStore.employees();
      expect(employees[0].firstName).toBe('First');
    });
  });

  describe('updateEmployee', () => {
    it('should update existing employee', async () => {
      const updateData: EmployeeUpdate = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        gender: Gender.Female,
      };

      const result = await firstValueFrom(service.updateEmployee(1, updateData));

      expect(result).toEqual(updateData);

      const updatedEmployee = employeeStore.getEmployee(1);
      expect(updatedEmployee?.firstName).toBe('UpdatedFirstName');
      expect(updatedEmployee?.lastName).toBe('UpdatedLastName');
      expect(updatedEmployee?.gender).toBe(Gender.Female);
    });

    it('should preserve id and employeeId when updating', async () => {
      const originalEmployee = employeeStore.getEmployee(1);
      const updateData: EmployeeUpdate = {
        firstName: 'NewName',
        lastName: 'NewLastName',
        gender: Gender.Female,
      };

      await firstValueFrom(service.updateEmployee(1, updateData));

      const updatedEmployee = employeeStore.getEmployee(1);
      expect(updatedEmployee?.id).toBe(originalEmployee?.id);
      expect(updatedEmployee?.employeeId).toBe(originalEmployee?.employeeId);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete employee by id', async () => {
      const initialCount = employeeStore.employees().length;

      const result = await firstValueFrom(service.deleteEmployee(1));

      expect(result).toBe(1);

      const employees = employeeStore.employees();
      expect(employees.length).toBe(initialCount - 1);
      expect(employeeStore.getEmployee(1)).toBeUndefined();
    });

    it('should not affect other employees when deleting', async () => {
      const employee2 = employeeStore.getEmployee(2);
      const employee3 = employeeStore.getEmployee(3);

      await firstValueFrom(service.deleteEmployee(1));

      expect(employeeStore.getEmployee(2)).toEqual(employee2);
      expect(employeeStore.getEmployee(3)).toEqual(employee3);
    });
  });
});
