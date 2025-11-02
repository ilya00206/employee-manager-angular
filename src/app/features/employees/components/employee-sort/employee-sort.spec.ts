import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSort } from './employee-sort';
import { provideZonelessChangeDetection } from '@angular/core';

describe('EmployeeSort', () => {
  let component: EmployeeSort;
  let fixture: ComponentFixture<EmployeeSort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSort],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSort);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
