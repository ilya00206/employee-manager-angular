import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { Card } from '@common/components/card/card';
import { NavigationBack } from '@common/components/navigation-back/navigation-back';
import { Page } from '@common/components/page/page';
import { EmployeeFormFooter } from '../../components/employee-form-footer/employee-form-footer';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { Employee } from '../../models/employee';
import { Gender } from '../../models/gender';
import { EmployeeUpdate } from '../../models/employee-form';
import { EmployeeApiService } from '../../services/employee-api.service';
import { EmployeeFormBuilder } from '../../services/employee-form.builder';
import { UpdateEmployeePage } from './update-employee-page';

describe('UpdateEmployeePage', () => {
  let component: UpdateEmployeePage;
  let fixture: ComponentFixture<UpdateEmployeePage>;
  let mockApiService: jasmine.SpyObj<EmployeeApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: Partial<ActivatedRoute>;
  const mockEmployee: Employee = {
    id: 1,
    employeeId: '00000001',
    firstName: 'Jan',
    lastName: 'Kowalski',
    gender: Gender.Male,
  };

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('EmployeeApiService', ['updateEmployee']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {
      data: of({}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      snapshot: { queryParams: {} } as any,
    };

    await TestBed.configureTestingModule({
      imports: [UpdateEmployeePage, Card, EmployeeForm, Page, EmployeeFormFooter, NavigationBack],
      providers: [
        { provide: EmployeeApiService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        EmployeeFormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeePage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a page component', () => {
    const pageComponent = fixture.debugElement.query(By.directive(Page));
    expect(pageComponent).toBeTruthy();
  });

  it('should contain a card component', () => {
    const cardComponent = fixture.debugElement.query(By.directive(Card));
    expect(cardComponent).toBeTruthy();
  });

  it('should contain an employee form component', () => {
    const formComponent = fixture.debugElement.query(By.directive(EmployeeForm));
    expect(formComponent).toBeTruthy();
  });

  it('should contain a navigation back component', () => {
    const navBackComponent = fixture.debugElement.query(By.directive(NavigationBack));
    expect(navBackComponent).toBeTruthy();
  });

  it('should have formId set to employeeUpdateForm', () => {
    expect(component.formId).toBe('employeeUpdateForm');
  });

  it('should create a form with employee data', () => {
    expect(component.form()).toBeTruthy();
    const formValue = component.form().getRawValue();
    expect(formValue.firstName).toBe('Jan');
    expect(formValue.lastName).toBe('Kowalski');
  });

  it('should call updateEmployee and navigate on submit', () => {
    const mockEmployeeUpdate: EmployeeUpdate = component.form().getRawValue() as EmployeeUpdate;
    mockApiService.updateEmployee.and.returnValue(of(mockEmployeeUpdate));

    component.onSubmitEmployee();

    expect(mockApiService.updateEmployee).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['../../'],
      jasmine.objectContaining({ relativeTo: mockRoute })
    );
  });
});
