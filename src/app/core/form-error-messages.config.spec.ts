import { formErrorMessagesConfig } from './form-error-messages.config';

describe('formErrorMessagesConfig', () => {
  it('should be defined', () => {
    expect(formErrorMessagesConfig).toBeDefined();
  });

  it('should contain required error message', () => {
    expect(formErrorMessagesConfig['required']()).toBe('Pole wymagane');
  });

  it('should contain minlength error message', () => {
    expect(formErrorMessagesConfig['minlength']({ requiredLength: 5 })).toBe(
      'Minimalna długość to 5 znaków'
    );
  });

  it('should contain maxlength error message', () => {
    expect(formErrorMessagesConfig['maxlength']({ requiredLength: 100 })).toBe(
      'Maksymalna długość to 100 znaków'
    );
  });
});
