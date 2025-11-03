import { EnvironmentProviders, InjectionToken, Provider } from '@angular/core';

export const APP_NAME = new InjectionToken<string>('APP_NAME');

const appName = 'e-Firma';

export function provideAppName(): (EnvironmentProviders | Provider)[] {
  return [
    {
      provide: APP_NAME,
      useValue: appName,
    },
  ];
}
