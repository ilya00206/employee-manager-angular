import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { employeeDetailsResolver } from './employee-details.resolver';
import { EmployeeApiService } from '../services/employee-api.service';
import { EmployeeStore } from '../store/employee.store';
import { Gender } from '../models/gender';
import { Employee } from '../models/employee';

describe('employeeDetailsResolver', () => {
  let employeeStore: EmployeeStore;
  let employeeApiService: EmployeeApiService;

  const mockEmployees: Employee[] = [
    { id: 1, employeeId: '00000001', firstName: 'Jan', lastName: 'Kowalski', gender: Gender.Male },
    { id: 2, employeeId: '00000002', firstName: 'Anna', lastName: 'Nowak', gender: Gender.Female },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeApiService, EmployeeStore],
    });

    employeeStore = TestBed.inject(EmployeeStore);
    employeeApiService = TestBed.inject(EmployeeApiService);

    for (let i = 0; i < 20; i++) {
      employeeStore.deleteEmployee(i);
    }
    mockEmployees.forEach((employee) => employeeStore.addEmployee(employee));
  });

  it('should resolve employee by id from route params', (done) => {
    const route = {
      paramMap: {
        get: (key: string) => (key === 'id' ? '1' : null),
      },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result = employeeDetailsResolver(route, {} as RouterStateSnapshot);
      (result as Observable<Employee | undefined>).subscribe((employee) => {
        expect(employee).toBeTruthy();
        expect(employee?.id).toBe(1);
        expect(employee?.firstName).toBe('Jan');
        expect(employee?.lastName).toBe('Kowalski');
        done();
      });
    });
  });

  it('should resolve employee with id 2', (done) => {
    const route = {
      paramMap: {
        get: (key: string) => (key === 'id' ? '2' : null),
      },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result = employeeDetailsResolver(route, {} as RouterStateSnapshot);
      (result as Observable<Employee | undefined>).subscribe((employee) => {
        expect(employee).toBeTruthy();
        expect(employee?.id).toBe(2);
        expect(employee?.firstName).toBe('Anna');
        expect(employee?.lastName).toBe('Nowak');
        done();
      });
    });
  });

  it('should return undefined when employee not found', (done) => {
    const route = {
      paramMap: {
        get: (key: string) => (key === 'id' ? '999' : null),
      },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result = employeeDetailsResolver(route, {} as RouterStateSnapshot);
      (result as Observable<Employee | undefined>).subscribe((employee) => {
        expect(employee).toBeUndefined();
        done();
      });
    });
  });

  it('should handle non-numeric id', (done) => {
    const route = {
      paramMap: {
        get: (key: string) => (key === 'id' ? 'invalid' : null),
      },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result = employeeDetailsResolver(route, {} as RouterStateSnapshot);
      (result as Observable<Employee | undefined>).subscribe((employee) => {
        expect(employee).toBeUndefined();
        done();
      });
    });
  });

  it('should handle null id param', (done) => {
    const route = {
      paramMap: {
        get: () => null,
      },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result = employeeDetailsResolver(route, {} as RouterStateSnapshot);
      (result as Observable<Employee | undefined>).subscribe((employee) => {
        expect(employee).toBeUndefined();
        done();
      });
    });
  });

  it('should call employeeApiService.getEmployee with correct id', (done) => {
    const spy = spyOn(employeeApiService, 'getEmployee').and.callThrough();

    const route = {
      paramMap: {
        get: (key: string) => (key === 'id' ? '1' : null),
      },
    } as unknown as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() => {
      const result = employeeDetailsResolver(route, {} as RouterStateSnapshot);
      (result as Observable<Employee | undefined>).subscribe(() => {
        expect(spy).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
});
