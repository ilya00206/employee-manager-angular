import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePage } from './add-employee-page';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AddEmployeePage', () => {
  let component: AddEmployeePage;
  let fixture: ComponentFixture<AddEmployeePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeePage],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
