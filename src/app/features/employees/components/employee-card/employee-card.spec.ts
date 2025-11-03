import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Employee } from '../../models/employee';
import { Gender } from '../../models/gender';
import { EmployeeCard } from './employee-card';

describe('EmployeeCard', () => {
  let component: EmployeeCard;
  let fixture: ComponentFixture<EmployeeCard>;
  let mockEmployee: Employee;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeCard);
    component = fixture.componentInstance;

    mockEmployee = {
      id: 1,
      employeeId: '00000001',
      firstName: 'Jan',
      lastName: 'Kowalski',
      gender: Gender.Male,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee data correctly', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('00000001');
    expect(compiled.textContent).toContain('Jan');
    expect(compiled.textContent).toContain('Kowalski');
    expect(compiled.textContent).toContain(Gender.Male);
  });

  it('should display employee ID label', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Numer ewidencyjny:');
  });

  it('should display first name label', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Imię:');
  });

  it('should display last name label', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Nazwisko:');
  });

  it('should display gender label', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Płeć:');
  });

  it('should emit delete event when delete button is clicked', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    spyOn(component.delete, 'emit');

    const deleteButton = fixture.debugElement.query(By.css('button[type="button"]'));
    expect(deleteButton).toBeTruthy();

    deleteButton.nativeElement.click();

    expect(component.delete.emit).toHaveBeenCalledWith(mockEmployee);
  });

  it('should have edit link with correct routerLink', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const editLink = fixture.debugElement.query(By.css('a.button.icon'));
    expect(editLink).toBeTruthy();
  });

  it('should have proper ARIA labels', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const article = fixture.debugElement.query(By.css('article'));
    expect(article.nativeElement.getAttribute('aria-label')).toBe('Dane pracownika: Jan Kowalski');

    const actionsDiv = fixture.debugElement.query(By.css('.actions'));
    expect(actionsDiv.nativeElement.getAttribute('aria-label')).toBe(
      'Akcje dla pracownika Jan Kowalski'
    );
  });

  it('should have edit button with proper aria-label', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const editLink = fixture.debugElement.query(By.css('a.button.icon'));
    expect(editLink.nativeElement.getAttribute('aria-label')).toBe(
      'Edytuj dane osoby: Jan Kowalski'
    );
  });

  it('should have delete button with proper aria-label', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('button[type="button"]'));
    expect(deleteButton.nativeElement.getAttribute('aria-label')).toBe('Usuń osobę: Jan Kowalski');
  });

  it('should display female employee correctly', () => {
    const femaleEmployee: Employee = {
      id: 2,
      employeeId: '00000002',
      firstName: 'Anna',
      lastName: 'Nowak',
      gender: Gender.Female,
    };

    fixture.componentRef.setInput('employee', femaleEmployee);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Anna');
    expect(compiled.textContent).toContain('Nowak');
    expect(compiled.textContent).toContain(Gender.Female);
  });

  it('should render lucide icons', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(By.css('lucide-icon'));
    expect(icons.length).toBe(2);
  });

  it('should render within app-card component', () => {
    fixture.componentRef.setInput('employee', mockEmployee);
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('app-card'));
    expect(card).toBeTruthy();
  });
});
