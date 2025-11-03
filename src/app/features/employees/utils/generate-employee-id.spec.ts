import { generateEmployeeId } from './generate-employee-id';

describe('generateEmployeeId', () => {
  it('should pad single digit number with leading zeros to 8 digits', () => {
    const result = generateEmployeeId(1);
    expect(result).toBe('00000001');
  });

  it('should pad two digit number with leading zeros to 8 digits', () => {
    const result = generateEmployeeId(42);
    expect(result).toBe('00000042');
  });

  it('should pad three digit number with leading zeros to 8 digits', () => {
    const result = generateEmployeeId(123);
    expect(result).toBe('00000123');
  });

  it('should handle zero', () => {
    const result = generateEmployeeId(0);
    expect(result).toBe('00000000');
  });

  it('should handle large numbers without padding when already 8 digits', () => {
    const result = generateEmployeeId(12345678);
    expect(result).toBe('12345678');
  });

  it('should handle numbers larger than 8 digits', () => {
    const result = generateEmployeeId(123456789);
    expect(result).toBe('123456789');
  });

  it('should return a string', () => {
    const result = generateEmployeeId(1);
    expect(typeof result).toBe('string');
  });

  it('should always return at least 8 characters for numbers less than 8 digits', () => {
    const result = generateEmployeeId(9999);
    expect(result.length).toBe(8);
    expect(result).toBe('00009999');
  });
});
