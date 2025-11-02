import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMessage } from './form-error-message';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FormErrorMessage', () => {
  let component: FormErrorMessage;
  let fixture: ComponentFixture<FormErrorMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorMessage],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
