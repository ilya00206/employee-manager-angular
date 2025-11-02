import { Employee } from '../models/employee';

export function sortEmployee(data: Employee[], sort: string) {
  const [field, direction] = sort.split(',');
  return data.sort((a, b) => {
    const valueA = a[field as keyof Employee]?.toString()?.toLocaleLowerCase();
    const valueB = b[field as keyof Employee]?.toString()?.toLocaleLowerCase();
    if (direction === 'asc') {
      return valueA.localeCompare(valueB);
    }
    return valueB.localeCompare(valueA);
  });
}
