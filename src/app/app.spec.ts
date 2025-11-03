import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull();
  });
});
