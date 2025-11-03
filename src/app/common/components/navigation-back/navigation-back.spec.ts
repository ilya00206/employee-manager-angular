import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBack } from './navigation-back';

describe('NavigationBack', () => {
  let component: NavigationBack;
  let fixture: ComponentFixture<NavigationBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
