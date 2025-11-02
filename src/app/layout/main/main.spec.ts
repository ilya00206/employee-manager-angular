import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Main } from './main';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Main', () => {
  let component: Main;
  let fixture: ComponentFixture<Main>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Main],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a main element with class container and main-content', () => {
    const mainElement = fixture.debugElement.query(By.css('main.container.main-content'));
    expect(mainElement).toBeTruthy();
  });
});
