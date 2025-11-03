import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Employee } from '../../models/employee';
import { Gender } from '../../models/gender';
import { EmployeeList } from './employee-list';

describe('EmployeeList', () => {
  let component: EmployeeList;
  let fixture: ComponentFixture<EmployeeList>;
  let mockEmployees: Employee[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeList);
    component = fixture.componentInstance;

    mockEmployees = [
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
      {
        id: 3,
        employeeId: '00000003',
        firstName: 'Piotr',
        lastName: 'Wiśniewski',
        gender: Gender.Other,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of employees', () => {
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(mockEmployees.length);
  });

  it('should render employee cards for each employee', () => {
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();

    const employeeCards = fixture.debugElement.queryAll(By.css('li[appEmployeeCard]'));
    expect(employeeCards.length).toBe(mockEmployees.length);
  });

  it('should pass employee data to employee card', () => {
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();

    const employeeCards = fixture.debugElement.queryAll(By.css('li[appEmployeeCard]'));
    expect(employeeCards.length).toBe(mockEmployees.length);
    expect(employeeCards[0]).toBeTruthy();
  });

  it('should display "Brak pracowników" when employees list is empty', () => {
    fixture.componentRef.setInput('employees', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Brak pracowników');
  });

  it('should render app-card when no employees', () => {
    fixture.componentRef.setInput('employees', []);
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('app-card'));
    expect(card).toBeTruthy();
  });

  it('should not render ul when employees list is empty', () => {
    fixture.componentRef.setInput('employees', []);
    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('ul'));
    expect(list).toBeFalsy();
  });

  it('should not display "Brak pracowników" when employees exist', () => {
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).not.toContain('Brak pracowników');
  });

  it('should emit delete event when employee card emits delete', () => {
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();

    spyOn(component.delete, 'emit');

    const employeeCard = fixture.debugElement.query(By.css('li[appEmployeeCard]'));
    employeeCard.componentInstance.delete.emit(mockEmployees[0]);

    expect(component.delete.emit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('should handle single employee', () => {
    const singleEmployee = [mockEmployees[0]];
    fixture.componentRef.setInput('employees', singleEmployee);
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(1);
  });

  it('should track employees by id', () => {
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(mockEmployees.length);

    const newEmployees = [mockEmployees[0], mockEmployees[2]];
    fixture.componentRef.setInput('employees', newEmployees);
    fixture.detectChanges();

    const updatedListItems = fixture.debugElement.queryAll(By.css('li'));
    expect(updatedListItems.length).toBe(newEmployees.length);
  });

  it('should render ul element when employees exist', () => {
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();

    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();
  });
});
