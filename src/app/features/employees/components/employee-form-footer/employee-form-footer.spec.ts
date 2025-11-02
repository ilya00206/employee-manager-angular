import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { EmployeeFormFooter } from './employee-form-footer';

describe('EmployeeFormFooter', () => {
  let component: EmployeeFormFooter;
  let fixture: ComponentFixture<EmployeeFormFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormFooter],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
