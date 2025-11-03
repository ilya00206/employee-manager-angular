import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormFooter } from './employee-form-footer';

describe('EmployeeFormFooter', () => {
  let component: EmployeeFormFooter;
  let fixture: ComponentFixture<EmployeeFormFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer element', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('should have correct CSS class', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer.classList.contains('form-footer')).toBeTruthy();
  });

  it('should render ng-content', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).toBeTruthy();
  });
});

