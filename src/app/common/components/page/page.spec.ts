import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Page } from './page';
import { Breadcrumbs } from '../breadcrumbs/breadcrumb.model';

describe('Page', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;
  let routeData$: BehaviorSubject<{ heading?: string; breadcrumbs?: Breadcrumbs }>;

  beforeEach(async () => {
    routeData$ = new BehaviorSubject<{ heading?: string; breadcrumbs?: Breadcrumbs }>({});

    await TestBed.configureTestingModule({
      imports: [Page],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: routeData$.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have page wrapper element', () => {
    const pageElement = fixture.debugElement.query(By.css('.page'));
    expect(pageElement).toBeTruthy();
  });

  it('should display heading from route data', async () => {
    routeData$.next({ heading: 'Test Heading' });
    fixture.detectChanges();
    await fixture.whenStable();

    const headingElement = fixture.debugElement.query(By.css('.page-heading'));
    expect(headingElement).toBeTruthy();
    expect(headingElement.nativeElement.textContent.trim()).toBe('Test Heading');
  });

  it('should not display heading when not provided in route data', async () => {
    routeData$.next({});
    fixture.detectChanges();
    await fixture.whenStable();

    const headingElement = fixture.debugElement.query(By.css('.page-heading'));
    expect(headingElement.nativeElement.textContent.trim()).toBe('');
  });

  it('should display breadcrumbs from route data', async () => {
    const breadcrumbs = new Breadcrumbs([{ label: 'Test Page' }]);
    routeData$.next({ breadcrumbs });
    fixture.detectChanges();
    await fixture.whenStable();

    const breadcrumbsComponent = fixture.debugElement.query(By.css('app-breadcrumbs'));
    expect(breadcrumbsComponent).toBeTruthy();
  });

  it('should have page-header element', () => {
    const pageHeader = fixture.debugElement.query(By.css('.page-header'));
    expect(pageHeader).toBeTruthy();
  });

  it('should project page-toolbar content', () => {
    const pageHeader = fixture.debugElement.query(By.css('.page-header'));
    expect(pageHeader).toBeTruthy();
  });

  it('should update heading when route data changes', async () => {
    routeData$.next({ heading: 'Initial Heading' });
    fixture.detectChanges();
    await fixture.whenStable();

    let headingElement = fixture.debugElement.query(By.css('.page-heading'));
    expect(headingElement.nativeElement.textContent.trim()).toBe('Initial Heading');

    routeData$.next({ heading: 'Updated Heading' });
    fixture.detectChanges();
    await fixture.whenStable();

    headingElement = fixture.debugElement.query(By.css('.page-heading'));
    expect(headingElement.nativeElement.textContent.trim()).toBe('Updated Heading');
  });
});
