import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSort } from './employee-sort';

describe('EmployeeSort', () => {
  let component: EmployeeSort;
  let fixture: ComponentFixture<EmployeeSort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSort],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSort);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
