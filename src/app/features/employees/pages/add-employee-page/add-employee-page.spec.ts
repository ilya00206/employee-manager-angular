import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { Card } from '@common/components/card/card';
import { NavigationBack } from '@common/components/navigation-back/navigation-back';
import { Page } from '@common/components/page/page';
import { EmployeeFormFooter } from '../../components/employee-form-footer/employee-form-footer';
import { EmployeeForm } from '../../components/employee-form/employee-form';
import { EmployeeAdd } from '../../models/employee-form';
import { EmployeeApiService } from '../../services/employee-api.service';
import { EmployeeFormBuilder } from '../../services/employee-form.builder';
import { AddEmployeePage } from './add-employee-page';

describe('AddEmployeePage', () => {
  let component: AddEmployeePage;
  let fixture: ComponentFixture<AddEmployeePage>;
  let mockApiService: jasmine.SpyObj<EmployeeApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('EmployeeApiService', ['createEmployee']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {
      data: of({}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      snapshot: { queryParams: {} } as any,
    };

    await TestBed.configureTestingModule({
      imports: [AddEmployeePage, Card, EmployeeForm, Page, EmployeeFormFooter, NavigationBack],
      providers: [
        { provide: EmployeeApiService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        EmployeeFormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeePage);
    component = fixture.componentInstance;
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

  it('should have formId set to employeeAddForm', () => {
    expect(component.formId).toBe('employeeAddForm');
  });

  it('should create a form', () => {
    expect(component.form()).toBeTruthy();
  });

  it('should call createEmployee and navigate on submit', () => {
    const mockEmployeeAdd: EmployeeAdd = component.form().getRawValue() as EmployeeAdd;
    mockApiService.createEmployee.and.returnValue(of(mockEmployeeAdd));

    component.onSubmitEmployee();

    expect(mockApiService.createEmployee).toHaveBeenCalledWith(jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['../'],
      jasmine.objectContaining({ relativeTo: mockRoute })
    );
  });
});
