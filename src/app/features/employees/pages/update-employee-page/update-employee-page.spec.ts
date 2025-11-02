import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeePage } from './update-employee-page';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UpdateEmployeePage', () => {
  let component: UpdateEmployeePage;
  let fixture: ComponentFixture<UpdateEmployeePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEmployeePage],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
