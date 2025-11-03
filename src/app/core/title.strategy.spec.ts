import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { AppTitleStrategy, provideTitleStrategy } from './title.strategy';
import { APP_NAME, provideAppName } from './app-name';

describe('AppTitleStrategy', () => {
  let titleStrategy: AppTitleStrategy;
  let titleService: Title;
  const mockAppName = 'Test App';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTitleStrategy(), provideAppName(mockAppName)],
    });

    titleStrategy = TestBed.inject(TitleStrategy) as AppTitleStrategy;
    titleService = TestBed.inject(Title);
  });

  it('should create', () => {
    expect(titleStrategy).toBeTruthy();
  });

  it('should inject APP_NAME token', () => {
    const appName = TestBed.inject(APP_NAME);
    expect(appName).toBe(mockAppName);
  });

  it('should set title with app name when title is provided', () => {
    const mockSnapshot = {
      url: '/test',
      root: {
        firstChild: {
          data: { title: 'Test Page' },
        },
      },
    } as unknown as RouterStateSnapshot;

    spyOn(titleService, 'setTitle');
    spyOn(titleStrategy, 'buildTitle').and.returnValue('Test Page');

    titleStrategy.updateTitle(mockSnapshot);

    expect(titleService.setTitle).toHaveBeenCalledWith('Test Page - Test App');
  });

  it('should not set title when buildTitle returns undefined', () => {
    const mockSnapshot = {
      url: '/test',
      root: {
        firstChild: null,
      },
    } as unknown as RouterStateSnapshot;

    spyOn(titleService, 'setTitle');
    spyOn(titleStrategy, 'buildTitle').and.returnValue(undefined);

    titleStrategy.updateTitle(mockSnapshot);

    expect(titleService.setTitle).not.toHaveBeenCalled();
  });

  it('should format title correctly with different page titles', () => {
    const testTitles = ['Home', 'Dashboard', 'Settings'];
    const setTitleSpy = spyOn(titleService, 'setTitle');
    const buildTitleSpy = spyOn(titleStrategy, 'buildTitle');

    testTitles.forEach((pageTitle) => {
      const mockSnapshot = {
        url: '/test',
        root: {
          firstChild: {
            data: { title: pageTitle },
          },
        },
      } as unknown as RouterStateSnapshot;

      buildTitleSpy.and.returnValue(pageTitle);
      titleStrategy.updateTitle(mockSnapshot);

      expect(setTitleSpy).toHaveBeenCalledWith(`${pageTitle} - ${mockAppName}`);
      setTitleSpy.calls.reset();
    });
  });

  it('should use provided app name from token', () => {
    const customAppName = 'Custom Application';
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideTitleStrategy(), provideAppName(customAppName)],
    });

    titleStrategy = TestBed.inject(TitleStrategy) as AppTitleStrategy;
    titleService = TestBed.inject(Title);

    const mockSnapshot = {
      url: '/test',
      root: {
        firstChild: {
          data: { title: 'Page' },
        },
      },
    } as unknown as RouterStateSnapshot;

    spyOn(titleService, 'setTitle');
    spyOn(titleStrategy, 'buildTitle').and.returnValue('Page');

    titleStrategy.updateTitle(mockSnapshot);

    expect(titleService.setTitle).toHaveBeenCalledWith(`Page - ${customAppName}`);
  });
});

describe('provideTitleStrategy', () => {
  it('should provide TitleStrategy with AppTitleStrategy', () => {
    TestBed.configureTestingModule({
      providers: [provideTitleStrategy(), provideAppName('Test')],
    });

    const titleStrategy = TestBed.inject(TitleStrategy);
    expect(titleStrategy).toBeInstanceOf(AppTitleStrategy);
  });
});

