import { EnvironmentProviders, InjectionToken, Provider } from '@angular/core';

export const APP_NAME = new InjectionToken<string>('APP_NAME');



export function provideAppName(appName: string): (EnvironmentProviders | Provider)[] {
  return [
    {
      provide: APP_NAME,
      useValue: appName,
    },
  ];
}
