import { Employee } from '../models/employee';
import { Gender } from '../models/gender';
import { sortEmployee } from './sort-employee';

describe('sortEmployee', () => {
  const mockEmployees: Employee[] = [
    {
      id: 3,
      employeeId: '00000003',
      firstName: 'Zofia',
      lastName: 'Nowak',
      gender: Gender.Female,
    },
    {
      id: 1,
      employeeId: '00000001',
      firstName: 'Adam',
      lastName: 'Kowalski',
      gender: Gender.Male,
    },
    {
      id: 5,
      employeeId: '00000005',
      firstName: 'Piotr',
      lastName: 'Wiśniewski',
      gender: Gender.Male,
    },
    {
      id: 2,
      employeeId: '00000002',
      firstName: 'Anna',
      lastName: 'Zielińska',
      gender: Gender.Female,
    },
    {
      id: 4,
      employeeId: '00000004',
      firstName: 'Marek',
      lastName: 'Adamczyk',
      gender: Gender.Male,
    },
  ];

  describe('sorting by firstName', () => {
    it('should sort employees by firstName in ascending order', () => {
      const result = sortEmployee(mockEmployees, 'firstName,asc');
      expect(result[0].firstName).toBe('Adam');
      expect(result[1].firstName).toBe('Anna');
      expect(result[2].firstName).toBe('Marek');
    });

    it('should sort employees by firstName in descending order', () => {
      const result = sortEmployee(mockEmployees, 'firstName,desc');
      expect(result[0].firstName).toBe('Zofia');
      expect(result[1].firstName).toBe('Piotr');
      expect(result[2].firstName).toBe('Marek');
    });
  });

  describe('sorting by lastName', () => {
    it('should sort employees by lastName in ascending order', () => {
      const result = sortEmployee(mockEmployees, 'lastName,asc');
      expect(result[0].lastName).toBe('Adamczyk');
      expect(result[1].lastName).toBe('Kowalski');
      expect(result[2].lastName).toBe('Nowak');
    });

    it('should sort employees by lastName in descending order', () => {
      const result = sortEmployee(mockEmployees, 'lastName,desc');
      expect(result[0].lastName).toBe('Zielińska');
      expect(result[1].lastName).toBe('Wiśniewski');
      expect(result[2].lastName).toBe('Nowak');
    });
  });

  describe('sorting by employeeId', () => {
    it('should sort employees by employeeId in ascending order', () => {
      const result = sortEmployee(mockEmployees, 'employeeId,asc');
      expect(result[0].employeeId).toBe('00000001');
      expect(result[1].employeeId).toBe('00000002');
      expect(result[2].employeeId).toBe('00000003');
    });

    it('should sort employees by employeeId in descending order', () => {
      const result = sortEmployee(mockEmployees, 'employeeId,desc');
      expect(result[0].employeeId).toBe('00000005');
      expect(result[1].employeeId).toBe('00000004');
      expect(result[2].employeeId).toBe('00000003');
    });
  });

  describe('sorting by id', () => {
    it('should sort employees by id in ascending order', () => {
      const result = sortEmployee(mockEmployees, 'id,asc');
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(result[2].id).toBe(3);
    });

    it('should sort employees by id in descending order', () => {
      const result = sortEmployee(mockEmployees, 'id,desc');
      expect(result[0].id).toBe(5);
      expect(result[1].id).toBe(4);
      expect(result[2].id).toBe(3);
    });
  });

  describe('case insensitivity', () => {
    const mixedCaseEmployees: Employee[] = [
      {
        id: 1,
        employeeId: '00000001',
        firstName: 'BARBARA',
        lastName: 'KOWALCZYK',
        gender: Gender.Female,
      },
      {
        id: 2,
        employeeId: '00000002',
        firstName: 'anna',
        lastName: 'lewandowska',
        gender: Gender.Female,
      },
      {
        id: 3,
        employeeId: '00000003',
        firstName: 'Czesław',
        lastName: 'Dąbrowski',
        gender: Gender.Male,
      },
    ];

    it('should sort case-insensitively by firstName', () => {
      const result = sortEmployee(mixedCaseEmployees, 'firstName,asc');
      expect(result[0].firstName.toLowerCase()).toBe('anna');
      expect(result[1].firstName.toLowerCase()).toBe('barbara');
      expect(result[2].firstName.toLowerCase()).toBe('czesław');
    });

    it('should sort case-insensitively by lastName', () => {
      const result = sortEmployee(mixedCaseEmployees, 'lastName,asc');
      expect(result[0].lastName.toLowerCase()).toBe('dąbrowski');
      expect(result[1].lastName.toLowerCase()).toBe('kowalczyk');
      expect(result[2].lastName.toLowerCase()).toBe('lewandowska');
    });
  });

  describe('edge cases', () => {
    it('should handle empty array', () => {
      const result = sortEmployee([], 'firstName,asc');
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should handle single employee array', () => {
      const singleEmployee: Employee[] = [
        {
          id: 1,
          employeeId: '00000001',
          firstName: 'Stanisław',
          lastName: 'Nowak',
          gender: Gender.Male,
        },
      ];
      const result = sortEmployee(singleEmployee, 'firstName,asc');
      expect(result.length).toBe(1);
      expect(result[0].firstName).toBe('Stanisław');
    });

    it('should not mutate the original array', () => {
      const original = [...mockEmployees];
      const originalOrder = mockEmployees.map((e) => e.id);

      sortEmployee(mockEmployees, 'firstName,asc');

      const currentOrder = mockEmployees.map((e) => e.id);
      expect(currentOrder).toEqual(originalOrder);
      expect(mockEmployees).toEqual(original);
    });

    it('should return a new array instance', () => {
      const result = sortEmployee(mockEmployees, 'firstName,asc');
      expect(result).not.toBe(mockEmployees);
    });
  });

  describe('sorting with Polish special characters', () => {
    const polishNameEmployees: Employee[] = [
      {
        id: 1,
        employeeId: '00000001',
        firstName: 'Łukasz',
        lastName: 'Żukowski',
        gender: Gender.Male,
      },
      {
        id: 2,
        employeeId: '00000002',
        firstName: 'Agnieszka',
        lastName: 'Ćwik',
        gender: Gender.Female,
      },
      {
        id: 3,
        employeeId: '00000003',
        firstName: 'Krzysztof',
        lastName: 'Śliwiński',
        gender: Gender.Male,
      },
      {
        id: 4,
        employeeId: '00000004',
        firstName: 'Małgorzata',
        lastName: 'Zając',
        gender: Gender.Female,
      },
    ];

    it('should correctly sort Polish names with special characters in ascending order', () => {
      const result = sortEmployee(polishNameEmployees, 'lastName,asc');
      expect(result[0].lastName).toBe('Ćwik');
      expect(result[1].lastName).toBe('Śliwiński');
      expect(result[2].lastName).toBe('Zając');
      expect(result[3].lastName).toBe('Żukowski');
    });

    it('should correctly sort Polish names with special characters in descending order', () => {
      const result = sortEmployee(polishNameEmployees, 'lastName,desc');
      expect(result[0].lastName).toBe('Żukowski');
      expect(result[1].lastName).toBe('Zając');
      expect(result[2].lastName).toBe('Śliwiński');
      expect(result[3].lastName).toBe('Ćwik');
    });
  });

  describe('sorting with duplicate names', () => {
    const duplicateNameEmployees: Employee[] = [
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
        firstName: 'Jan',
        lastName: 'Nowak',
        gender: Gender.Male,
      },
      {
        id: 3,
        employeeId: '00000003',
        firstName: 'Anna',
        lastName: 'Kowalski',
        gender: Gender.Female,
      },
    ];

    it('should handle duplicate first names when sorting', () => {
      const result = sortEmployee(duplicateNameEmployees, 'firstName,asc');
      expect(result[0].firstName).toBe('Anna');
      expect(result[1].firstName).toBe('Jan');
      expect(result[2].firstName).toBe('Jan');
    });

    it('should handle duplicate last names when sorting', () => {
      const result = sortEmployee(duplicateNameEmployees, 'lastName,asc');
      expect(result[0].lastName).toBe('Kowalski');
      expect(result[1].lastName).toBe('Kowalski');
      expect(result[2].lastName).toBe('Nowak');
    });
  });
});
