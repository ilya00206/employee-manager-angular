import { Employee } from '../models/employee';
import { Gender } from '../models/gender';
import { filterEmployee } from './filter-employee';

describe('filterEmployee', () => {
  const mockEmployees: Employee[] = [
    {
      id: 1,
      employeeId: '00000001',
      firstName: 'Jan',
      lastName: 'Kowalski',
      gender: Gender.Male,
    },
    {
      id: 2,
      employeeId: '00000002',
      firstName: 'Anna',
      lastName: 'Nowak',
      gender: Gender.Female,
    },
    {
      id: 3,
      employeeId: '00000003',
      firstName: 'Piotr',
      lastName: 'Kowalski',
      gender: Gender.Male,
    },
    {
      id: 4,
      employeeId: '00000004',
      firstName: 'Katarzyna',
      lastName: 'Wiśniewska',
      gender: Gender.Female,
    },
  ];

  it('should return all employees when search string is empty', () => {
    const result = filterEmployee(mockEmployees, '');
    expect(result.length).toBe(4);
  });

  it('should filter employees by first name (case insensitive)', () => {
    const result = filterEmployee(mockEmployees, 'jan');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('Jan');
    expect(result[0].lastName).toBe('Kowalski');
  });

  it('should filter employees by last name (case insensitive)', () => {
    const result = filterEmployee(mockEmployees, 'nowak');
    expect(result.length).toBe(1);
    expect(result[0].lastName).toBe('Nowak');
  });

  it('should filter employees by full name', () => {
    const result = filterEmployee(mockEmployees, 'anna nowak');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('Anna');
  });

  it('should handle uppercase search strings', () => {
    const result = filterEmployee(mockEmployees, 'KATARZYNA');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('Katarzyna');
  });

  it('should handle mixed case search strings', () => {
    const result = filterEmployee(mockEmployees, 'PIOTR KOWALSKI');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('Piotr');
  });

  it('should return empty array when no match is found', () => {
    const result = filterEmployee(mockEmployees, 'Ilya');
    expect(result.length).toBe(0);
  });

  it('should handle empty employee array', () => {
    const result = filterEmployee([], 'jan');
    expect(result.length).toBe(0);
  });

  it('should not mutate the original array', () => {
    const original = [...mockEmployees];
    filterEmployee(mockEmployees, 'jan');
    expect(mockEmployees).toEqual(original);
  });
});
