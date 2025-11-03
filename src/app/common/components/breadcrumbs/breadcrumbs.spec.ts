import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Breadcrumb } from './breadcrumb.model';
import { BreadcrumbsComponent } from './breadcrumbs';

describe('Breadcrumbs', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render breadcrumbs when no breadcrumbs provided', () => {
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('.breadcrumbs-nav'));
    expect(nav).toBeFalsy();
  });

  it('should not render breadcrumbs when only one breadcrumb provided', () => {
    const breadcrumbs: Breadcrumb[] = [{ label: 'Strona główna', routerLink: ['/'] }];
    fixture.componentRef.setInput('breadcrumbs', breadcrumbs);
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('.breadcrumbs-nav'));
    expect(nav).toBeFalsy();
  });

  it('should render breadcrumbs when multiple breadcrumbs provided', () => {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Strona główna', routerLink: ['/'] },
      { label: 'Pracownicy', routerLink: ['/employees'] },
    ];
    fixture.componentRef.setInput('breadcrumbs', breadcrumbs);
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('.breadcrumbs-nav'));
    expect(nav).toBeTruthy();
  });

  it('should render all breadcrumb links', () => {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Strona główna', routerLink: ['/'] },
      { label: 'Pracownicy', routerLink: ['/employees'] },
      { label: 'Profil' },
    ];
    fixture.componentRef.setInput('breadcrumbs', breadcrumbs);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.breadcrumbs-link'));
    const labels = fixture.debugElement.queryAll(By.css('.breadcrumbs-label'));

    expect(links.length).toBe(2);
    expect(labels.length).toBe(1);
  });

  it('should render icon breadcrumb when icon is provided', () => {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Strona główna', routerLink: ['/'], icon: 'house' },
      { label: 'Pracownicy', routerLink: ['/employees'] },
    ];
    fixture.componentRef.setInput('breadcrumbs', breadcrumbs);
    fixture.detectChanges();

    const iconLinks = fixture.debugElement.queryAll(By.css('.breadcrumbs-icon-link'));
    expect(iconLinks.length).toBe(1);
  });

  it('should display breadcrumb labels correctly', () => {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Strona główna', routerLink: ['/'] },
      { label: 'Pracownicy', routerLink: ['/employees'] },
    ];
    fixture.componentRef.setInput('breadcrumbs', breadcrumbs);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.breadcrumbs-link'));
    expect(links[0].nativeElement.textContent.trim()).toBe('Strona główna');
    expect(links[1].nativeElement.textContent.trim()).toBe('Pracownicy');
  });

  it('should have appropriate aria-label on nav element', () => {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Strona główna', routerLink: ['/'] },
      { label: 'Pracownicy', routerLink: ['/employees'] },
    ];
    fixture.componentRef.setInput('breadcrumbs', breadcrumbs);
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('.breadcrumbs-nav'));
    expect(nav.nativeElement.getAttribute('aria-label')).toBe('Nawigacja');
  });

  it('should render separator between breadcrumbs', () => {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Strona główna', routerLink: ['/'] },
      { label: 'Pracownicy', routerLink: ['/employees'] },
      { label: 'Profil' },
    ];
    fixture.componentRef.setInput('breadcrumbs', breadcrumbs);
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(By.css('lucide-icon'));
    const chevronIcons = icons.filter(
      (icon) => icon.nativeElement.querySelector('.lucide-chevron-right') !== null
    );

    expect(chevronIcons.length).toBe(breadcrumbs.length - 1);
  });
});
