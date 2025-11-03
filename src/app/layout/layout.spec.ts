import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Layout } from './layout';
import { Main } from './main/main';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, Main, Layout],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
  });

  it('should create the layout component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a header component', () => {
    const headerComponent = fixture.debugElement.query(By.directive(Header));
    expect(headerComponent).not.toBeNull();
  });

  it('should contain a main component', () => {
    const mainComponent = fixture.debugElement.query(By.directive(Main));
    expect(mainComponent).not.toBeNull();
  });

  it('should contain a router-outlet inside the main component', () => {
    const mainComponent = fixture.debugElement.query(By.directive(Main));
    const routerOutlet = mainComponent.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull();
  });
});
