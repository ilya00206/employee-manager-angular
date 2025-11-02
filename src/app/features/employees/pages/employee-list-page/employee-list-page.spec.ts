import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListPage } from './employee-list-page';
import { provideZonelessChangeDetection } from '@angular/core';

describe('EmployeeListPage', () => {
  let component: EmployeeListPage;
  let fixture: ComponentFixture<EmployeeListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListPage],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
