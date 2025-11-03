import { Dialog } from '@angular/cdk/dialog';
import { ViewportScroller } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { BehaviorSubject, EMPTY, of } from 'rxjs';

import { Employee } from '../../models/employee';
import { Gender } from '../../models/gender';
import { EmployeeApiService } from '../../services/employee-api.service';
import { EmployeeListPage } from './employee-list-page';

describe('EmployeeListPage', () => {
  let component: EmployeeListPage;
  let fixture: ComponentFixture<EmployeeListPage>;
  let apiService: jasmine.SpyObj<EmployeeApiService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<Dialog>;
  let viewportScroller: jasmine.SpyObj<ViewportScroller>;
  let queryParams$: BehaviorSubject<Record<string, string>>;
  let activatedRoute: Partial<ActivatedRoute>;

  const mockEmployees: Employee[] = [
    {
      id: 1,
      employeeId: '00000001',
      firstName: 'Jan',
      lastName: 'Kowalski',
      gender: Gender.Male,
    },
    {
      id: 2,
      employeeId: '00000002',
      firstName: 'Anna',
      lastName: 'Nowak',
      gender: Gender.Female,
    },
  ];

  beforeEach(async () => {
    queryParams$ = new BehaviorSubject<Record<string, string>>({});

    apiService = jasmine.createSpyObj('EmployeeApiService', ['getEmployees', 'deleteEmployee']);
    router = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl']);
    dialog = jasmine.createSpyObj('Dialog', ['open']);
    viewportScroller = jasmine.createSpyObj('ViewportScroller', [
      'getScrollPosition',
      'scrollToPosition',
    ]);

    activatedRoute = {
      queryParams: queryParams$.asObservable(),
      data: of({}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      snapshot: { queryParams: {} } as any,
    };

    apiService.getEmployees.and.returnValue(of({ data: mockEmployees, total: 2, hasMore: false }));
    apiService.deleteEmployee.and.returnValue(of(1));
    router.navigate.and.returnValue(Promise.resolve(true));
    router.createUrlTree.and.returnValue({} as UrlTree);
    router.serializeUrl.and.returnValue('');
    Object.defineProperty(router, 'events', { value: EMPTY, writable: false });
    viewportScroller.getScrollPosition.and.returnValue([0, 0]);

    await TestBed.configureTestingModule({
      imports: [EmployeeListPage],
      providers: [
        { provide: EmployeeApiService, useValue: apiService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Dialog, useValue: dialog },
        { provide: ViewportScroller, useValue: viewportScroller },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees on init', () => {
    expect(apiService.getEmployees).toHaveBeenCalled();
    expect(component.employees().length).toBe(2);
  });

  it('should have initial search as empty string', () => {
    expect(component.search()).toBe('');
  });

  it('should have initial sort as empty string', () => {
    expect(component.sort()).toBe('');
  });

  it('should have initial limit as 10', () => {
    expect(component.limit()).toBe(10);
  });

  it('should set hasMore based on API response', () => {
    expect(component.hasMore()).toBe(false);
  });

  it('should increase limit by 10 on loadMore', () => {
    const initialLimit = component.limit();

    component.loadMore();

    expect(component.limit()).toBe(initialLimit + 10);
  });

  it('should save scroll position on loadMore', () => {
    viewportScroller.getScrollPosition.and.returnValue([0, 500]);

    component.loadMore();

    expect(viewportScroller.getScrollPosition).toHaveBeenCalled();
  });

  it('should update search signal', () => {
    component.search.set('test');

    expect(component.search()).toBe('test');
  });

  it('should update sort signal', () => {
    component.sort.set('firstName');

    expect(component.sort()).toBe('firstName');
  });
});
