import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { EmployeeSearch } from './employee-search';

describe('EmployeeSearch', () => {
  let component: EmployeeSearch;
  let fixture: ComponentFixture<EmployeeSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSearch);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('search', signal(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search input field', () => {
    const searchInput = fixture.debugElement.query(By.css('#employeeSearch'));
    expect(searchInput).toBeTruthy();
  });

  it('should have correct placeholder text', () => {
    const searchInput = fixture.debugElement.query(By.css('#employeeSearch'));
    expect(searchInput.nativeElement.placeholder).toBe('Szukaj po imieniu i nazwisku');
  });

  it('should render search button', () => {
    const searchButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(searchButton).toBeTruthy();
    expect(searchButton.nativeElement.textContent.trim()).toBe('Szukaj');
  });

  it('should render search icon', () => {
    const searchIcon = fixture.debugElement.query(By.css('lucide-icon[name="search"]'));
    expect(searchIcon).toBeTruthy();
  });

  it('should not display clear button when search is empty', () => {
    component.searchSignal.set('');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.clear-button'));
    expect(clearButton).toBeFalsy();
  });

  it('should display clear button when search has value', () => {
    component.searchSignal.set('test search');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.clear-button'));
    expect(clearButton).toBeTruthy();
  });

  it('should clear search when clear button is clicked', () => {
    component.searchSignal.set('test search');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.clear-button'));
    clearButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.searchSignal()).toBe('');
    expect(component.search()).toBe('');
  });

  it('should render x icon in clear button', () => {
    component.searchSignal.set('test');
    fixture.detectChanges();

    const xIcon = fixture.debugElement.query(By.css('lucide-icon[name="x"]'));
    expect(xIcon).toBeTruthy();
  });

  it('should update searchSignal when input value changes', () => {
    const searchInput = fixture.debugElement.query(By.css('#employeeSearch'));
    const inputElement = searchInput.nativeElement;

    inputElement.value = 'Jan Kowalski';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchSignal()).toBe('Jan Kowalski');
  });

  it('should have form element', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
  });

  it('should have search-input-wrapper class', () => {
    const wrapper = fixture.debugElement.query(By.css('.search-input-wrapper'));
    expect(wrapper).toBeTruthy();
  });

  it('should set search signal on form submit', () => {
    component.searchSignal.set('test query');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.search()).toBe('test query');
  });

  it('should handle empty search submission', () => {
    component.searchSignal.set('');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.search()).toBe('');
  });

  it('should have correct input type', () => {
    const searchInput = fixture.debugElement.query(By.css('#employeeSearch'));
    expect(searchInput.nativeElement.type).toBe('text');
  });

  it('should have search-input class on input', () => {
    const searchInput = fixture.debugElement.query(By.css('.search-input'));
    expect(searchInput).toBeTruthy();
  });

  it('should have primary button class on submit button', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.classList.contains('button')).toBeTruthy();
    expect(submitButton.nativeElement.classList.contains('primary')).toBeTruthy();
  });

  it('should clear both searchSignal and search model when onClearSearch is called', () => {
    component.searchSignal.set('test');
    const searchSignal = signal('test');
    fixture.componentRef.setInput('search', searchSignal);
    fixture.detectChanges();

    component.onClearSearch();

    expect(component.searchSignal()).toBe('');
    expect(component.search()).toBe('');
  });
});

