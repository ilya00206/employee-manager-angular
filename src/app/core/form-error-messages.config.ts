import { EnvironmentProviders, InjectionToken, Provider } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorMessages = Record<string, (...args: any[]) => string>;

export const FORM_ERROR_MESSAGES = new InjectionToken<ErrorMessages>('FORM_ERROR_MESSAGES');

export const formErrorMessagesConfig: ErrorMessages = {
  required: () => 'Pole wymagane',
  minlength: ({ requiredLength }) => `Minimalna długość to ${requiredLength} znaków.`,
  maxlength: ({ requiredLength }) => `Maksymalna długość to ${requiredLength} znaków.`,
};

export function provideFormErrorMessages(): (EnvironmentProviders | Provider)[] {
  return [
    {
      provide: FORM_ERROR_MESSAGES,
      useValue: formErrorMessagesConfig,
    },
  ];
}
