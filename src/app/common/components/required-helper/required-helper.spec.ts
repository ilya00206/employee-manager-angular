import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredHelper } from './required-helper';

describe('RequiredHelper', () => {
  let component: RequiredHelper;
  let fixture: ComponentFixture<RequiredHelper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredHelper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredHelper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
