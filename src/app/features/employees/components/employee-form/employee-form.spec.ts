import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EmployeeFormControls } from '../../models/employee-form';
import { Gender } from '../../models/gender';
import { EmployeeForm } from './employee-form';

describe('EmployeeForm', () => {
  let component: EmployeeForm;
  let fixture: ComponentFixture<EmployeeForm>;
  let testForm: FormGroup<EmployeeFormControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeForm);
    component = fixture.componentInstance;

    testForm = new FormGroup<EmployeeFormControls>({
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      gender: new FormControl<Gender | ''>('', { nonNullable: true }),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render required helper component', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const requiredHelper = fixture.debugElement.query(By.css('app-required-helper'));
    expect(requiredHelper).toBeTruthy();
  });

  it('should render form with correct id', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'employee-form-123');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    expect(form.nativeElement.id).toBe('employee-form-123');
  });

  it('should render firstName form control', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const firstNameInput = fixture.debugElement.query(By.css('#firstName'));
    expect(firstNameInput).toBeTruthy();
    expect(firstNameInput.nativeElement.placeholder).toBe('Wpisz imię');
  });

  it('should render lastName form control', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const lastNameInput = fixture.debugElement.query(By.css('#lastName'));
    expect(lastNameInput).toBeTruthy();
    expect(lastNameInput.nativeElement.placeholder).toBe('Wpisz nazwisko');
  });

  it('should render gender select field', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const genderSelect = fixture.debugElement.query(By.css('#gender'));
    expect(genderSelect).toBeTruthy();
  });

  it('should render all gender options', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const genderOptions = fixture.debugElement.queryAll(By.css('#gender option'));
    expect(genderOptions.length).toBe(4);
  });

  it('should display correct gender option labels', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const genderOptions = fixture.debugElement.queryAll(By.css('#gender option'));
    const optionTexts = genderOptions.map((option) => option.nativeElement.textContent.trim());

    expect(optionTexts).toContain('Wybierz płeć');
    expect(optionTexts).toContain('Mężczyzna');
    expect(optionTexts).toContain('Kobieta');
    expect(optionTexts).toContain('Inne');
  });

  it('should render three form-control components', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const formControls = fixture.debugElement.queryAll(By.css('app-form-control'));
    expect(formControls.length).toBe(3);
  });

  it('should mark firstName as required', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const formControlElements = compiled.querySelectorAll('app-form-control');
    expect(formControlElements.length).toBe(3);
  });

  it('should mark lastName as required', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Nazwisko');
  });

  it('should mark gender as required', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Płeć');
  });

  it('should emit submitEmployee event on form submit', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    spyOn(component.submitEmployee, 'emit');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.submitEmployee.emit).toHaveBeenCalled();
  });

  it('should bind form controls to FormGroup', () => {
    testForm.patchValue({
      firstName: 'Jan',
      lastName: 'Kowalski',
      gender: Gender.Male,
    });

    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const firstNameInput = fixture.debugElement.query(By.css('#firstName'));
    const lastNameInput = fixture.debugElement.query(By.css('#lastName'));
    const genderSelect = fixture.debugElement.query(By.css('#gender'));

    expect(firstNameInput.nativeElement.value).toBe('Jan');
    expect(lastNameInput.nativeElement.value).toBe('Kowalski');
    expect(genderSelect.nativeElement.value).toBe(Gender.Male);
  });

  it('should update FormGroup when input values change', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const firstNameInput = fixture.debugElement.query(By.css('#firstName'));
    firstNameInput.nativeElement.value = 'Anna';
    firstNameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(testForm.controls.firstName.value).toBe('Anna');
  });

  it('should have correct form control labels', () => {
    fixture.componentRef.setInput('form', testForm);
    fixture.componentRef.setInput('formId', 'test-form');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Imię');
    expect(compiled.textContent).toContain('Nazwisko');
    expect(compiled.textContent).toContain('Płeć');
  });
});
