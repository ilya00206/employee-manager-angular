import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { EmployeeSearch } from './employee-search';

describe('EmployeeSearch', () => {
  let component: EmployeeSearch;
  let fixture: ComponentFixture<EmployeeSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSearch],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
