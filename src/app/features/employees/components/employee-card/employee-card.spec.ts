import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { EmployeeCard } from './employee-card';

describe('EmployeeCard', () => {
  let component: EmployeeCard;
  let fixture: ComponentFixture<EmployeeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCard],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
