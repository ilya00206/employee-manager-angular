import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { EmployeeSort } from './employee-sort';
import { employeeSortOptions } from '../../data/employee-sort-options';

describe('EmployeeSort', () => {
  let component: EmployeeSort;
  let fixture: ComponentFixture<EmployeeSort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSort],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSort);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sort', signal(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render select element', () => {
    const select = fixture.debugElement.query(By.css('select'));
    expect(select).toBeTruthy();
  });

  it('should have correct id attribute', () => {
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.id).toBe('employeeSort');
  });

  it('should render default option', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options[0].nativeElement.textContent.trim()).toBe('Sortuj po...');
    expect(options[0].nativeElement.value).toBe('');
  });

  it('should render all sort options', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(employeeSortOptions.length + 1); // +1 for default option
  });

  it('should display correct option labels', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    const optionTexts = options.slice(1).map((option) => option.nativeElement.textContent.trim());

    expect(optionTexts).toContain('Nr. ewidencyjny rosnąco');
    expect(optionTexts).toContain('Nr. ewidencyjny malejąco');
    expect(optionTexts).toContain('Imię rosnąco');
    expect(optionTexts).toContain('Imię malejąco');
    expect(optionTexts).toContain('Nazwisko rosnąco');
    expect(optionTexts).toContain('Nazwisko malejąco');
    expect(optionTexts).toContain('Płeć rosnąco');
    expect(optionTexts).toContain('Płeć malejąco');
  });

  it('should have correct option values', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    const optionValues = options.slice(1).map((option) => option.nativeElement.value);

    expect(optionValues).toContain('employeeId,asc');
    expect(optionValues).toContain('employeeId,desc');
    expect(optionValues).toContain('firstName,asc');
    expect(optionValues).toContain('firstName,desc');
    expect(optionValues).toContain('lastName,asc');
    expect(optionValues).toContain('lastName,desc');
    expect(optionValues).toContain('gender,asc');
    expect(optionValues).toContain('gender,desc');
  });

  it('should bind to sort model', () => {
    const sortSignal = signal('firstName,asc');
    fixture.componentRef.setInput('sort', sortSignal);
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.nativeElement.value = 'firstName,asc';
    select.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.sort()).toBe('firstName,asc');
  });

  it('should update sort model when selection changes', () => {
    const sortSignal = signal('');
    fixture.componentRef.setInput('sort', sortSignal);
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.nativeElement.value = 'lastName,desc';
    select.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.sort()).toBe('lastName,desc');
  });

  it('should have sortOptions property with correct data', () => {
    expect(component.sortOptions).toEqual(employeeSortOptions);
  });

  it('should render 8 sort options plus default', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(9); // 8 sort options + 1 default
  });

  it('should default to empty string', () => {
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.value).toBe('');
  });

  it('should handle all sort option selections', () => {
    const select = fixture.debugElement.query(By.css('select'));

    employeeSortOptions.forEach((option) => {
      select.nativeElement.value = option.value;
      select.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.sort()).toBe(option.value);
    });
  });

  it('should track options by value', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBeGreaterThan(0);

    const values = options.slice(1).map((opt) => opt.nativeElement.value);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });
});
